CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_search_home_categories"(
	IN json_params JSON
)
BEGIN 
	
	DECLARE v_level INT DEFAULT 0;
    DECLARE v_parent_cat_id INT DEFAULT 0;
	DECLARE condition_clause VARCHAR(1000) DEFAULT ' WHERE 1=1'; 
	
    SET v_level = CAST(JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.level')) AS UNSIGNED);
    SET v_parent_cat_id = CAST(JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.parent_cat_id')) AS UNSIGNED);
    
    -- Kiểm tra và bổ sung điều kiện nếu giá trị khác 0
    IF v_level IS NOT NULL AND v_level <> 0 THEN
        SET condition_clause = CONCAT(condition_clause, ' AND level = ', v_level); 
    END IF;
    
    IF v_parent_cat_id IS NOT NULL AND v_parent_cat_id <> 0 THEN
        SET condition_clause = CONCAT(condition_clause, ' AND parent_cat_id = ', v_parent_cat_id); 
    END IF;

	SET @sql_query = CONCAT('SELECT * FROM home_categories', condition_clause);
	PREPARE stmt FROM @sql_query; 
	EXECUTE stmt; 
	DEALLOCATE PREPARE stmt; 

END