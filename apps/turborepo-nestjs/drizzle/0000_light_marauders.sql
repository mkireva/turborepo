CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sheets_to_categories" (
	"sheet_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "sheets_to_categories_sheet_id_category_id_pk" PRIMARY KEY("sheet_id","category_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sheets" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"audio" jsonb,
	"composer" text,
	"lyricist" text,
	"date" date,
	"location" text,
	"description" text,
	"key" jsonb DEFAULT '[]'::jsonb,
	"category" varchar(50),
	"genre" varchar(50),
	"lyrics" jsonb,
	"published" boolean DEFAULT false,
	"timestamp" timestamp DEFAULT now(),
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"age" integer,
	"biography" text,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"password" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sheets_to_categories" ADD CONSTRAINT "sheets_to_categories_sheet_id_sheets_id_fk" FOREIGN KEY ("sheet_id") REFERENCES "public"."sheets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sheets_to_categories" ADD CONSTRAINT "sheets_to_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sheets" ADD CONSTRAINT "sheets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
