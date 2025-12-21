-- defaultdb.BatchLists definition

CREATE TABLE defaultdb.batch_lists (
  "id" int NOT NULL AUTO_INCREMENT,
  "banner_image" varchar(255) DEFAULT NULL,
  "title" varchar(255) DEFAULT NULL,
  "end" varchar(255) DEFAULT NULL,
  "start" varchar(255) DEFAULT NULL,
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