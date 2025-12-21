-- Write your SQL migration here
START TRANSACTION;
CREATE TABLE videos (
  "id" varchar(255) NOT NULL,
  "thumb_url" varchar(255) DEFAULT NULL,
  "duration" int DEFAULT NULL,
  "version" int DEFAULT NULL,
  "width" int DEFAULT NULL,
  "height" int DEFAULT NULL,
  "defn" varchar(255) DEFAULT NULL,
  "profile" varchar(255) DEFAULT NULL,
  "url" varchar(255) DEFAULT NULL,
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