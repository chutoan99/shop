CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_flash_sales"()
BEGIN
    -- Xử lý lỗi SQL và trả về thông báo khi có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy thông tin flash sales';
    END;

    -- Truy vấn lấy danh sách flash sales
    SELECT fl.id,
           fl.shop_id,
           fl.cat_id,
           fl.name,
           fl.image,
           fl.price,
           fl.price_before_discount,
           fl.stock,
           fl.discount,
           fl.shop_rating,
           fl.filename,
           fl.liked,
           fl.is_official_shop,
           fl.is_service_by_shopee,
           fl.start_time,
           fl.end_time,
           fl.metadata,
           fl.created_at,
           fl.updated_at
    FROM defaultdb.flash_sales fl
    WHERE fl.deleted_at IS NULL;
    
END