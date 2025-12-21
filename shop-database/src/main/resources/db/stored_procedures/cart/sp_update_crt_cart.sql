CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_update_crt_cart"(
	IN json_obj JSON,
	IN cartId BIGINT,
	IN userId BIGINT
)
BEGIN
	
 	DECLARE v_variation TEXT;
    DECLARE v_amount INT;
    DECLARE v_updated_at DATETIME;
    DECLARE v_cart_exists INT DEFAULT 0;
   
    -- Bắt lỗi và rollback nếu có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
	    -- ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình UPDATE';
    END;
   
    -- Kiểm tra xem cart có tồn tại không
    SELECT COUNT(*) INTO v_cart_exists
    FROM defaultdb.carts
    WHERE id = cartId AND user_id = userId;

    IF v_cart_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'not found';
    END IF;
          
    -- Lấy giá trị từ JSON
    SET v_variation = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.variation'));
    SET v_amount = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.amount'));
    SET v_updated_at = IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.updated_at')), ''), NOW());

   
    -- Bắt đầu giao dịch
	-- START TRANSACTION;

    UPDATE defaultdb.carts 
    SET variation = v_variation, 
        amount = v_amount, 
        updated_at = v_updated_at
    WHERE id = cartId AND user_id = userId;
   
    -- Hoàn thành giao dịch
	-- COMMIT;
	
END