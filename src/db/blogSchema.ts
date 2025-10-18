import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core'

export const blogTable = pgTable('blog', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 300 }).notNull(),
  blog: text('blog').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
