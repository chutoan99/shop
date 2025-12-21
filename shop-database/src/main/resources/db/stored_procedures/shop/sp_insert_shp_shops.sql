
CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_insert_shp_shops"(
    IN json_array JSON
)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE count INT;
    DECLARE json_obj JSON;

    -- Lấy số lượng phần tử trong mảng JSON
    SET count = JSON_LENGTH(json_array);

    -- Bắt đầu transaction
    START TRANSACTION;

    WHILE i < count DO
        -- Lấy từng object từ JSON array
        SET json_obj = JSON_EXTRACT(json_array, CONCAT('$[', i, ']'));

        -- Thêm dữ liệu vào bảng nếu id chưa tồn tại
        INSERT INTO defaultdb.shops (
            id, user_id, portrait, username, is_official_shop, shop_location, 
            item_count, name, cover, rating_star, rating_bad, rating_good, 
            rating_normal, follower_count, status, response_time, description, 
            followed, response_rate, country, last_active_time, created_at
        ) 
        SELECT 
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.user_id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.portrait')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.username')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.is_official_shop')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.shop_location')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.item_count')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.name')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.cover')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.rating_star')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.rating_bad')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.rating_good')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.rating_normal')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.follower_count')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.status')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.response_time')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.description')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.followed')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.response_rate')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.country')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.last_active_time')),
            IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')), ''), NOW())
        FROM dual
        WHERE NOT EXISTS (
            SELECT 1 FROM defaultdb.shops WHERE id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id'))
        );

        SET i = i + 1;
    END WHILE;

    -- Commit transaction
    COMMIT;

END