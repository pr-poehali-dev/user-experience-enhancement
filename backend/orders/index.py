import json
import os
import urllib.request
from typing import Any

import psycopg2


def send_telegram_notification(name: str, phone: str, composition_title: str, question: str,
                                contact_method: str, messenger: str, mode: str) -> None:
    """Отправляет уведомление о новой заявке в Telegram."""
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    if not bot_token or not chat_id:
        return

    action = 'Уточнение деталей' if mode == 'details' else 'Новый заказ'
    lines = [f"🎈 {action}", '', f"Имя: {name}", f"Телефон: {phone}"]
    if composition_title:
        lines.append(f"Товар: {composition_title}")
    if question:
        lines.append(f"Вопрос/пожелания: {question}")
    if contact_method == 'call':
        lines.append('Способ связи: позвонить')
    elif messenger:
        lines.append(f"Способ связи: написать в {messenger}")

    text = '\n'.join(lines)
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = json.dumps({'chat_id': chat_id, 'text': text}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    try:
        urllib.request.urlopen(req, timeout=5)
    except Exception:
        pass


def handler(event: dict, context: Any) -> dict:
    """Принимает заявки с формы оформления заказа и сохраняет их в базу данных.
    GET — возвращает список заявок (для админки).
    POST — создаёт новую заявку.
    """
    method = event.get('httpMethod', 'GET')

    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    cur = conn.cursor()

    try:
        if method == 'POST':
            body = json.loads(event.get('body') or '{}')
            name = (body.get('name') or '').strip()
            phone = (body.get('phone') or '').strip()
            composition_title = (body.get('compositionTitle') or '').strip()
            question = (body.get('question') or '').strip()
            contact_method = (body.get('contactMethod') or '').strip()
            messenger = (body.get('messenger') or '').strip()
            mode = (body.get('mode') or '').strip()

            if not name or not phone:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Укажите имя и телефон'}),
                }

            name_esc = name.replace("'", "''")
            phone_esc = phone.replace("'", "''")
            composition_esc = composition_title.replace("'", "''")
            question_esc = question.replace("'", "''")
            contact_method_esc = contact_method.replace("'", "''")
            messenger_esc = messenger.replace("'", "''")
            mode_esc = mode.replace("'", "''")

            cur.execute(
                f"""
                INSERT INTO orders (name, phone, composition_title, question, contact_method, messenger, mode)
                VALUES ('{name_esc}', '{phone_esc}', '{composition_esc}', '{question_esc}', '{contact_method_esc}', '{messenger_esc}', '{mode_esc}')
                RETURNING id, created_at
                """
            )
            row = cur.fetchone()

            send_telegram_notification(name, phone, composition_title, question, contact_method, messenger, mode)

            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'success': True, 'id': row[0], 'createdAt': row[1].isoformat()}),
            }

        if method == 'GET':
            admin_password = event.get('headers', {}).get('X-Admin-Password') or event.get('headers', {}).get('x-admin-password')
            if admin_password != os.environ.get('ADMIN_PRICES_PASSWORD'):
                return {
                    'statusCode': 401,
                    'headers': headers,
                    'body': json.dumps({'error': 'Неверный пароль'}),
                }

            cur.execute(
                "SELECT id, name, phone, composition_title, question, contact_method, messenger, mode, created_at "
                "FROM orders ORDER BY created_at DESC LIMIT 200"
            )
            rows = cur.fetchall()
            orders = [
                {
                    'id': r[0],
                    'name': r[1],
                    'phone': r[2],
                    'compositionTitle': r[3],
                    'question': r[4],
                    'contactMethod': r[5],
                    'messenger': r[6],
                    'mode': r[7],
                    'createdAt': r[8].isoformat(),
                }
                for r in rows
            ]

            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'orders': orders}),
            }

        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Метод не поддерживается'}),
        }
    finally:
        cur.close()
        conn.close()