CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_insert_home_categories"(
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
        INSERT INTO defaultdb.home_categories (
          	id, parent_cat_id, name, display_name, image, unselected_image, selected_image, level, created_at 
        ) 
        SELECT 
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.parent_cat_id')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.name')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.display_name')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.image')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.unselected_image')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.selected_image')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.level')),
            IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')), ''), NOW())
        FROM dual
        WHERE NOT EXISTS (
            SELECT 1 FROM defaultdb.home_categories home_ca WHERE home_ca.id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id'))
        );

        SET i = i + 1;
    END WHILE;

    -- Commit transaction
    COMMIT;
END