CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_usr_user_detail"(
    IN userId BIGINT
)
BEGIN
    DECLARE v_user_count INT DEFAULT 0;

    -- Bắt lỗi SQL và trả về thông báo nếu có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy thông tin người dùng';
    END;

    -- Kiểm tra xem user có tồn tại không
    SELECT COUNT(*) INTO v_user_count
    FROM users
    WHERE id = userId AND deleted_at IS NULL;

    -- Nếu user không tồn tại, báo lỗi
    IF v_user_count = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User not found';
    END IF;

    -- Trả về thông tin user
    SELECT u.id,
           u.shop_id,
           u.username,
           u.name,
           u.email,
           u.sex,
           u.birthday,
           u.phone,
           u.avatar,
           u.filename,
           u.is_verified,
           u.role,
           u.address_obj,
           u.not_new_user,
           u.created_at,
           u.updated_at
    FROM users u
    WHERE u.id = userId AND u.deleted_at IS NULL;
END