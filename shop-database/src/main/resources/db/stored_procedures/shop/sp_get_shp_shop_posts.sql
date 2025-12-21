CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_shp_shop_posts"(
	IN shopId INT
)
BEGIN
	
	-- Xử lý lỗi SQL và trả về thông báo khi có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy danh mục ngành';
    END;
	
	SELECT po.id,
	       po.shop_id,
	       po.cat_id,
	       po.name,
	       po.image,
	       po.historical_sold,
	       po.discount,
	       po.show_free_shipping,
	       po.is_official_shop,
	       po.is_service_by_shop,
	       po.shop_rating,
	       po.filename,
	       po.shop_name,
	       po.liked,
	       po.stock,
	       po.price_before_discount,
	       po.price_min_before_discount,
	       po.price_min,
	       po.price,
	       po.price_max,
	       po.price_max_before_discount,
	       po.created_at,
	       po.updated_at
	FROM defaultdb.posts po
	WHERE po.shop_id = shopId AND po.delete_at IS NULL
	ORDER BY created_at DESC;

END