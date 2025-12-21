CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_create_pst_history_tracking"(
	IN json_obj JSON
)
BEGIN
	
	DECLARE v_user_id BIGINT;
    DECLARE v_text NVARCHAR(255);
    DECLARE v_created_at DATETIME;

    -- Lấy giá trị từ JSON
    SET v_user_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.user_id'));
    SET v_text = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.text'));
    SET v_created_at = IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')), ''), NOW());
    
    -- Bắt đầu transaction
    START TRANSACTION;
   
		INSERT INTO defaultdb.histories_tracking (user_id, text, created_at)
		VALUES (v_user_id, v_text, v_created_at);

    -- Commit transaction
    COMMIT;
   
END