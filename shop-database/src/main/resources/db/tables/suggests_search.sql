-- defaultdb.SearchSuggests definition

CREATE TABLE defaultdb.suggests_search (
  "id" int NOT NULL AUTO_INCREMENT,
  "text" varchar(255) DEFAULT NULL,
  "count" int DEFAULT NULL,
  "is_active" tinyint(1) NOT NULL DEFAULT '0',
  "metadata" json DEFAULT NULL,
  "created_by" int DEFAULT NULL,
	"deleted_by" int DEFAULT NULL,
	"updated_by" int DEFAULT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  "deleted_at" timestamp NULL DEFAULT NULL,
  PRIMARY KEY ("id")
)