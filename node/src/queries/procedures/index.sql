-- store sp_insert_topProducts
ALTER PROCEDURE sp_insert_topProducts
(
    @JSON NVARCHAR(MAX)
) AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO TopProducts (data_type, [count], [name], images, sort_type, best_price, display_text)
    SELECT 
        JSON_VALUE(value, '$.data_type') AS data_type,
        JSON_VALUE(value, '$.count') AS [count],
        JSON_VALUE(value, '$.name') AS name,
        JSON_VALUE(value, '$.images') AS images,
        JSON_VALUE(value, '$.sort_type') AS sort_type,
        JSON_VALUE(value, '$.best_price') AS best_price,
        JSON_VALUE(value, '$.display_text') AS display_text
    FROM 
        OPENJSON(@JSON);
END

GO
-- store sp_insert_batchLists
CREATE PROCEDURE sp_insert_batchLists
(
    @JSON NVARCHAR(MAX)
) AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO BatchLists (banner_image, title, [end], [start])
    SELECT 
        JSON_VALUE(value, '$.banner_image') AS banner_image,
        JSON_VALUE(value, '$.title') AS title,
        JSON_VALUE(value, '$.end') AS [end],
        JSON_VALUE(value, '$.start') AS [start]
    FROM 
        OPENJSON(@JSON);
END

GO
-- store sp_insert_notifications
CREATE OR ALTER PROCEDURE sp_insert_notifications(
    @json NVARCHAR(MAX)
) AS
BEGIN
	PRINT(@json);
    SET NOCOUNT ON;
    INSERT INTO Notifications (userid, seen, [image], title, content, [time])
    SELECT 
        JSON_VALUE(value, '$.userid') AS userid,
        JSON_VALUE(value, '$.seen') AS seen,
        JSON_VALUE(value, '$.image') AS [image],
        JSON_VALUE(value, '$.title') AS title,
        JSON_VALUE(value, '$.content') AS content,
        JSON_VALUE(value, '$.time') AS [time]
    FROM 
        OPENJSON(@json);
END

GO
-- store sp_insert_Banners
 CREATE OR ALTER PROCEDURE sp_insert_Banners(
    @json NVARCHAR(MAX)
) AS
BEGIN
	PRINT(@json);
    SET NOCOUNT ON;
    INSERT INTO Banners (image_url)
    SELECT 
        JSON_VALUE(value, '$.image_url') AS image_url
    FROM 
        OPENJSON(@json);
END

GO
-- store sp_insert_industries
CREATE OR ALTER PROCEDURE sp_insert_industries(
    @JSON NVARCHAR(MAX) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO Industries (id, parent_catid, [level], category_name, images)
        SELECT 
            JSON_VALUE(value, '$.id') AS id,
            JSON_VALUE(value, '$.parent_catid') AS parent_catid,
            JSON_VALUE(value, '$.level') AS [level],        
            JSON_VALUE(value, '$.category_name') AS category_name,        
            JSON_VALUE(value, '$.images') AS images       
        FROM 
            OPENJSON(@JSON)
        WHERE 
            JSON_VALUE(value, '$.id') IS NOT NULL
            AND NOT EXISTS (
                SELECT 1 
                FROM Industries 
                WHERE Industries.id = JSON_VALUE(value, '$.id')
            );

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        -- Bắt lỗi và trả về thông tin lỗi
        DECLARE @ErrorMessage NVARCHAR(4000), @ErrorSeverity INT, @ErrorState INT;
        SELECT 
            @ErrorMessage = ERROR_MESSAGE(), 
            @ErrorSeverity = ERROR_SEVERITY(), 
            @ErrorState = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END

 GO
-- store sp_insert_searchSuggestions
CREATE OR ALTER PROCEDURE sp_insert_searchSuggestions(
    @json NVARCHAR(MAX)
) AS
BEGIN
	PRINT(@json);
    SET NOCOUNT ON;
	INSERT INTO SearchSuggestions ([text], [count])
    SELECT 
        JSON_VALUE(value, '$.text') AS [text],
        JSON_VALUE(value, '$.count') AS [count]
    FROM 
        OPENJSON(@json);
END

-- store sp_insert_industries
CREATE OR ALTER PROCEDURE sp_insert_homeCategories(
    @JSON NVARCHAR(MAX) = NULL
) AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
	    SET NOCOUNT ON;
		INSERT INTO HomeCategories (id, parent_catid, name, display_name, [image], unselected_image, selected_image, [level])
	    SELECT 
	        JSON_VALUE(value, '$.id') AS id,
	        JSON_VALUE(value, '$.parent_catid') AS parent_catid,
	        JSON_VALUE(value, '$.name') AS name,
	        JSON_VALUE(value, '$.display_name') AS display_name,
	        JSON_VALUE(value, '$.image') AS image,
	        JSON_VALUE(value, '$.unselected_image') AS unselected_image,
	        JSON_VALUE(value, '$.selected_image') AS selected_image,
		    JSON_VALUE(value, '$.level') AS [level]
        FROM 
            OPENJSON(@JSON)
        WHERE 
            JSON_VALUE(value, '$.id') IS NOT NULL
            AND NOT EXISTS (
                SELECT 1 
                FROM HomeCategories 
                WHERE HomeCategories.id = JSON_VALUE(value, '$.id')
            );

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        -- Bắt lỗi và trả về thông tin lỗi
        DECLARE @ErrorMessage NVARCHAR(4000), @ErrorSeverity INT, @ErrorState INT;
        SELECT 
            @ErrorMessage = ERROR_MESSAGE(), 
            @ErrorSeverity = ERROR_SEVERITY(), 
            @ErrorState = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END

GO
-- store sp_insert_shopMalls
CREATE OR ALTER PROCEDURE sp_insert_shopMalls(
    @JSON NVARCHAR(MAX) = NULL
) AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
	    SET NOCOUNT ON;
		  INSERT INTO ShopMalls (id, url, [image], promo_text)
	    SELECT 
	        JSON_VALUE(value, '$.id') AS id,
	        JSON_VALUE(value, '$.url') AS url,
	        JSON_VALUE(value, '$.image') AS [image],
	        JSON_VALUE(value, '$.promo_text') AS promo_text
        FROM 
            OPENJSON(@JSON)
        WHERE 
            JSON_VALUE(value, '$.id') IS NOT NULL
            AND NOT EXISTS (
                SELECT 1 
                FROM ShopMalls 
                WHERE ShopMalls.id = JSON_VALUE(value, '$.id')
            );

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        -- Bắt lỗi và trả về thông tin lỗi
        DECLARE @ErrorMessage NVARCHAR(4000), @ErrorSeverity INT, @ErrorState INT;
        SELECT 
            @ErrorMessage = ERROR_MESSAGE(), 
            @ErrorSeverity = ERROR_SEVERITY(), 
            @ErrorState = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END

-- store sp_insert_shopMalls
-- store sp_insert_shopMalls
CREATE OR ALTER PROCEDURE sp_insert_flashSales(
    @JSON NVARCHAR(MAX) = NULL
) AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
	    SET NOCOUNT ON;
      INSERT INTO FlashSales (id, shopid, catid, name, [image], stock, historical_sold, price, price_before_discount, discount, shop_rating, liked, is_official_shop, is_service_by_shopee, show_free_shipping, start_time, end_time)
      SELECT 
          JSON_VALUE(value, '$.id') AS id,
          JSON_VALUE(value, '$.shopid') AS shopid,
          JSON_VALUE(value, '$.catid') AS catid,
          JSON_VALUE(value, '$.name') AS name,
          JSON_VALUE(value, '$.image') AS [image],
          JSON_VALUE(value, '$.stock') AS stock,
          JSON_VALUE(value, '$.historical_sold') AS historical_sold,
          JSON_VALUE(value, '$.price') AS price,
          JSON_VALUE(value, '$.price_before_discount') AS price_before_discount,
          JSON_VALUE(value, '$.discount') AS discount,
          JSON_VALUE(value, '$.shop_rating') AS shop_rating,	        
          JSON_VALUE(value, '$.liked') AS liked,
          JSON_VALUE(value, '$.is_official_shop') AS is_official_shop,
          JSON_VALUE(value, '$.is_service_by_shopee') AS is_service_by_shopee,
          JSON_VALUE(value, '$.show_free_shipping') AS show_free_shipping,
          JSON_VALUE(value, '$.start_time') AS start_time,
          JSON_VALUE(value, '$.end_time') AS end_time
        FROM 
            OPENJSON(@JSON)
        WHERE 
            JSON_VALUE(value, '$.id') IS NOT NULL
            AND NOT EXISTS (
                SELECT 1 
                FROM FlashSales 
                WHERE FlashSales.id = JSON_VALUE(value, '$.id')
            );

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        -- Bắt lỗi và trả về thông tin lỗi
        DECLARE @ErrorMessage NVARCHAR(4000), @ErrorSeverity INT, @ErrorState INT;
        SELECT 
            @ErrorMessage = ERROR_MESSAGE(), 
            @ErrorSeverity = ERROR_SEVERITY(), 
            @ErrorState = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END