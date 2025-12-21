CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_pst_post_detail"(
    IN postId BIGINT
)
BEGIN
    DECLARE v_post_exists INT DEFAULT 0;

    -- Bắt lỗi SQL và trả về thông báo nếu có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy thông tin bài viết';
    END;

    -- Kiểm tra xem bài viết có tồn tại hay không
    SELECT COUNT(*) INTO v_post_exists
    FROM posts
    WHERE id = postId AND delete_at IS NULL;

    -- Nếu bài viết không tồn tại, báo lỗi
    IF v_post_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Post not found';
    END IF;

    -- Trả về thông tin bài viết và các liên kết (như shop, voucher, video, ngành)
    SELECT po.id,
           po.shop_id,
           po.cat_id,
           po.discount_id,
           po.currency,
           po.stock,
           po.status,
           po.sold,
           po.liked_count,
           po.cmt_count,
           po.discount,
           po.raw_discount,
           po.shop_name,
           po.description,
           po.view_count,
           po.name,
           po.image,
           po.price,
           po.price_min,
           po.price_max,
           po.historical_sold,
           po.price_before_discount,
           po.price_min_before_discount,
           po.price_max_before_discount,
           po.shop_rating,
           po.liked,
           po.is_official_shop,
           po.is_service_by_shop,
           po.show_free_shipping,
           po.variations,
           po.images,
           po.created_at,
           po.updated_at,
           
           -- Thông tin shop
           CASE
               WHEN shops.id IS NOT NULL THEN 
                    JSON_OBJECT (
                        'id', shops.id, 
                        'user_id', shops.user_id, 
                        'item_count', shops.item_count, 
                        'name', shops.name, 
                        'cover', shops.cover, 
                        'follower_count', shops.follower_count, 
                        'rating_star', shops.rating_star, 
                        'rating_bad', shops.rating_bad, 
                        'rating_good', shops.rating_good, 
                        'rating_normal', shops.rating_normal, 
                        'status', shops.status, 
                        'shop_location', shops.shop_location, 
                        'username', shops.username, 
                        'portrait', shops.portrait, 
                        'response_rate', shops.response_rate, 
                        'country', shops.country, 
                        'description', shops.description, 
                        'followed', shops.followed, 
                        'last_active_time', shops.last_active_time, 
                        'is_official_shop', shops.is_official_shop, 
                        'created_at', shops.created_at, 
                        'updated_at', shops.updated_at
                    )
               ELSE NULL
           END AS shop_info,
           
           -- Thông tin voucher
           CASE
               WHEN vouchers.id IS NOT NULL THEN 
                    JSON_OBJECT(
                        'id', vouchers.id, 
                        'label', vouchers.label, 
                        'voucher_code', vouchers.voucher_code
                    )
               ELSE NULL
           END AS voucher,
           
           -- Thông tin giảm giá (deep discount)
           CASE
               WHEN discounts.id IS NOT NULL THEN 
                    JSON_OBJECT(
                        'id', discounts.id, 
                        'text', discounts.text, 
                        'hidden_promotion_price', discounts.hidden_promotion_price, 
                        'promotion_price', discounts.promotion_price, 
                        'start_time', discounts.start_time, 
                        'end_time', discounts.end_time
                    )
               ELSE NULL
           END AS deep_discount_skin,
           
           -- Thông tin video
           CASE
               WHEN vi.id IS NOT NULL THEN 
                    JSON_OBJECT(
                        'id', vi.id, 
                        'thumb_url', vi.thumb_url, 
                        'duration', vi.duration, 
                        'version', vi.version, 
                        'width', vi.width, 
                        'height', vi.height, 
                        'defn', vi.defn, 
                        'profile', vi.profile, 
                        'url', vi.url
                    )
               ELSE NULL
           END AS video,
           
           -- Thông tin ngành nghề
           CASE
               WHEN industries.id IS NOT NULL THEN 
                    JSON_OBJECT(
                        'id', industries.id, 
                        'category_name', industries.category_name, 
                        'parent_cat_id', industries.parent_cat_id, 
                        'images', industries.images, 
                        'level', industries.level
                    )
               ELSE NULL
           END AS category
    FROM posts po
        LEFT JOIN vouchers ON po.promotion_id = vouchers.id
        LEFT JOIN shops ON po.shop_id = shops.id
        LEFT JOIN videos vi ON po.video_id = vi.id
        LEFT JOIN industries ON po.cat_id = industries.id
        LEFT JOIN discounts ON po.discount_id = discounts.id
    WHERE po.id = postId AND po.delete_at IS NULL;

END