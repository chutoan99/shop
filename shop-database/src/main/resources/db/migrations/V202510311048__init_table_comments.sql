-- Write your SQL migration here
-- defaultdb.Comments definition
START TRANSACTION;
CREATE TABLE comments (
  "id" bigint NOT NULL,
  "parent_cmt_id" bigint DEFAULT NULL,
  "user_id" bigint DEFAULT NULL,
  "shop_id" bigint DEFAULT NULL,
  "order_id" bigint DEFAULT NULL,
  "item_id" bigint DEFAULT NULL,
  "level" int DEFAULT NULL,
  "is_shop" tinyint(1) DEFAULT NULL,
  "rating" int DEFAULT NULL,
  "comment" text DEFAULT NULL,
  "rating_star" int DEFAULT NULL,
  "status" int DEFAULT NULL,
  "author_username" varchar(255) DEFAULT NULL,
  "author_portrait" varchar(255) DEFAULT NULL,
  "images" text DEFAULT NULL,
  "cover" varchar(255) DEFAULT NULL,
  "videos" varchar(255) DEFAULT NULL,
  "tier_variation" varchar(255) DEFAULT NULL,
  "list_option" varchar(255) DEFAULT NULL,
  "is_replied" tinyint(1) DEFAULT NULL,
  "like_count" int DEFAULT NULL,
  "liked" tinyint(1) DEFAULT NULL,
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