UPDATE t_p47738118_user_experience_enha.composition_components SET ball_type_id = 123, quantity = 1 WHERE id = 1606;
UPDATE t_p47738118_user_experience_enha.composition_components SET ball_type_id = 121, quantity = 1 WHERE id = 1607;
UPDATE t_p47738118_user_experience_enha.composition_components SET ball_type_id = 64, quantity = 25 WHERE id = 1608;

INSERT INTO t_p47738118_user_experience_enha.composition_components (composition_id, subcategory, ball_type_id, quantity) VALUES
(297, 'kid-girl', 71, 1),
(297, 'kid-girl', 35, 15);

UPDATE t_p47738118_user_experience_enha.composition_prices
SET price = 2650 + 2500 + 900 + 25*200 + 15*10, updated_at = NOW()
WHERE composition_id = 297 AND subcategory = 'kid-girl';