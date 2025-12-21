-- defaultdb.ShopMalls definition

CREATE TABLE defaultdb.shop_malls (
  "id" bigint NOT NULL,
  "url" varchar(255) DEFAULT NULL,
  "image" varchar(255) DEFAULT NULL,
  "promo_text" varchar(255) DEFAULT NULL,
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