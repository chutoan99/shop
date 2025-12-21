CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_sys_batch_lists"()
BEGIN
    -- Xử lý lỗi SQL và trả về thông báo khi có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy thông tin batch list';
    END;

    -- Truy vấn lấy tất cả batch lists không bị xóa
    SELECT *
    FROM defaultdb.batch_lists ba
    WHERE ba.deleted_at IS NULL;
END