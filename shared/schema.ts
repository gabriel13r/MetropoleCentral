import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for GTA RP server players
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  steamId: text("steam_id"),
  avatar: text("avatar"),
  joinedAt: timestamp("joined_at").notNull(),
  lastLogin: timestamp("last_login"),
  role: text("role").default("player"), // player, admin, moderator
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  steamId: true,
  avatar: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Characters for role-play
export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  backstory: text("backstory"),
  job: text("job"),
  money: integer("money").default(5000),
  bank: integer("bank").default(1000),
  createdAt: timestamp("created_at").notNull(),
  lastPlayed: timestamp("last_played"),
  isActive: boolean("is_active").default(true),
});

export const insertCharacterSchema = createInsertSchema(characters).omit({
  id: true,
  createdAt: true,
});

export type InsertCharacter = z.infer<typeof insertCharacterSchema>;
export type Character = typeof characters.$inferSelect;

// Server updates/news/patch notes
export const serverUpdates = pgTable("server_updates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  type: text("type").notNull(), // update, news, event, maintenance
  thumbnail: text("thumbnail"),
  publishedAt: timestamp("published_at").notNull(),
  isImportant: boolean("is_important").default(false),
});

export const insertServerUpdateSchema = createInsertSchema(serverUpdates).omit({
  id: true,
});

export type InsertServerUpdate = z.infer<typeof insertServerUpdateSchema>;
export type ServerUpdate = typeof serverUpdates.$inferSelect;

// Application forms for joining the server or applying for staff
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // server, staff, whitelist
  content: text("content").notNull(),
  status: text("status").default("pending"), // pending, approved, rejected
  submittedAt: timestamp("submitted_at").notNull(),
  reviewedAt: timestamp("reviewed_at"),
  reviewerId: integer("reviewer_id"),
  reviewNotes: text("review_notes"),
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  submittedAt: true,
});

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;
