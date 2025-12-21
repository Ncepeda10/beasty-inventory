ALTER TABLE "products" ADD COLUMN "sku_toteat" varchar(100);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "unidad_base" varchar(50);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "categoria" varchar(100);--> statement-breakpoint
ALTER TABLE "templates" ADD COLUMN "numero_plantilla" integer;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_sku_toteat_unique" UNIQUE("sku_toteat");--> statement-breakpoint
ALTER TABLE "templates" ADD CONSTRAINT "templates_numero_plantilla_unique" UNIQUE("numero_plantilla");