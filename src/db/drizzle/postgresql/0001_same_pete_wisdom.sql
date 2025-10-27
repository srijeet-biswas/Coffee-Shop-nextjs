ALTER TABLE "users" ADD COLUMN "hashedPassword" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "age";