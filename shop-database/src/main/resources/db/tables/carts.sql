-- defaultdb.Carts definition

CREATE TABLE defaultdb.carts (
  "id" bigint NOT NULL,
  "user_id" bigint DEFAULT NULL,
  "item_id" bigint DEFAULT NULL,
  "shop_id" bigint DEFAULT NULL,
  "amount" int DEFAULT NULL,
  "variation" json DEFAULT NULL,
  "metadata" json DEFAULT NULL,
  "is_active" tinyint(1) NOT NULL DEFAULT '0',
  "created_by" int DEFAULT NULL,
	"deleted_by" int DEFAULT NULL,
	"updated_by" int DEFAULT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  "deleted_at" timestamp NULL DEFAULT NULL,
  PRIMARY KEY ("id")
);