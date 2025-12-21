CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_insert_flash_sales"(
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
        INSERT INTO defaultdb.flash_sales  (
	        id, shop_id, cat_id, name, image, stock, historical_sold, price, 
	        price_before_discount, discount, shop_rating, liked, is_official_shop, 
	        is_service_by_shopee, show_free_shipping, start_time, end_time, created_at  
        ) 
        SELECT 
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.shop_id')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.cat_id')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.name')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.image')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.stock')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.historical_sold')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.price')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.price_before_discount')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.discount')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.shop_rating')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.liked')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.is_official_shop')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.is_service_by_shopee')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.show_free_shipping')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.start_time')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.end_time')),
            IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')), ''), NOW())
        FROM dual
        WHERE NOT EXISTS (
            SELECT 1 FROM defaultdb.flash_sales fl WHERE fl.id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id'))
        );

        SET i = i + 1;
    END WHILE;

    -- Commit transaction
    COMMIT;
END