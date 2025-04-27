import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for Metropole
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  email: text("email"),
  steamId: text("steam_id"),
  discordId: text("discord_id"),
  hexId: text("hex_id"),
  avatar: text("avatar"),
  diamonds: integer("diamonds").default(0),
  isVip: boolean("is_vip").default(false),
  vipExpiry: timestamp("vip_expiry"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
  lastLogin: timestamp("last_login"),
  role: text("role").default("player"), // player, admin, moderator
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  email: true,
  steamId: true,
  discordId: true,
  hexId: true,
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
  createdAt: timestamp("created_at").notNull().defaultNow(),
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
  version: text("version"),
  thumbnail: text("thumbnail"),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  isImportant: boolean("is_important").default(false),
});

export const insertServerUpdateSchema = createInsertSchema(serverUpdates).omit({
  id: true,
});

export type InsertServerUpdate = z.infer<typeof insertServerUpdateSchema>;
export type ServerUpdate = typeof serverUpdates.$inferSelect;

// Allowlist for server access
export const allowlists = pgTable("allowlists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  status: text("status").default("pending"), // pending, approved, rejected
  isPriority: boolean("is_priority").default(false),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
  reviewerId: integer("reviewer_id"),
  reviewNotes: text("review_notes"),
});

export const insertAllowlistSchema = createInsertSchema(allowlists).omit({
  id: true,
  submittedAt: true,
});

export type InsertAllowlist = z.infer<typeof insertAllowlistSchema>;
export type Allowlist = typeof allowlists.$inferSelect;

// Diamond packages for purchases
export const diamondPackages = pgTable("diamond_packages", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
});

export const insertDiamondPackageSchema = createInsertSchema(diamondPackages).omit({
  id: true,
});

export type InsertDiamondPackage = z.infer<typeof insertDiamondPackageSchema>;
export type DiamondPackage = typeof diamondPackages.$inferSelect;

// Diamond transactions
export const diamondTransactions = pgTable("diamond_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  packageId: integer("package_id"),
  amount: integer("amount").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }),
  paymentIntent: text("payment_intent"),
  status: text("status").notNull(), // completed, pending, failed
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertDiamondTransactionSchema = createInsertSchema(diamondTransactions).omit({
  id: true,
  createdAt: true,
});

export type InsertDiamondTransaction = z.infer<typeof insertDiamondTransactionSchema>;
export type DiamondTransaction = typeof diamondTransactions.$inferSelect;

// Support tickets
export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  status: text("status").default("open"), // open, in-progress, closed
  createdAt: timestamp("created_at").notNull().defaultNow(),
  closedAt: timestamp("closed_at"),
  assignedTo: integer("assigned_to"),
});

export const insertTicketSchema = createInsertSchema(tickets).omit({
  id: true,
  createdAt: true,
});

export type InsertTicket = z.infer<typeof insertTicketSchema>;
export type Ticket = typeof tickets.$inferSelect;
