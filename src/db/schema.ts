import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  age: int().notNull(),
  email: text().notNull().unique(),
});
