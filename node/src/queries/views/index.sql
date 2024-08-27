CREATE OR ALTER VIEW dbo.getNotifications AS
    SELECT 
        no.id, 
        no.image, 
        no.title, 
        no.content, 
        no.userid, 
        no.seen, 
        no.time, 
        no.createdAt, 
        no.updatedAt
    FROM 
        Notifications no;
GO

CREATE OR ALTER VIEW dbo.getBanners AS
    SELECT 
        ba.id, 
        ba.image_url, 
        ba.createdAt, 
        ba.updatedAt
    FROM 
        Banners ba;
GO
