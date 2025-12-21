CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_insert_usr_users"(
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
        INSERT INTO defaultdb.users (
            id, shop_id, name, username, email, sex, role, avatar, 
            address_obj, phone, password, created_at
        ) 
        SELECT 
            JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.shop_id')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.name')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.username')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.email')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.sex')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.role')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.avatar')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.address_obj')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.phone')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.password')),
            IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')), ''), NOW())
        FROM dual
        WHERE NOT EXISTS (
            SELECT 1 FROM defaultdb.users u WHERE u.id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id'))
        );

        SET i = i + 1;
    END WHILE;

    -- Commit transaction
    COMMIT;
END