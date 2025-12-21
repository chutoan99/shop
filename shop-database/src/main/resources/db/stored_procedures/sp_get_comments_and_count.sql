CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_comments_and_count"(
    IN json_params JSON
)
BEGIN
    -- Khai báo biến
    DECLARE v_item_id BIGINT;
    DECLARE v_shop_id BIGINT;
    DECLARE v_limit INT DEFAULT 10;
    DECLARE v_offset INT DEFAULT 0;

    -- Lấy giá trị từ JSON (Kiểm tra NULL để tránh lỗi)
    SET v_item_id = COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.item_id')) AS UNSIGNED), 0);
    SET v_shop_id = COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.shop_id')) AS UNSIGNED), 0);
    SET v_limit = COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.limit')) AS UNSIGNED), 10);
    SET v_offset = COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.offset')) AS UNSIGNED), 0);

    -- Chuyển đổi biến local sang biến user-defined
    SET @item_id = v_item_id;
    SET @shop_id = v_shop_id;
    SET @limit = v_limit;
    SET @offset = v_offset;

    -- Câu truy vấn đếm số lượng bình luận gốc
    SET @count_query = 'SELECT COUNT(*) AS total 
                        FROM comments 
                        WHERE item_id = ? 
                        AND shop_id = ? 
                        AND parent_cmt_id = 0';

    -- Câu truy vấn lấy danh sách bình luận gốc và các bình luận con dưới dạng JSON
    SET @sql_query = CONCAT(
        'SELECT c.id, c.parent_cmt_id, c.user_id, c.shop_id, c.item_id, c.level, c.is_shop, ',
        'c.rating, c.comment, c.rating_star, c.status, c.author_username, c.author_portrait, ',
        'c.images, c.cover, c.videos, c.like_count, c.created_at, c.updated_at, ',
        'COALESCE(( ',
        '    SELECT JSON_ARRAYAGG( ',
        '        JSON_OBJECT( ',
        '            "id", child.id, ',
        '            "parent_cmt_id", child.parent_cmt_id, ',
        '            "user_id", child.user_id, ',
        '            "shop_id", child.shop_id, ',
        '            "item_id", child.item_id, ',
        '            "level", child.level, ',
        '            "is_shop", child.is_shop, ',
        '            "rating", child.rating, ',
        '            "comment", child.comment, ',
        '            "rating_star", child.rating_star, ',
        '            "status", child.status, ',
        '            "author_username", child.author_username, ',
        '            "author_portrait", child.author_portrait, ',
        '            "images", child.images, ',
        '            "cover", child.cover, ',
        '            "videos", child.videos, ',
        '            "like_count", child.like_count, ',
        '            "created_at", child.created_at, ',
        '            "updated_at", child.updated_at ',
        '        ) ',
        '    ) FROM comments child WHERE child.parent_cmt_id = c.id ',
        '), CAST(''[]'' AS JSON)) AS reps ',  -- Sửa lỗi JSON_ARRAYAGG trả về NULL
        'FROM comments c ',
        'WHERE c.item_id = ? AND c.shop_id = ? AND c.parent_cmt_id = 0 ',
        'ORDER BY c.created_at DESC ',
        'LIMIT ? OFFSET ?'
    );

    -- Debug SQL (chỉ dùng khi cần kiểm tra lỗi, có thể xóa)
    -- SELECT @sql_query;  

    -- Thực thi truy vấn đếm số lượng bình luận
    PREPARE stmt_count FROM @count_query;
    EXECUTE stmt_count USING @item_id, @shop_id;
    DEALLOCATE PREPARE stmt_count;

    -- Thực thi truy vấn lấy danh sách bình luận
    PREPARE stmt FROM @sql_query;
    EXECUTE stmt USING @item_id, @shop_id, @limit, @offset;
    DEALLOCATE PREPARE stmt;
END