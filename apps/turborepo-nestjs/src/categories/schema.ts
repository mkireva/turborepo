import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
} from 'drizzle-orm/pg-core';
import { sheets } from '../sheets/schema';
import { relations } from 'drizzle-orm';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  sheetsToCategories: many(sheetsToCategories),
}));

export const sheetsToCategories = pgTable(
  'sheets_to_categories',
  {
    sheetId: integer('sheet_id')
      .notNull()
      .references(() => sheets.id),
    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.sheetId, t.categoryId] }),
  }),
);

export const sheetsToCategoriesRelations = relations(
  sheetsToCategories,
  ({ one }) => ({
    sheet: one(sheets, {
      fields: [sheetsToCategories.sheetId],
      references: [sheets.id],
    }),
    category: one(categories, {
      fields: [sheetsToCategories.categoryId],
      references: [categories.id],
    }),
  }),
);