CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_insert_pst_discounts"(
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
        INSERT INTO defaultdb.discounts (
    		id, promotion_price, hidden_promotion_price, 
    		start_time, end_time, created_at, updated_at
        ) 
        SELECT 
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.promotion_price')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.hidden_promotion_price')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.start_time')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.end_time')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')),
		 	IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')), ''), NOW())
        FROM dual
        WHERE NOT EXISTS (
            SELECT 1 FROM defaultdb.discounts dis WHERE dis.id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id'))
        );

        SET i = i + 1;
    END WHILE;

    -- Commit transaction
    COMMIT;
END