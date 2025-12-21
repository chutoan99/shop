CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_suggests_search"()
BEGIN
	
	-- Xử lý lỗi SQL và trả về thông báo khi có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy danh mục ngành';
    END;
	
	SELECT 
		sug.id, 
		sug.text, 
		sug.count, 
		sug.metadata,
		sug.created_at, 
		sug.updated_at
	FROM defaultdb.suggests_search sug where sug.deleted_at IS NULL; 
END