import { relations } from 'drizzle-orm';
import {
  boolean,
  date,
  pgTable,
  serial,
  text,
  varchar,
  jsonb,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';
import { sheetsToCategories } from '../categories/schema';
import { users } from '../users/schema';

export const sheets = pgTable('sheets', {
  // Primary key for the sheets table
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  url: text('url').notNull(),
  audio: jsonb('audio').$type<{
    vocal?: {
      url: string;
      description: string;
    };
    instrumental?: {
      url: string;
      description: string;
    };
  }>(),
  composer: text('composer'),
  lyricist: text('lyricist'),
  date: date('date'),
  location: text('location'),
  description: text('description'),
  key: jsonb('key')
    .$type<
      Array<{
        tonic: string;
        mode: string;
        color: string;
      }>
    >()
    .default([]),
  category: varchar('category', { length: 50 }),
  genre: varchar('genre', { length: 50 }),
  lyrics: jsonb('lyrics').$type<{
    de?: string[];
    en?: string[];
    es?: string[];
    fr?: string[];
    it?: string[];
    bg?: string[];
  }>(),
  published: boolean('published').default(false),
  timestamp: timestamp('timestamp').defaultNow(),
  userId: integer('user_id').references(() => users.id),
});

export const sheetRelations = relations(sheets, ({ one, many }) => ({
  user: one(users, {
    fields: [sheets.userId],
    references: [users.id],
  }),
  sheetsToCategories: many(sheetsToCategories),
}));
