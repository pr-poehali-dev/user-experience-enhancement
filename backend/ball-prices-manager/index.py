import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''Калькулятор цен на шары: список базовых типов шаров/фигурок с ценой за штуку,
    обновление цены за штуку (защищено паролем) с автоматическим пересчётом цен всех наборов.
    GET - вернуть список типов шаров с ценами (не требует пароля).
    POST - обновить цену за штуку одного или нескольких типов шаров и пересчитать цены наборов
           (требует X-Admin-Password в headers).
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()

    try:
        if method == 'GET':
            cur.execute(
                "SELECT id, name, price_per_unit, is_figure FROM ball_types ORDER BY is_figure ASC, name ASC"
            )
            rows = cur.fetchall()
            items = [
                {
                    'id': r[0],
                    'name': r[1],
                    'price_per_unit': r[2],
                    'is_figure': r[3]
                }
                for r in rows
            ]
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'items': items}, ensure_ascii=False)
            }

        if method == 'POST':
            req_headers = event.get('headers', {})
            password = req_headers.get('X-Admin-Password') or req_headers.get('x-admin-password')
            expected = os.environ.get('ADMIN_PRICES_PASSWORD')

            if not password or password != expected:
                return {
                    'statusCode': 401,
                    'headers': headers,
                    'body': json.dumps({'error': 'Неверный пароль'}, ensure_ascii=False)
                }

            body_data = json.loads(event.get('body', '{}'))
            updates = body_data.get('updates', [])

            if not updates:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Нет данных для обновления'}, ensure_ascii=False)
                }

            updated_count = 0
            for u in updates:
                ball_type_id = u.get('id')
                price_per_unit = u.get('price_per_unit')
                if ball_type_id is None or price_per_unit is None:
                    continue
                cur.execute(
                    f"UPDATE ball_types SET price_per_unit = {int(price_per_unit)}, updated_at = NOW() "
                    f"WHERE id = {int(ball_type_id)}"
                )
                updated_count += 1

            cur.execute(
                "UPDATE composition_prices cp "
                "SET price = sub.total, updated_at = NOW() "
                "FROM ("
                "  SELECT cc.composition_id, cc.subcategory, SUM(cc.quantity * bt.price_per_unit) AS total "
                "  FROM composition_components cc "
                "  JOIN ball_types bt ON bt.id = cc.ball_type_id "
                "  WHERE cc.quantity > 0 "
                "  GROUP BY cc.composition_id, cc.subcategory "
                ") sub "
                "WHERE cp.composition_id = sub.composition_id AND cp.subcategory = sub.subcategory"
            )
            recalculated_count = cur.rowcount

            conn.commit()

            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(
                    {'success': True, 'updated_ball_types': updated_count, 'recalculated_compositions': recalculated_count},
                    ensure_ascii=False
                )
            }

        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Метод не поддерживается'}, ensure_ascii=False)
        }

    finally:
        cur.close()
        conn.close()
