CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_create_usr_user"(
	IN json_obj JSON
)
BEGIN
	
	DECLARE v_id BIGINT;
	DECLARE v_shop_id BIGINT; 
	DECLARE v_username VARCHAR(255); 
	DECLARE v_email VARCHAR(255); 
	DECLARE v_name VARCHAR(255);
	DECLARE v_sex INT;
	DECLARE v_phone VARCHAR(20);
	DECLARE v_role VARCHAR(255); 
	DECLARE v_filename VARCHAR(255);
	DECLARE v_avatar VARCHAR(255);
	DECLARE v_password VARCHAR(255); 
	DECLARE v_address_obj TEXT;
	DECLARE v_created_at DATETIME;
	DECLARE v_updated_at DATETIME;

   	-- Bắt lỗi và rollback nếu có lỗi xảy ra
--     DECLARE EXIT HANDLER FOR SQLEXCEPTION
--     BEGIN
-- 	    -- ROLLBACK;
--         SIGNAL SQLSTATE '45000'
--         SET MESSAGE_TEXT = 'Lỗi trong quá trình CREATE';
--     END;

    -- Lấy giá trị từ JSON   
   	SET v_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id'));
  	SET v_shop_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.shop_id'));
	SET v_username = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.username')), '');
	SET v_email = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.email')), '');
	SET v_name = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.name')), '');
 	SET v_sex = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.sex')), 0);
	SET v_phone = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.phone')), '');
	SET v_role = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.role')), '');
	SET v_filename = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.filename')), '');
	SET v_avatar = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.avatar')), '');
	SET v_password = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.password')), '');
	SET v_address_obj = JSON_EXTRACT(json_obj, '$.address_obj');
	SET v_created_at =  NOW();
	SET v_updated_at =  NOW();
   
	INSERT INTO defaultdb.users (id, shop_id, username, email, name, sex, phone, role, filename, avatar, password, address_obj, created_at, updated_at) 
	VALUES (v_id, v_shop_id, v_username, v_email, v_name, v_sex, v_phone, v_role, v_filename, v_avatar, v_password, v_address_obj, v_created_at, v_updated_at);
	
END