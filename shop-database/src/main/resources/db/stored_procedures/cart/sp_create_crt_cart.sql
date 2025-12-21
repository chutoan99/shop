CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_create_crt_cart"(
	IN json_obj JSON
)
BEGIN
	
	DECLARE v_id BIGINT;
    DECLARE v_user_id BIGINT;
    DECLARE v_item_id BIGINT;
    DECLARE v_shop_id BIGINT;
    DECLARE v_variation TEXT;
    DECLARE v_amount INT;
    DECLARE v_created_at DATETIME;
    DECLARE v_existing_id BIGINT;
    DECLARE v_existing_amount INT;
   
   
    -- Bắt lỗi SQL và rollback nếu có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình thêm vào giỏ hàng';
    END;
   
    
    -- Lấy giá trị từ JSON
    SET v_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id'));
    SET v_user_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.user_id'));
    SET v_item_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.item_id'));
    SET v_shop_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.shop_id'));
    SET v_variation = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.variation'));
    SET v_amount = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.amount'));
    SET v_created_at = IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')), ''), NOW());
    
    -- Bắt đầu transaction
    -- START TRANSACTION;
   
    -- Kiểm tra xem item đã tồn tại trong giỏ hàng chưa
    SELECT id, amount INTO v_existing_id, v_existing_amount
    FROM defaultdb.carts
    WHERE user_id = v_user_id
      AND item_id = v_item_id
      AND shop_id = v_shop_id
      AND JSON_CONTAINS(variation, v_variation)
    LIMIT 1;
    
    -- Nếu item đã tồn tại, cập nhật số lượng
    IF v_existing_id IS NOT NULL THEN
        UPDATE defaultdb.carts
        SET amount = v_existing_amount + v_amount
        WHERE id = v_existing_id;
    END IF;
   
    -- Nếu item chưa tồn tại, thêm mới
    INSERT INTO defaultdb.carts (id, user_id, item_id, shop_id, variation, amount, created_at) 
    VALUES (v_id, v_user_id, v_item_id, v_shop_id, v_variation, v_amount, v_created_at);
   
    -- Commit transaction
   	-- COMMIT;

END