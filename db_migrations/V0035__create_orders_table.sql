CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    composition_title VARCHAR(500),
    question TEXT,
    contact_method VARCHAR(20),
    messenger VARCHAR(20),
    mode VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);