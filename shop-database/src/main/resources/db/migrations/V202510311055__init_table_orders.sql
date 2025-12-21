-- Write your SQL migration here
-- defaultdb.Orders definition
START TRANSACTION;

CREATE TABLE orders (
  "id" bigint NOT NULL,
  "user_id" bigint DEFAULT NULL,
  "final_total" int DEFAULT NULL,
  "user" json DEFAULT NULL,
  "ship_cost" int DEFAULT NULL,
  "type" int DEFAULT NULL,
  "state" varchar(255) DEFAULT NULL,
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