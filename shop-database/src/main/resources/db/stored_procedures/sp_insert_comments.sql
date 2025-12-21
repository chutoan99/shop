CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_insert_comments"(
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
        INSERT INTO defaultdb.comments (
    		id, order_id, item_id, rating, user_id, shop_id, parent_cmt_id, 
    		comment, rating_star, status, author_username, author_portrait, 
    		images, cover, videos, tier_variation, list_option, is_replied, 
    		level, is_shop, like_count, liked, created_at
        ) 
        SELECT 
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.order_id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.item_id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.rating')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.user_id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.shop_id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.parent_cmt_id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.comment')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.rating_star')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.status')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.author_username')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.author_portrait')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.images')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.cover')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.videos')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.tier_variation')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.list_option')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.is_replied')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.level')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.is_shop')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.like_count')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.liked')),
			IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')), ''), NOW())
        FROM dual
        WHERE NOT EXISTS (
            SELECT 1 FROM defaultdb.comments comm WHERE comm.id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id'))
        );

        SET i = i + 1;
    END WHILE;

    -- Commit transaction
    COMMIT;
END