import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

export const userSystemEnum = pgEnum("user_system_enum", ["system", "user"]);

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  pdfName: text("pdf_name").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  createAt: timestamp("created_at").notNull().defaultNow(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  fileKey: text("file_key").notNull()
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatsId: integer("chat_id")
    .references(() => chats.id)
    .notNull(),
  content: text("content").notNull(),
  createAt: timestamp("created_at").notNull().defaultNow(),
  role: userSystemEnum("role").notNull()
});
