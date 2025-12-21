import { pgTable, serial, text, integer, timestamp, decimal, varchar, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Units table (unidades de medida)
export const units = pgTable('units', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  abbreviation: varchar('abbreviation', { length: 10 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Products table (productos)
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  skuToteat: varchar('sku_toteat', { length: 100 }).unique(),
  name: text('name').notNull(),
  description: text('description'),
  unidadBase: varchar('unidad_base', { length: 50 }),
  categoria: varchar('categoria', { length: 100 }),
  defaultUnitId: integer('default_unit_id').references(() => units.id),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Templates table (plantillas de inventario)
export const templates = pgTable('templates', {
  id: serial('id').primaryKey(),
  numeroPlantilla: integer('numero_plantilla').unique(),
  name: text('name').notNull().unique(),
  description: text('description'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Template Items table (productos en una plantilla con orden)
export const templateItems = pgTable('template_items', {
  id: serial('id').primaryKey(),
  templateId: integer('template_id').references(() => templates.id, { onDelete: 'cascade' }).notNull(),
  productId: integer('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Inventory Sessions table (sesiones de inventario)
export const inventorySessions = pgTable('inventory_sessions', {
  id: serial('id').primaryKey(),
  templateId: integer('template_id').references(() => templates.id).notNull(),
  name: text('name').notNull(), // e.g., "Diario Cocina - 2025-01-15"
  status: varchar('status', { length: 20 }).default('in_progress').notNull(), // in_progress, completed, cancelled
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Inventory Items table (ítems de una sesión de inventario)
export const inventoryItems = pgTable('inventory_items', {
  id: serial('id').primaryKey(),
  sessionId: integer('session_id').references(() => inventorySessions.id, { onDelete: 'cascade' }).notNull(),
  productId: integer('product_id').references(() => products.id).notNull(),
  quantity: decimal('quantity', { precision: 10, scale: 3 }).notNull(),
  unitId: integer('unit_id').references(() => units.id).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const productsRelations = relations(products, ({ one, many }) => ({
  defaultUnit: one(units, {
    fields: [products.defaultUnitId],
    references: [units.id],
  }),
  templateItems: many(templateItems),
  inventoryItems: many(inventoryItems),
}));

export const unitsRelations = relations(units, ({ many }) => ({
  products: many(products),
  inventoryItems: many(inventoryItems),
}));

export const templatesRelations = relations(templates, ({ many }) => ({
  templateItems: many(templateItems),
  inventorySessions: many(inventorySessions),
}));

export const templateItemsRelations = relations(templateItems, ({ one }) => ({
  template: one(templates, {
    fields: [templateItems.templateId],
    references: [templates.id],
  }),
  product: one(products, {
    fields: [templateItems.productId],
    references: [products.id],
  }),
}));

export const inventorySessionsRelations = relations(inventorySessions, ({ one, many }) => ({
  template: one(templates, {
    fields: [inventorySessions.templateId],
    references: [templates.id],
  }),
  inventoryItems: many(inventoryItems),
}));

export const inventoryItemsRelations = relations(inventoryItems, ({ one }) => ({
  session: one(inventorySessions, {
    fields: [inventoryItems.sessionId],
    references: [inventorySessions.id],
  }),
  product: one(products, {
    fields: [inventoryItems.productId],
    references: [products.id],
  }),
  unit: one(units, {
    fields: [inventoryItems.unitId],
    references: [units.id],
  }),
}));

// Types
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Unit = typeof units.$inferSelect;
export type NewUnit = typeof units.$inferInsert;

export type Template = typeof templates.$inferSelect;
export type NewTemplate = typeof templates.$inferInsert;

export type TemplateItem = typeof templateItems.$inferSelect;
export type NewTemplateItem = typeof templateItems.$inferInsert;

export type InventorySession = typeof inventorySessions.$inferSelect;
export type NewInventorySession = typeof inventorySessions.$inferInsert;

export type InventoryItem = typeof inventoryItems.$inferSelect;
export type NewInventoryItem = typeof inventoryItems.$inferInsert;

