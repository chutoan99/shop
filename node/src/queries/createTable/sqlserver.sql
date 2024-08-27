IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Banners' AND xtype='U')
BEGIN
    CREATE TABLE Banners (
      id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
      image_url NVARCHAR(255),
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='BatchLists' AND xtype='U')
BEGIN
    CREATE TABLE BatchLists (
      id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
      banner_image NVARCHAR(255),
      title NVARCHAR(255),
      [end] NVARCHAR(255),
      [start] NVARCHAR(255),
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );

END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Carts' AND xtype='U')
BEGIN
    CREATE TABLE Carts (
      id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
      userid BIGINT,
      itemid BIGINT,
      shopid BIGINT,
      amount INTEGER,
      tierVariation NVARCHAR(255),
      item_option NVARCHAR(255),
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Comments' AND xtype='U')
BEGIN
    CREATE TABLE Comments (
      id BIGINT PRIMARY KEY NOT NULL,
      parent_cmtid BIGINT,
      userid BIGINT,
      shopid BIGINT,
      orderid BIGINT,
      itemid BIGINT,
      [level] INT,
      is_shop BIT,
      rating INT,
      comment NVARCHAR(1000),
      rating_star INT,
      [status] INT,
      author_username NVARCHAR(255),
      author_portrait NVARCHAR(255),
      images NVARCHAR(255),
      cover NVARCHAR(255),
      videos NVARCHAR(255),
      tierVariation NVARCHAR(255),
      list_option NVARCHAR(255),
      is_replied BIT,
      like_count INT,
      liked BIT,
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DeepDiscountSkins' AND xtype='U')
BEGIN
    CREATE TABLE DeepDiscountSkins (
      id BIGINT PRIMARY KEY NOT NULL,
      promotion_price NVARCHAR(255),
      hidden_promotion_price NVARCHAR(255),
      [text] NVARCHAR(255),
      start_time NVARCHAR(255),
      end_time NVARCHAR(255),
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='FlashSales' AND xtype='U')
BEGIN
    CREATE TABLE FlashSales (
      id BIGINT PRIMARY KEY NOT NULL,
      shopid BIGINT,
      catid BIGINT,
      [name] NVARCHAR(1000),
      [image] NVARCHAR(1000),
      price INTEGER,
      price_before_discount INTEGER,
      stock INTEGER,
      historical_sold INTEGER,
      discount NVARCHAR(255),
      shop_rating INTEGER,
      [filename] NVARCHAR(255),
      liked BIT,
      is_official_shop BIT,
      is_service_by_shopee BIT,
      show_free_shipping BIT,
      start_time DATETIME DEFAULT GETDATE(),
      end_time DATETIME DEFAULT GETDATE(),
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='HomeCategories' AND xtype='U')
BEGIN
    CREATE TABLE HomeCategories (
      id BIGINT PRIMARY KEY NOT NULL,
      display_name NVARCHAR(255),
      parent_catid INTEGER,
      [name] NVARCHAR(255),
      [image] NVARCHAR(1000),
      unselected_image NVARCHAR(255),
      selected_image NVARCHAR(255),
      [level] INTEGER,
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Industries' AND xtype='U')
BEGIN
    CREATE TABLE Industries (
      id INTEGER PRIMARY KEY NOT NULL,
      parent_catid INTEGER,
      [level] INTEGER,
      category_name NVARCHAR(255),
      images NVARCHAR(255),
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Likes' AND xtype='U')
BEGIN
    CREATE TABLE Likes (
      id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
      userid BIGINT,
      itemid BIGINT,
      shopid BIGINT,
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Notifications' AND xtype='U')
BEGIN
    CREATE TABLE Notifications (
      id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
      [image] NVARCHAR(255),
      title NVARCHAR(255),
      content NVARCHAR(255),
      userid BIGINT,
      seen BIT,
      [time] NVARCHAR(255),
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Orders' AND xtype='U')
BEGIN
    CREATE TABLE Orders (
      id BIGINT PRIMARY KEY NOT NULL,
      userid BIGINT,
      shopid BIGINT,
      shop_name NVARCHAR(255),
      [type] INTEGER,
      [state] NVARCHAR(255),
      total_num_items INTEGER,
      note NVARCHAR(255),
      amount NVARCHAR(255),
      item_option NVARCHAR(255),
      item_groups_id NVARCHAR(255),
      tierVariation NVARCHAR(255),
      final_total INTEGER,
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Posts' AND xtype='U')
BEGIN
    CREATE TABLE Posts (
      id BIGINT PRIMARY KEY NOT NULL,
      shopid BIGINT,
      catid INT,
      videoid NVARCHAR(255),
      promotionid BIGINT,
      discountid BIGINT,
      currency NVARCHAR(255),
      stock INT,
      [status] INT,
      sold INT,
      liked_count INT,
      cmt_count INT,
      discount NVARCHAR(255),
      raw_discount INT,
      size_chart NVARCHAR(255),
      shop_name NVARCHAR(255),
      [description] NVARCHAR(255),
      transparent_background_image NVARCHAR(255),
      images NVARCHAR(1000),
      view_count INT,
      [name] NVARCHAR(1000),
      [image] NVARCHAR(1000),
      price INT,
      price_min INT,
      price_max INT,
      historical_sold INT,
      price_before_discount INT,
      price_min_before_discount INT,
      price_max_before_discount INT,
      shop_rating INT,
      [filename] NVARCHAR(255),
      liked BIT,
      is_official_shop BIT,
      is_service_by_shop BIT,
      show_free_shipping BIT,
      name_attributes TEXT,
      value_attributes NVARCHAR(1000),
      name_tierVariations NVARCHAR(255),
      option_tierVariations NVARCHAR(1000),
      images_tierVariations NVARCHAR(1000),
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Rooms' AND xtype='U')
BEGIN
    CREATE TABLE Rooms (
      id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
      userid BIGINT,
      shopid BIGINT,
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SearchHistories' AND xtype='U')
BEGIN
    CREATE TABLE SearchHistories (
      id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
      userid BIGINT,
      [text] NVARCHAR(255),
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SearchSuggestions' AND xtype='U')
BEGIN
    CREATE TABLE SearchSuggestions (
      id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
      [text] NVARCHAR(255),
      count INTEGER,
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ShopMalls' AND xtype='U')
BEGIN
    CREATE TABLE ShopMalls (
      id BIGINT PRIMARY KEY NOT NULL,
      [url] NVARCHAR(255),
      [image] NVARCHAR(255),
      promo_text NVARCHAR(255),
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Shops' AND xtype='U')
BEGIN
    CREATE TABLE Shops (
      id BIGINT PRIMARY KEY NOT NULL,
      userid BIGINT,
      item_count INT,
      [name] NVARCHAR(255),
      cover NVARCHAR(255),
      follower_count INT,
      rating_star INT,
      rating_bad INT,
      rating_good INT,
      rating_normal INT,
      [status] INT,
      shop_location NVARCHAR(255),
      username NVARCHAR(255),
      portrait NVARCHAR(255),
      response_rate INT,
      country NVARCHAR(255),
      response_time INT,
      [description] NVARCHAR(255),
      followed BIT,
      last_active_time TIMESTAMP,
      is_official_shop BIT,
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TopProducts' AND xtype='U')
BEGIN
    CREATE TABLE TopProducts (
      id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
      data_type NVARCHAR(255),
      [count] INT,
      [name] NVARCHAR(255),
      images NVARCHAR(255),
      sort_type INT,
      best_price INT,
      display_text NVARCHAR(255),
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
BEGIN
    CREATE TABLE Users (
      id BIGINT PRIMARY KEY,
      shopid BIGINT,
      username NVARCHAR(255) NOT NULL,
      email NVARCHAR(255) NOT NULL,
      sex INT,
      [role] NVARCHAR(255),
      [password] NVARCHAR(255) NOT NULL,
      [name] NVARCHAR(255),
      [address] NVARCHAR(255),
      birthday DATETIME DEFAULT GETDATE(),
      phone INT,
      avatar NVARCHAR(255),
      [filename] NVARCHAR(255),
      not_new_user BIT,
      refreshToken NVARCHAR(255),
      passwordResetToken NVARCHAR(255),
      passwordResetExpires NVARCHAR(255),
      passwordChangedAt NVARCHAR(255),
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    )
END

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Videos' AND xtype='U')
BEGIN
    CREATE TABLE Videos (
      id NVARCHAR(255) PRIMARY KEY NOT NULL,
      thumb_url NVARCHAR(255),
      duration INT,
      [version] INT,
      width INT,
      height INT,
      defn NVARCHAR(255),
      [profile] NVARCHAR(255),
      [url] NVARCHAR(255),
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    )
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='VoucherProducts' AND xtype='U')
BEGIN
    CREATE TABLE VoucherProducts (
      id BIGINT PRIMARY KEY NOT NULL,
      voucher_code NVARCHAR(255),
      label NVARCHAR(255),
      is_active BIT DEFAULT 1,
      createdAt DATETIME DEFAULT GETDATE(),
      updatedAt DATETIME DEFAULT GETDATE(),
      deleteAt DATETIME
    )
END;