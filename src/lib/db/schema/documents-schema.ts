import { pgTable, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const documents = pgTable("documents", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  isTemplate: boolean("is_template").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const templateVariables = pgTable("template_variables", {
  id: text("id").primaryKey(),
  documentId: text("document_id")
    .references(() => documents.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  label: text("label").notNull(),
  type: text("type").default("text").notNull(), // text, number, date
  defaultValue: text("default_value"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const documentDataSets = pgTable("document_data_sets", {
  id: text("id").primaryKey(),
  documentId: text("document_id")
    .references(() => documents.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(), // e.g., "User A"
  data: jsonb("data").notNull(), // map of variable names to values
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
