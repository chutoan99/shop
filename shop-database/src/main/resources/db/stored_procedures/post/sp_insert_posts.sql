CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_insert_posts"(
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
        INSERT INTO defaultdb.posts (
    		id, shop_id, currency, stock, status, sold, liked_count, 
    		promotion_id, video_id, discount_id, cat_id, cmt_count, 
    		discount, description, raw_discount, size_chart, shop_name, 
    		transparent_background_image, images, view_count, name, 
    		image, historical_sold, price, price_min, price_max, 
    		price_before_discount, price_min_before_discount, 
    		price_max_before_discount, shop_rating, liked, is_official_shop, 
    		is_service_by_shop, show_free_shipping, variations, created_at
        ) 
        SELECT 
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.shop_id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.currency')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.stock')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.status')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.sold')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.liked_count')),
            CAST(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.promotion_id')), 'null') AS SIGNED),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.video_id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.discount_id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.cat_id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.cmt_count')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.discount')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.description')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.raw_discount')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.size_chart')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.shop_name')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.transparent_background_image')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.images')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.view_count')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.name')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.image')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.historical_sold')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.price')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.price_min')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.price_max')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.price_before_discount')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.price_min_before_discount')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.price_max_before_discount')),
            CAST(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.shop_rating')), 'null') AS DECIMAL(10,6)),
            CAST(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.liked')) AS UNSIGNED),
            CAST(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.is_official_shop')) AS UNSIGNED),
            CAST(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.is_service_by_shop')) AS UNSIGNED),
            CAST(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.show_free_shipping')) AS UNSIGNED),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.variations')),
            IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')), ''), NOW())
        FROM dual
        WHERE NOT EXISTS (
            SELECT 1 FROM defaultdb.posts po WHERE po.id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id'))
        );

        SET i = i + 1;
    END WHILE;

    -- Commit transaction
    COMMIT;
END