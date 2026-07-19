-- Существующие точные совпадения: проставляем раздел и порядок
UPDATE t_p47738118_user_experience_enha.ball_types SET section='latex', sort_order=1 WHERE name='Пастель шары';
UPDATE t_p47738118_user_experience_enha.ball_types SET section='latex', sort_order=3 WHERE name='Перламутр шары';
UPDATE t_p47738118_user_experience_enha.ball_types SET section='latex', sort_order=5 WHERE name='Хром шары';
UPDATE t_p47738118_user_experience_enha.ball_types SET section='latex', sort_order=7 WHERE name='Прозрачные шары';
UPDATE t_p47738118_user_experience_enha.ball_types SET section='latex', sort_order=9 WHERE name='Прозрачные шары с конфетти';
UPDATE t_p47738118_user_experience_enha.ball_types SET section='latex', sort_order=10 WHERE name='Стеклянные шары';
UPDATE t_p47738118_user_experience_enha.ball_types SET section='foil_big', sort_order=25 WHERE name='Сердце гигант фольгированное';
UPDATE t_p47738118_user_experience_enha.ball_types SET section='foil_big', sort_order=29 WHERE name='Звезда гигант фольгированная';

-- Прочие некалиброванные типы (ленты) - помечаем как отдельный раздел
UPDATE t_p47738118_user_experience_enha.ball_types SET section='other', sort_order=901 WHERE name='Ленты атласные';
UPDATE t_p47738118_user_experience_enha.ball_types SET section='other', sort_order=902 WHERE name='Ленты дождик';

-- Репурпоз старых одиночных/устаревших строк в новые точные названия
UPDATE t_p47738118_user_experience_enha.ball_types SET name='Звезды фольгированные', section='foil_small', sort_order=15 WHERE name='Звезда фольгированная';
UPDATE t_p47738118_user_experience_enha.ball_types SET name='Сердца фольгированные', section='foil_small', sort_order=13 WHERE name='Сердце фольгированное';
UPDATE t_p47738118_user_experience_enha.ball_types SET name='Цифры фольгированные', section='foil_small', sort_order=23 WHERE name='Цифра фольгированная';
UPDATE t_p47738118_user_experience_enha.ball_types SET name='Баблс шар гигант стеклянный', section='bubbles', sort_order=37 WHERE name='Шар-Баблс';
UPDATE t_p47738118_user_experience_enha.ball_types SET name='Баблс шар гигант латексный', section='bubbles', sort_order=33 WHERE name='Шар-Баблс гигант латексный';
UPDATE t_p47738118_user_experience_enha.ball_types SET name='Баблс шар гигант прозрачный', section='bubbles', sort_order=44 WHERE name='Шар-Баблс гигант прозрачный';
UPDATE t_p47738118_user_experience_enha.ball_types SET name='Баблс шар гигант стеклянный с надписью', section='bubbles', sort_order=38 WHERE name='Шар-Баблс гигант стеклянный';
UPDATE t_p47738118_user_experience_enha.ball_types SET name='Баблс шар гигант прозрачный с надписью', section='bubbles', sort_order=45 WHERE name='Шар-Баблс прозрачный';
UPDATE t_p47738118_user_experience_enha.ball_types SET name='Баблс шар гигант стеклянный с конфетти и надписью', section='bubbles', sort_order=42 WHERE name='Шар-Баблс стеклянный';