CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_insert_top_products"(
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

        -- Thêm dữ liệu vào bảng, id tự tăng (AUTO_INCREMENT)
        INSERT INTO defaultdb.top_products (
            data_type, count, name, images, sort_type, best_price, display_text, created_at 
        ) 
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.data_type')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.count')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.name')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.images')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.sort_type')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.best_price')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.display_text')),
            IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')), ''), NOW())
        );

        -- Tăng biến đếm
        SET i = i + 1;
    END WHILE;

    -- Commit transaction
    COMMIT;
END