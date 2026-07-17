UPDATE t_p47738118_user_experience_enha.composition_prices
SET price = ROUND((price * 1.22) / 10) * 10,
    updated_at = NOW()
WHERE price > 0;