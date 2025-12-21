CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_insert_suggests_search"(
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
        INSERT INTO defaultdb.suggests_search (
            text, count, created_at
        ) 
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.text')),
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.count')),
            IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')), ''), NOW())
        );

        -- Tăng biến đếm
        SET i = i + 1;
    END WHILE;

    -- Commit transaction
    COMMIT;
END