const { z } = require("zod");

// User schema
const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  department: z.string().nullable().optional(),
  level: z.string().nullable().optional(),
  skills: z.array(z.string()).nullable().optional(),
  interests: z.array(z.string()).nullable().optional(),
  academicBackground: z.object({
    courses: z.array(z.string()),
    projects: z.array(z.string()),
    achievements: z.array(z.string()),
  }).nullable().optional(),
});

// Assessment schema
const insertAssessmentSchema = z.object({
  userId: z.number(),
  type: z.string(),
  results: z.record(z.any()),
});

// Career Match schema
const insertCareerMatchSchema = z.object({
  userId: z.number(),
  title: z.string(),
  matchPercentage: z.number(),
  description: z.string(),
  requiredSkills: z.array(z.string()),
  salaryRange: z.string(),
  demandStatus: z.string(),
});

// Skill Gap schema
const insertSkillGapSchema = z.object({
  userId: z.number(),
  skill: z.string(),
  currentLevel: z.number(),
  targetCareer: z.string().nullable().optional(),
});

// Resource schema
const insertResourceSchema = z.object({
  type: z.string(),
  title: z.string(),
  link: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  skillId: z.number().nullable().optional(),
});

// Market Trend schema
const insertMarketTrendSchema = z.object({
  careerTitle: z.string(),
  month: z.string(),
  jobOpenings: z.number(),
  averageSalary: z.number(),
  topSkillsInDemand: z.array(z.string()),
  growthRate: z.number(),
});

module.exports = {
  insertUserSchema,
  insertAssessmentSchema,
  insertCareerMatchSchema,
  insertSkillGapSchema,
  insertResourceSchema,
  insertMarketTrendSchema
};