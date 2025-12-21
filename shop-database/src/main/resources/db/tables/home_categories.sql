-- defaultdb.HomeCategories definition

CREATE TABLE defaultdb.home_categories (
  "id" bigint NOT NULL,
  "display_name" varchar(255) DEFAULT NULL,
  "parent_cat_id" int DEFAULT NULL,
  "name" varchar(255) DEFAULT NULL,
  "image" varchar(1000) DEFAULT NULL,
  "unselected_image" varchar(255) DEFAULT NULL,
  "selected_image" varchar(255) DEFAULT NULL,
  "level" int DEFAULT NULL,
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