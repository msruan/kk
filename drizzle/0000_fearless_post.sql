CREATE TYPE "public"."draw_status" AS ENUM('pending', 'done');--> statement-breakpoint
CREATE TABLE "groups" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "groups_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"celebrationLocal" varchar(255),
	"celebrationDate" timestamp,
	"drawStatus" "draw_status" DEFAULT 'pending' NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "participants" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "participants_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nick" varchar(50) NOT NULL,
	"email" varchar(255),
	"giftsList" varchar(500),
	"groupId" integer NOT NULL,
	"giftedId" integer,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "participants" ADD CONSTRAINT "participants_groupId_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participants" ADD CONSTRAINT "participants_giftedId_participants_id_fk" FOREIGN KEY ("giftedId") REFERENCES "public"."participants"("id") ON DELETE no action ON UPDATE no action;