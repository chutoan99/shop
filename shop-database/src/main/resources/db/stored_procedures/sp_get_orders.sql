CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_orders"(
	IN userId INT,
	IN json_params JSON
)
BEGIN

 DECLARE v_type INT DEFAULT NULL;
    DECLARE v_sql TEXT;

    -- Lấy dữ liệu từ JSON
    SET v_type = CAST(JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.type')) AS UNSIGNED);

    -- Tạo truy vấn SQL động
    SET @sql_query = CONCAT(
        'SELECT ord.id, ord.type, ord.state, ord.final_total, ord.user_id, ord.ship_cost, ord.user, ord.metadata, ord.created_at ',
        'FROM defaultdb.orders ord ',
        'LEFT JOIN users u ON ord.user_id = u.id ',
        'WHERE ord.user_id = ? '
    );

    -- Nếu type > 0, thêm điều kiện lọc
    IF v_type > 0 THEN
        SET @sql_query = CONCAT(@sql_query, 'AND ord.type = ? ');
    END IF;

    -- Chuẩn bị truy vấn
    PREPARE stmt FROM @sql_query;

    -- Gán tham số
    SET @user_id_param = userId;
    SET @type_param = v_type;

    -- Thực thi truy vấn
    IF v_type > 0 THEN
        EXECUTE stmt USING @user_id_param, @type_param;
    ELSE
        EXECUTE stmt USING @user_id_param;
    END IF;

    -- Giải phóng bộ nhớ
    DEALLOCATE PREPARE stmt;
    
END