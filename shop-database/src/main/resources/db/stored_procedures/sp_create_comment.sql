CREATE DEFINER="avnadmin"@"%" PROCEDURE "sp_create_comment"(
	IN json_obj JSON
)
BEGIN

    DECLARE v_id bigint;
    DECLARE v_order_id bigint; 
    DECLARE v_item_id bigint;
    DECLARE v_rating int;
    DECLARE	v_user_id bigint;
    DECLARE v_shop_id bigint;
    DECLARE v_parent_cmt_id bigint;
    DECLARE v_comment Text;
    DECLARE v_rating_star int;
    DECLARE v_status int;
    DECLARE	v_author_username varchar(255);
    DECLARE v_author_portrait varchar(255);
    DECLARE v_images Text;
    DECLARE v_cover varchar(255);
    DECLARE v_videos varchar(255);
    DECLARE v_tier_variation varchar(255);
    DECLARE	v_list_option varchar(255);
    DECLARE v_is_replied tinyint(1);
    DECLARE v_level int;
    DECLARE v_is_shop tinyint(1);
    DECLARE v_like_count int;
    DECLARE v_liked tinyint(1);
    DECLARE v_created_at DATETIME;
    DECLARE v_comment_exists INT DEFAULT 0;
   
   
  	-- Bắt lỗi và rollback nếu có lỗi xảy ra
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
	    -- ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi trong quá trình CREATE';
    END;


    -- Lấy giá trị từ JSON

	SET v_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.id'));
	SET v_order_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.order_id'));
	SET v_item_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.item_id'));
	SET v_rating = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.rating'));
    SET	v_user_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.user_id'));
    SET v_shop_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.shop_id'));
    SET v_parent_cmt_id = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.parent_cmt_id'));
    SET v_comment = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.comment'));
    SET v_rating_star = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.rating_star'));
    SET v_status = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.status'));
    SET	v_author_username = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.author_username'));
    SET v_author_portrait = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.author_portrait'));
    SET v_images = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.images'));
    SET v_cover = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.cover'));
    SET v_videos = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.videos'));
    SET v_tier_variation = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.tier_variation'));
    SET	v_list_option = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.list_option'));
    SET v_is_replied = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.is_replied'));
    SET v_level = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.level'));
    SET v_is_shop = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.is_shop'));
    SET v_like_count = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.like_count'));
    SET v_liked = JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.liked'));
    SET v_created_at = IFNULL(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(json_obj, '$.created_at')), ''), NOW());
	
   
  	-- Kiểm tra xem order đã tồn tại chưa
    SELECT COUNT(*) INTO v_comment_exists 
    FROM defaultdb.comments c 
    WHERE c.id = v_id;

    IF v_comment_exists > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Comment đã tồn tại';
    END IF;

   
	
	INSERT IGNORE INTO defaultdb.comments (id, order_id, item_id, rating, 
    	user_id, shop_id, parent_cmt_id, comment, rating_star, status, 
    	author_username, author_portrait, images, cover, videos, tier_variation, 
    	list_option, is_replied, level, is_shop, like_count, liked, created_at 
	)  
    VALUES (v_id, v_order_id, v_item_id, v_rating, 
    	v_user_id, v_shop_id, v_parent_cmt_id, v_comment, v_rating_star, v_status, 
    	v_author_username, v_author_portrait, v_images, v_cover, v_videos, v_tier_variation, 
    	v_list_option, v_is_replied, v_level, v_is_shop, v_like_count, v_liked, v_created_at);

END