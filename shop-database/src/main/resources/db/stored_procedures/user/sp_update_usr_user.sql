CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_update_usr_user"(
    IN json_obj JSON
)
BEGIN
	
    DECLARE v_id BIGINT;
	DECLARE v_sex INT;
	DECLARE v_phone VARCHAR(20);
	DECLARE v_name VARCHAR(255);
	DECLARE v_email VARCHAR(255);
	DECLARE v_avatar VARCHAR(255);
	DECLARE v_filename VARCHAR(255);
	DECLARE v_address_obj TEXT;
	DECLARE v_updated_at DATETIME;
	DECLARE v_user_exists INT DEFAULT 0;

	-- Bắt lỗi và rollback nếu có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
	    -- ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình UPDATE';
    END;

    -- Lấy ID từ JSON
    SET v_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id'));

    -- Kiểm tra xem user có tồn tại không
    SELECT COUNT(*) INTO v_user_exists
    FROM defaultdb.users u
    WHERE u.id = v_id;

    IF v_user_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Người dùng không tồn tại';
    END IF;

    -- Lấy dữ liệu từ JSON
    SET v_sex = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.sex')), '');
    SET v_phone = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.phone')), '');
    SET v_name = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.name')), '');
    SET v_email = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.email')), '');
    SET v_avatar = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.avatar')), '');
   	SET v_address_obj = JSON_EXTRACT(json_obj, '$.address_obj');
    SET v_filename = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.filename')), '');
    SET v_updated_at = IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.updated_at')), ''), NOW());

  	-- Bắt đầu giao dịch
	-- START TRANSACTION;
  
    UPDATE defaultdb.users 
    SET 
        sex = v_sex,
        email = v_email,
        name = v_name,
        address_obj = v_address_obj,
        phone = v_phone,
        filename = v_filename,
        avatar = v_avatar,
        updated_at = v_updated_at
    WHERE id = v_id;
   
   -- Hoàn thành giao dịch
	-- COMMIT;

END