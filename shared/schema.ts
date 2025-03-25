import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  department: text("department"),
  level: text("level"),
  skills: json("skills").$type<string[]>(),
  interests: json("interests").$type<string[]>(),
  academicBackground: json("academic_background").$type<{
    courses: string[];
    projects: string[];
    achievements: string[];
  }>(),
  profileComplete: boolean("profile_complete").default(false),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(), // technical, soft, career
  description: text("description"),
  date: timestamp("date").notNull(),
  duration: integer("duration").notNull(), // in minutes
  status: text("status").notNull(), // scheduled, completed
});

export const careerMatches = pgTable("career_matches", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  matchPercentage: integer("match_percentage").notNull(),
  salarRange: text("salary_range"),
  description: text("description"),
  requiredSkills: json("required_skills").$type<string[]>(),
  demandStatus: text("demand_status"), // high, growing, stable
});

export const skillGaps = pgTable("skill_gaps", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  skill: text("skill").notNull(),
  currentLevel: integer("current_level").notNull(), // percentage
  targetCareer: text("target_career"),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // course, book, tutorial
  description: text("description"),
  link: text("link"),
  skillId: integer("skill_id"),
});

export const marketTrends = pgTable("market_trends", {
  id: serial("id").primaryKey(),
  careerTitle: text("career_title").notNull(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
  jobCount: integer("job_count").notNull(),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
});

export const insertCareerMatchSchema = createInsertSchema(careerMatches).omit({
  id: true,
});

export const insertSkillGapSchema = createInsertSchema(skillGaps).omit({
  id: true,
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
});

export const insertMarketTrendSchema = createInsertSchema(marketTrends).omit({
  id: true,
});

// Insert Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type InsertCareerMatch = z.infer<typeof insertCareerMatchSchema>;
export type InsertSkillGap = z.infer<typeof insertSkillGapSchema>;
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type InsertMarketTrend = z.infer<typeof insertMarketTrendSchema>;

// Select Types
export type User = typeof users.$inferSelect;
export type Assessment = typeof assessments.$inferSelect;
export type CareerMatch = typeof careerMatches.$inferSelect;
export type SkillGap = typeof skillGaps.$inferSelect;
export type Resource = typeof resources.$inferSelect;
export type MarketTrend = typeof marketTrends.$inferSelect;
