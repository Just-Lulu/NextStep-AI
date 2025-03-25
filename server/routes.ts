import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateCareerRecommendations, analyzeSkillGap } from "./openai";
import { insertUserSchema, insertAssessmentSchema } from "@shared/schema";
import { z } from "zod";
import { requireAuth, authenticateUser, loginSchema, getCurrentUser } from "./auth";
import "./types"; // Import to extend Express types

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes

  // Authentication routes
  app.post("/api/login", async (req: Request, res: Response) => {
    try {
      const credentials = loginSchema.parse(req.body);
      const user = await authenticateUser(credentials.username, credentials.password);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Set user ID in session
      req.session.userId = user.id;
      
      // Return user without the password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Login failed" });
      }
    }
  });
  
  app.post("/api/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      
      res.json({ message: "Logged out successfully" });
    });
  });
  
  app.get("/api/me", async (req: Request, res: Response) => {
    try {
      const user = await getCurrentUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      // Return user without the password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch current user" });
    }
  });
  
  // User routes
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });
  
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  
  app.put("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const userData = req.body;
      
      const updatedUser = await storage.updateUser(userId, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });
  
  // Assessment routes
  app.get("/api/users/:userId/assessments", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const assessments = await storage.getAssessmentsByUserId(userId);
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });
  
  app.post("/api/assessments", async (req: Request, res: Response) => {
    try {
      const assessmentData = insertAssessmentSchema.parse(req.body);
      const assessment = await storage.createAssessment(assessmentData);
      res.status(201).json(assessment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create assessment" });
      }
    }
  });
  
  // Career Matches routes
  app.get("/api/users/:userId/career-matches", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const careerMatches = await storage.getCareerMatchesByUserId(userId);
      res.json(careerMatches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch career matches" });
    }
  });
  
  // Skill Gap routes
  app.get("/api/users/:userId/skill-gaps", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const skillGaps = await storage.getSkillGapsByUserId(userId);
      res.json(skillGaps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skill gaps" });
    }
  });
  
  // Resources routes
  app.get("/api/resources", async (_req: Request, res: Response) => {
    try {
      const resources = await storage.getAllResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });
  
  app.get("/api/skills/:skillId/resources", async (req: Request, res: Response) => {
    try {
      const skillId = parseInt(req.params.skillId);
      const resources = await storage.getResourcesBySkillId(skillId);
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });
  
  // Market Trends routes
  app.get("/api/market-trends", async (_req: Request, res: Response) => {
    try {
      const marketTrends = await storage.getMarketTrends();
      res.json(marketTrends);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market trends" });
    }
  });
  
  app.get("/api/market-trends/:career", async (req: Request, res: Response) => {
    try {
      const career = req.params.career;
      const marketTrends = await storage.getMarketTrendsByCareer(career);
      res.json(marketTrends);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market trends" });
    }
  });
  
  // AI-powered routes
  app.post("/api/ai/career-recommendations", async (req: Request, res: Response) => {
    try {
      const { skills, interests, academicBackground } = req.body;
      
      if (!skills || !interests || !academicBackground) {
        return res.status(400).json({ message: "Missing required information" });
      }
      
      const recommendations = await generateCareerRecommendations(
        skills,
        interests,
        academicBackground
      );
      
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate career recommendations" });
    }
  });
  
  app.post("/api/ai/skill-gap", async (req: Request, res: Response) => {
    try {
      const { currentSkills, targetCareer } = req.body;
      
      if (!currentSkills || !targetCareer) {
        return res.status(400).json({ message: "Missing required information" });
      }
      
      const skillGapAnalysis = await analyzeSkillGap(
        currentSkills,
        targetCareer
      );
      
      res.json(skillGapAnalysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to analyze skill gap" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
