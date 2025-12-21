CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_crt_carts"(
    IN userId INT
)
BEGIN
    -- Xử lý lỗi SQL và trả về thông báo khi có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy thông tin giỏ hàng';
    END;

    -- Truy vấn lấy giỏ hàng của người dùng
    SELECT ca.*,
           CASE
               WHEN po.id IS NOT NULL THEN 
                    JSON_OBJECT(
                        'item_id', po.id, 
                        'shop_id', po.shop_id, 
                        'cat_id', po.cat_id, 
                        'name', po.name, 
                        'image', po.image, 
                        'historical_sold', po.historical_sold, 
                        'discount', po.discount, 
                        'show_free_shipping', po.show_free_shipping, 
                        'is_official_shop', po.is_official_shop, 
                        'is_service_by_shop', po.is_service_by_shop, 
                        'shop_rating', po.shop_rating, 
                        'filename', po.filename, 
                        'shop_name', po.shop_name, 
                        'liked', po.liked, 
                        'stock', po.stock, 
                        'price_before_discount', po.price_before_discount, 
                        'price_min_before_discount', po.price_min_before_discount, 
                        'price_min', po.price_min, 
                        'price', po.price, 
                        'price_max', po.price_max, 
                        'price_max_before_discount', po.price_max_before_discount, 
                        'images', po.images, 
                        'variations', po.variations
                    )
               ELSE NULL
           END AS overview
    FROM defaultdb.carts ca
        LEFT JOIN defaultdb.posts po ON ca.item_id = po.id
    WHERE ca.user_id = userId 
      AND ca.delete_at IS NULL;
      
END