import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''Управление ценами на композиции: получение списка и обновление цены (защищено паролем).
    GET - вернуть все композиции с ценами (не требует пароля).
    POST - обновить цену одной или нескольких композиций (требует X-Admin-Password в headers).
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
                "SELECT composition_id, subcategory, title, price FROM composition_prices ORDER BY subcategory, composition_id"
            )
            rows = cur.fetchall()
            items = [
                {
                    'id': r[0],
                    'subcategory': r[1],
                    'title': r[2],
                    'price': r[3]
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
            updates = body_data.get('updates')

            if updates is None:
                composition_id = body_data.get('id')
                subcategory = body_data.get('subcategory')
                price = body_data.get('price')
                updates = [{'id': composition_id, 'subcategory': subcategory, 'price': price}]

            if not updates:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Нет данных для обновления'}, ensure_ascii=False)
                }

            for u in updates:
                composition_id = u.get('id')
                subcategory = u.get('subcategory')
                price = u.get('price')
                if composition_id is None or subcategory is None or price is None:
                    continue
                subcat_escaped = str(subcategory).replace("'", "''")
                cur.execute(
                    f"UPDATE composition_prices SET price = {int(price)}, updated_at = NOW() "
                    f"WHERE composition_id = {int(composition_id)} AND subcategory = '{subcat_escaped}'"
                )

            conn.commit()

            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'success': True, 'updated': len(updates)}, ensure_ascii=False)
            }

        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Метод не поддерживается'}, ensure_ascii=False)
        }

    finally:
        cur.close()
        conn.close()
