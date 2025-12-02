import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const permissionEnum = pgEnum("permission", ["view", "edit"]);

export const codeSnippets = pgTable("code_snippets", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  code: text("code").notNull(),
  language: text("language").notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }), // nullable - anonymous users can create
  shareUrl: text("share_url").unique().notNull(),
  isPublic: boolean("is_public").default(true).notNull(), // default to public for anonymous sharing
  password: text("password"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const codeCollaborators = pgTable("code_collaborators", {
  id: text("id").primaryKey(),
  snippetId: text("snippet_id")
    .references(() => codeSnippets.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  permission: permissionEnum("permission").default("view").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const codeVersions = pgTable("code_versions", {
  id: text("id").primaryKey(),
  snippetId: text("snippet_id")
    .references(() => codeSnippets.id, { onDelete: "cascade" })
    .notNull(),
  code: text("code").notNull(),
  version: integer("version").notNull(),
  createdBy: text("created_by").references(() => user.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
