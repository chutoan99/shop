CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_industries"()
BEGIN
    -- Xử lý lỗi SQL và trả về thông báo khi có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy danh mục ngành';
    END;

    -- Truy vấn lấy danh mục ngành
    SELECT ind.id,
           ind.parent_cat_id,
           ind.level,
           ind.category_name,
           ind.images,
           ind.metadata,
           ind.created_at,
           ind.updated_at
    FROM defaultdb.industries ind
    WHERE ind.deleted_at IS NULL;

END