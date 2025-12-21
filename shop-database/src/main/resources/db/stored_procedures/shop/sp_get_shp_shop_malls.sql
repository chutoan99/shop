CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_shp_shop_malls"()
BEGIN
	
	-- Xử lý lỗi SQL và trả về thông báo khi có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy danh mục ngành';
    END;
	
	SELECT * 
	FROM defaultdb.shop_malls mall 
	Where mall.deleted_at IS NULL;

END