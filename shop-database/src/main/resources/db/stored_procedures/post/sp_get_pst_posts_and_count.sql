CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_pst_posts_and_count"(
	IN json_params JSON
)
BEGIN

 	DECLARE v_limit INT DEFAULT 10;
    DECLARE v_page INT DEFAULT 0;
    DECLARE v_name VARCHAR(255) DEFAULT '';

    -- Lấy dữ liệu từ JSON
    SET v_limit = COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.limit')) AS UNSIGNED), 10);
    SET v_page = COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.page')) AS UNSIGNED), 0);
    SET v_name = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.name')), '');

    -- Câu truy vấn động để lấy tổng số bài viết
    SET @count_query = 'SELECT COUNT(*) AS total FROM posts WHERE name LIKE ?';

    -- Câu truy vấn động để lấy danh sách bài viết
    SET @sql_query = CONCAT(
        'SELECT id, shop_id, cat_id, name, image, historical_sold, discount, ',
        'show_free_shipping, is_official_shop, is_service_by_shop, shop_rating, ',
        'filename, shop_name, liked, stock, price_before_discount, ',
        'price_min_before_discount, price_min, price, price_max, ',
        'price_max_before_discount, created_at, updated_at ',
        'FROM posts WHERE name LIKE ? ',
        'ORDER BY created_at DESC ',
        'LIMIT ? OFFSET ?'
    );

    -- Chuẩn bị và thực thi truy vấn đếm tổng số bài viết
    PREPARE stmt_count FROM @count_query;
    SET @name_param_count = CONCAT('%', v_name, '%');
    EXECUTE stmt_count USING @name_param_count;
    DEALLOCATE PREPARE stmt_count;

    -- Chuẩn bị và thực thi truy vấn danh sách bài viết
    PREPARE stmt FROM @sql_query;
    SET @name_param_list = CONCAT('%', v_name, '%');
    SET @limit_param = v_limit;
    SET @page_param = v_page;
    EXECUTE stmt USING @name_param_list, @limit_param, @page_param;
    DEALLOCATE PREPARE stmt;
    
END