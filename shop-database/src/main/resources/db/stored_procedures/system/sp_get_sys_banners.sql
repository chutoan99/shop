CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_sys_banners"()
BEGIN
    -- Bắt lỗi SQL và trả về thông báo nếu có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy thông tin banner';
    END;

    -- Truy vấn lấy tất cả banners không bị xóa
    SELECT *
    FROM defaultdb.banners bann
    WHERE bann.deleted_at IS NULL;
END