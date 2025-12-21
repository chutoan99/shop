
CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_shp_shop_detail"(
    IN shopId INT
)
BEGIN
    DECLARE v_shop_exists INT DEFAULT 0;

    -- Bắt lỗi SQL và trả về thông báo nếu có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy thông tin shop';
    END;

    -- Kiểm tra xem shop có tồn tại hay không
    SELECT COUNT(*) INTO v_shop_exists
    FROM defaultdb.shops
    WHERE id = shopId AND deleted_at IS NULL;

    -- Nếu shop không tồn tại, báo lỗi
    IF v_shop_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Shop not found';
    END IF;

    -- Trả về thông tin shop
    SELECT sh.id,
           sh.user_id,
           sh.item_count,
           sh.name,
           sh.cover,
           sh.follower_count,
           sh.rating_star,
           sh.rating_bad,
           sh.rating_good,
           sh.rating_normal,
           sh.status,
           sh.shop_location,
           sh.username,
           sh.portrait,
           sh.response_rate,
           sh.country,
           sh.response_time,
           sh.description,
           sh.followed,
           sh.last_active_time,
           sh.is_official_shop,
           sh.metadata,
           sh.created_at,
           sh.updated_at
    FROM defaultdb.shops sh
    WHERE sh.id = shopId AND sh.deleted_at IS NULL;
END