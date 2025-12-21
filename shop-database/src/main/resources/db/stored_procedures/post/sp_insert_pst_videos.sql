
CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_insert_pst_videos"(
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
        INSERT INTO defaultdb.videos (
    		id, thumb_url, duration, version, defn, profile, 
    		url, width, height, created_at
        ) 
        SELECT 
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.thumb_url')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.duration')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.version')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.defn')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.profile')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.url')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.width')),
			JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.height')),
			IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')), ''), NOW())
        FROM dual
        WHERE NOT EXISTS (
            SELECT 1 FROM defaultdb.videos vi WHERE vi.id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id'))
        );

        SET i = i + 1;
    END WHILE;

    -- Commit transaction
    COMMIT;
	
END