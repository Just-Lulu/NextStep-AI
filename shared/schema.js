import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  department: text('department'),
  level: text('level'),
  skills: text('skills').array(),
  interests: text('interests').array(),
  academicBackground: z.object({
    courses: z.array(z.string()),
    projects: z.array(z.string()),
    achievements: z.array(z.string()),
  }).optional(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Assessments table
export const assessments = pgTable('assessments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  type: text('type').notNull(), // technical, soft, career
  completed: boolean('completed').notNull().default(false),
  results: text('results'), // JSON stringified assessment results
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Career Matches table
export const careerMatches = pgTable('career_matches', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  matchPercentage: integer('match_percentage').notNull(),
  description: text('description').notNull(),
  requiredSkills: text('required_skills').array(),
  salaryRange: text('salary_range').notNull(),
  demandStatus: text('demand_status').notNull(), // High demand, Growing, Stable, Declining
  createdAt: timestamp('created_at').defaultNow(),
});

// Skill Gaps table
export const skillGaps = pgTable('skill_gaps', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  skill: text('skill').notNull(),
  currentLevel: integer('current_level').notNull(),
  targetCareer: text('target_career'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Resources table
export const resources = pgTable('resources', {
  id: serial('id').primaryKey(),
  type: text('type').notNull(), // Course, Video, Tutorial, Book, Website
  title: text('title').notNull(),
  link: text('link'),
  description: text('description'),
  skillId: integer('skill_id'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Market Trends table
export const marketTrends = pgTable('market_trends', {
  id: serial('id').primaryKey(),
  careerTitle: text('career_title').notNull(),
  month: text('month').notNull(),
  year: integer('year').notNull(),
  demandScore: integer('demand_score').notNull(),
  salaryAverage: integer('salary_average').notNull(),
  openPositions: integer('open_positions').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Schemas for inserting data (omitting auto-generated fields)
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCareerMatchSchema = createInsertSchema(careerMatches).omit({
  id: true,
  createdAt: true,
});

export const insertSkillGapSchema = createInsertSchema(skillGaps).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  createdAt: true,
});

export const insertMarketTrendSchema = createInsertSchema(marketTrends).omit({
  id: true,
  createdAt: true,
});

// Types
export const InsertUser = z.infer(insertUserSchema);
export const InsertAssessment = z.infer(insertAssessmentSchema);
export const InsertCareerMatch = z.infer(insertCareerMatchSchema);
export const InsertSkillGap = z.infer(insertSkillGapSchema);
export const InsertResource = z.infer(insertResourceSchema);
export const InsertMarketTrend = z.infer(insertMarketTrendSchema);

export const User = users;
export const Assessment = assessments;
export const CareerMatch = careerMatches;
export const SkillGap = skillGaps;
export const Resource = resources;
export const MarketTrend = marketTrends;