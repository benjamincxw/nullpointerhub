import { sql } from "drizzle-orm";
import { boolean, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const messageDirectionEnum = pgEnum("message_direction", ["inbound", "outbound"]);
export const messageStatusEnum = pgEnum("message_status", ["sent", "failed"]);

export const threads = pgTable("threads", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  subject: text("subject").notNull(),
  participantEmail: text("participant_email").notNull(),
  lastMessageAt: timestamp("last_message_at", { withTimezone: true }).notNull().defaultNow(),
  unread: boolean("unread").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Attachment = {
  filename: string;
  contentType: string;
  size: number;
  url: string;
};

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  threadId: uuid("thread_id")
    .notNull()
    .references(() => threads.id, { onDelete: "cascade" }),
  resendEmailId: text("resend_email_id").unique(),
  messageIdHeader: text("message_id_header").unique(),
  inReplyToHeader: text("in_reply_to_header"),
  direction: messageDirectionEnum("direction").notNull(),
  fromAddress: text("from_address").notNull(),
  toAddress: text("to_address").notNull(),
  subject: text("subject").notNull(),
  textBody: text("text_body"),
  htmlBody: text("html_body"),
  snippet: text("snippet"),
  attachments: jsonb("attachments").$type<Attachment[]>().notNull().default([]),
  status: messageStatusEnum("status"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Thread = typeof threads.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type NewThread = typeof threads.$inferInsert;
export type NewMessage = typeof messages.$inferInsert;
