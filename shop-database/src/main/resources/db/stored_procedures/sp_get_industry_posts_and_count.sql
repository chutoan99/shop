CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_industry_posts_and_count"(
	IN json_params JSON
)
BEGIN
    -- Khai báo các biến để sử dụng cho câu lệnh truy vấn
    DECLARE v_limit INT DEFAULT 10;
    DECLARE v_page INT DEFAULT 0;
    DECLARE v_category_name VARCHAR(255) DEFAULT '';
    DECLARE v_offset INT DEFAULT 0;

    -- Lấy dữ liệu từ JSON, sử dụng COALESCE để đảm bảo giá trị mặc định khi không có tham số
    SET v_limit = COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.limit')) AS UNSIGNED), 10);
    SET v_page = COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.page')) AS UNSIGNED), 0);
    SET v_category_name = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.category_name')), '');

    -- Tính toán offset dựa trên trang và giới hạn
    SET v_offset = v_page * v_limit;

    -- Câu truy vấn động để lấy tổng số bài viết (COUNT)
    SET @count_query = 'SELECT COUNT(*) AS total FROM defaultdb.posts po 
                        INNER JOIN defaultdb.industries ind ON po.cat_id = ind.id 
                        WHERE ind.category_name LIKE ?';

    -- Câu truy vấn động để lấy danh sách bài viết
    SET @sql_query = CONCAT(
        'SELECT po.id, po.shop_id, po.cat_id, po.name, po.image, po.historical_sold, ',
        'po.discount, po.show_free_shipping, po.is_service_by_shop, po.shop_rating, ',
        'po.filename, po.shop_name, po.liked, po.stock, po.price_before_discount, po.price_min_before_discount, ',
        'po.price_min, po.price, po.price_max, po.price_max_before_discount, po.created_at, po.updated_at ',
        'FROM defaultdb.posts po INNER JOIN defaultdb.industries ind ON po.cat_id = ind.id ',
        'WHERE ind.category_name LIKE ? ',
        'ORDER BY po.created_at DESC ',
        'LIMIT ? OFFSET ?'
    );
    
    -- Thực thi truy vấn đếm số bài viết
    PREPARE stmt_count FROM @count_query;
    SET @name_param_count = CONCAT('%', v_category_name, '%');
    EXECUTE stmt_count USING @name_param_count;
    DEALLOCATE PREPARE stmt_count;

    -- Thực thi truy vấn lấy danh sách bài viết
    PREPARE stmt FROM @sql_query;
    SET @name_param_list = CONCAT('%', v_category_name, '%');
    SET @limit_param = v_limit;
    SET @offset_param = v_offset;
    EXECUTE stmt USING @name_param_list, @limit_param, @offset_param;
    DEALLOCATE PREPARE stmt;
END