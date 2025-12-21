CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_top_products"()
BEGIN
	
	
	-- Xử lý lỗi SQL và trả về thông báo khi có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy danh mục ngành';
    END;
	
	SELECT top.id,
	       top.data_type,
	       top.count ,
	       top.name,
	       top.images,
	       top.metadata,
	       top.sort_type,
	       top.best_price,
	       top.display_text,
	       top.created_at,
	       top.updated_at
	FROM defaultdb.top_products top where top.deleted_at IS NULL;

END