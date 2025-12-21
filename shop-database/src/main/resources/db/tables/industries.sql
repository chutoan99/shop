-- defaultdb.Industries definition

CREATE TABLE defaultdb.industries (
  "id" int NOT NULL,
  "parent_cat_id" int DEFAULT NULL,
  "level" int DEFAULT NULL,
  "category_name" varchar(255) DEFAULT NULL,
  "images" varchar(255) DEFAULT NULL,
  "is_active" tinyint(1) NOT NULL DEFAULT '0',
  "created_by" int DEFAULT NULL,
	"deleted_by" int DEFAULT NULL,
	"updated_by" int DEFAULT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  "deleted_at" timestamp NULL DEFAULT NULL,
  PRIMARY KEY ("id")
);