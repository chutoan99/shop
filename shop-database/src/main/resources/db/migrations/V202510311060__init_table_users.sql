-- Write your SQL migration here
START TRANSACTION;
CREATE TABLE users (
  "id" bigint NOT NULL,
  "shop_id" bigint DEFAULT NULL,
  "username" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "sex" int DEFAULT NULL,
  "role" varchar(255) DEFAULT NULL,
  "password" varchar(255) NOT NULL,
  "name" varchar(255) DEFAULT NULL,
  "birthday" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "phone" int DEFAULT NULL,
  "avatar" varchar(255) DEFAULT NULL,
  "filename" varchar(255) DEFAULT NULL,
  "not_new_user" tinyint(1) DEFAULT NULL,
  "refresh_token" varchar(255) DEFAULT NULL,
  "password_reset_token" varchar(255) DEFAULT NULL,
  "password_reset_expires" varchar(255) DEFAULT NULL,
  "password_changed_at" varchar(255) DEFAULT NULL,
  "is_verified" tinyint(1) NOT NULL DEFAULT '1',
  "is_active" tinyint(1) NOT NULL DEFAULT '0',
  "last_login" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "metadata" json DEFAULT NULL,
  "address_obj" json DEFAULT NULL,
  "created_by" int DEFAULT NULL,
	"deleted_by" int DEFAULT NULL,
	"updated_by" int DEFAULT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  "deleted_at" timestamp NULL DEFAULT NULL,
  PRIMARY KEY ("id")
);
COMMIT