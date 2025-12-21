CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_pst_history_tracking"(
    IN userId INT
)
BEGIN
    -- Xử lý lỗi SQL và trả về thông báo khi có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy lịch sử tìm kiếm';
    END;

    -- Truy vấn lấy lịch sử tìm kiếm của người dùng
    SELECT hi.id,
           hi.user_id,
           hi.text,
           hi.metadata,
           hi.created_at,
           hi.updated_at
    FROM defaultdb.histories_search hi
    WHERE hi.user_id = userId
      AND hi.delete_at IS NULL
    ORDER BY hi.created_at DESC
    LIMIT 10;
    
END