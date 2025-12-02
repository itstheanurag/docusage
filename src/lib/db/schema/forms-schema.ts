import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  pgEnum,
  decimal,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const fieldTypeEnum = pgEnum("field_type", [
  "text",
  "textarea",
  "email",
  "number",
  "radio",
  "checkbox",
  "dropdown",
  "date",
  "time",
  "file",
  "rating",
  "signature",
]);

export const forms = pgTable("forms", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  shareUrl: text("share_url").unique().notNull(),
  isPublic: boolean("is_public").default(false).notNull(),
  isAcceptingResponses: boolean("is_accepting_responses")
    .default(true)
    .notNull(),
  password: text("password"),
  maxResponses: integer("max_responses"),
  closesAt: timestamp("closes_at"),
  logoUrl: text("logo_url"),
  themeSettings: jsonb("theme_settings"),
  successMessage: text("success_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const formFields = pgTable("form_fields", {
  id: text("id").primaryKey(),
  formId: text("form_id")
    .references(() => forms.id, { onDelete: "cascade" })
    .notNull(),
  fieldType: fieldTypeEnum("field_type").notNull(),
  label: text("label").notNull(),
  placeholder: text("placeholder"),
  required: boolean("required").default(false).notNull(),
  validationRules: jsonb("validation_rules"),
  options: jsonb("options"),
  conditionalLogic: jsonb("conditional_logic"),
  order: integer("order").notNull(),
  step: integer("step").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const formResponses = pgTable("form_responses", {
  id: text("id").primaryKey(),
  formId: text("form_id")
    .references(() => forms.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }), // optional - track if logged-in user fills form
  email: text("email").notNull(), // required - respondent's email
  responseData: jsonb("response_data").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const formAnalytics = pgTable("form_analytics", {
  id: text("id").primaryKey(),
  formId: text("form_id")
    .references(() => forms.id, { onDelete: "cascade" })
    .notNull(),
  totalViews: integer("total_views").default(0).notNull(),
  totalSubmissions: integer("total_submissions").default(0).notNull(),
  completionRate: decimal("completion_rate").default("0").notNull(),
  averageTime: integer("average_time").default(0).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});
