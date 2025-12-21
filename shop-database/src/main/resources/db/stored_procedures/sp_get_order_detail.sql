CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_order_detail"(
    IN orderId BIGINT,
    IN userId BIGINT
)
BEGIN
    DECLARE v_order_exists INT DEFAULT 0;

    -- Bắt lỗi SQL và trả về thông báo nếu có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy thông tin đơn hàng';
    END;

    -- Kiểm tra xem đơn hàng có tồn tại hay không
    SELECT COUNT(*) INTO v_order_exists
    FROM defaultdb.orders
    WHERE id = orderId AND user_id = userId AND delete_at IS NULL;

    -- Nếu đơn hàng không tồn tại, báo lỗi
    IF v_order_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Order not found';
    END IF;

    -- Trả về thông tin đơn hàng
    SELECT ord.id,
           ord.type,
           ord.state,
           ord.final_total,
           ord.user_id,
           ord.ship_cost,
           ord.user,
           ord.metadata,
           ord.created_at
    FROM defaultdb.orders ord
    LEFT JOIN defaultdb.users u ON ord.user_id = u.id
    WHERE ord.id = orderId AND ord.user_id = userId AND ord.delete_at IS NULL;
END