CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_delete_crt_cart_by_id"(
    IN cartId BIGINT,
    IN userId BIGINT
)
BEGIN
    DECLARE v_cart_exists INT DEFAULT 0;
    
    -- Bắt lỗi và rollback nếu có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình DELETE';
    END;
    
    -- Kiểm tra xem cart có tồn tại không
    SELECT COUNT(*) INTO v_cart_exists
    FROM defaultdb.carts
    WHERE id = cartId AND user_id = userId;
    
    IF v_cart_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Giỏ hàng không tồn tại';
    END IF;
    
    -- Bắt đầu giao dịch
    -- START TRANSACTION;
    
    -- Xóa giỏ hàng
    DELETE FROM defaultdb.carts WHERE id = cartId AND user_id = userId;
    

    -- Hoàn thành giao dịch
    -- COMMIT;
END