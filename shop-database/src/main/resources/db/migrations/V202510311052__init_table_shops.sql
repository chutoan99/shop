-- Write your SQL migration here
-- defaultdb.Shops definition
START TRANSACTION;

CREATE TABLE shops (
  "id" bigint NOT NULL,
  "user_id" bigint DEFAULT NULL,
  "item_count" int DEFAULT NULL,
  "name" varchar(255) DEFAULT NULL,
  "cover" varchar(255) DEFAULT NULL,
  "follower_count" int DEFAULT NULL,
  "rating_star" int DEFAULT NULL,
  "rating_bad" int DEFAULT NULL,
  "rating_good" int DEFAULT NULL,
  "rating_normal" int DEFAULT NULL,
  "status" int DEFAULT NULL,
  "shop_location" varchar(255) DEFAULT NULL,
  "username" varchar(255) DEFAULT NULL,
  "portrait" varchar(255) DEFAULT NULL,
  "response_rate" int DEFAULT NULL,
  "country" varchar(255) DEFAULT NULL,
  "response_time" int DEFAULT NULL,
  "description" TEXT DEFAULT NULL,
  "followed" tinyint(1) DEFAULT NULL,
  "last_active_time" timestamp NULL DEFAULT NULL,
  "is_official_shop" tinyint(1) DEFAULT NULL,
  "is_active" tinyint(1) NOT NULL DEFAULT '0',
  "metadata" json DEFAULT NULL,
  "created_by" int DEFAULT NULL,
	"deleted_by" int DEFAULT NULL,
	"updated_by" int DEFAULT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  "deleted_at" timestamp NULL DEFAULT NULL,
  PRIMARY KEY ("id")
);
COMMIT