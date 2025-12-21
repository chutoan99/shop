CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_create_order"(
	IN json_obj JSON
)
BEGIN
	
	DECLARE v_id BIGINT;
	DECLARE v_user_id BIGINT; 
	DECLARE v_type INT;
	DECLARE v_state VARCHAR(255); 
	DECLARE v_final_total INT;
	DECLARE v_ship_cost INT;
	DECLARE v_metadata TEXT; 
	DECLARE v_user TEXT; 
	DECLARE v_created_at DATETIME;
	DECLARE v_count INT DEFAULT 0;


   	-- Bắt lỗi và rollback nếu có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
	    -- ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình CREATE';
    END;

    -- Lấy giá trị từ JSON
    SET v_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id'));
    SET v_user_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.user_id'));
	SET v_type = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.type'));
    SET v_state = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.state'));
    SET v_final_total = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.final_total'));
	SET v_ship_cost = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.ship_cost'));
    SET v_metadata = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.metadata'));
    SET v_user = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.user'));
    SET v_created_at = IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')), ''), NOW());
   
        -- Chuyển object `metadata` và `user` thành JSON string nếu cần
--         SET v_metadata = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.metadata'));
--         SET v_user = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.user'));

		INSERT INTO defaultdb.orders (id, user_id, type, state, final_total, ship_cost, metadata, user, created_at) 
		VALUES (v_id, v_user_id, v_type, v_state, v_final_total, v_ship_cost, v_metadata, v_user, v_created_at);
	
END