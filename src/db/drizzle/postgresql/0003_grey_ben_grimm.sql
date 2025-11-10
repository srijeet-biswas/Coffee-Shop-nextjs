CREATE TYPE "public"."role" AS ENUM('user', 'admin', 'merchant');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'user' NOT NULL;