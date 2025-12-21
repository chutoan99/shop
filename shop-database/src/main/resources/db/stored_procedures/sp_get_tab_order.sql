CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_get_tab_order"(
	IN userId INT
)
BEGIN
	
	-- Xử lý lỗi SQL và trả về thông báo khi có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình lấy danh mục ngành';
    END;
	
	SELECT
		JSON_OBJECT(
			'is_all', COUNT(ord.id),
			'is_wait_for_confirm', COALESCE(SUM(CASE WHEN ord.type = 1 THEN 1 ELSE 0 END),0),
			'is_wait_for_pay', COALESCE(SUM(CASE WHEN ord.type = 2 THEN 1 ELSE 0 END),0),
			'is_transport', COALESCE(SUM(CASE WHEN ord.type = 3 THEN 1 ELSE 0 END),0),
			'is_delivering', COALESCE(SUM(CASE WHEN ord.type = 4 THEN 1 ELSE 0 END),0),
			'is_cancelled', COALESCE(SUM(CASE WHEN ord.type = 5 THEN 1 ELSE 0 END),0),
			'is_success', COALESCE(SUM(CASE WHEN ord.type = 6 THEN 1 ELSE 0 END),0),
			'is_returns', COALESCE(SUM(CASE WHEN ord.type = 7 THEN 1 ELSE 0 END),0)
		) AS tab
	FROM
		defaultdb.orders ord
	WHERE
		ord.user_id = userId
	LIMIT 1;

END