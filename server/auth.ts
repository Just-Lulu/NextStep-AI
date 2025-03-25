import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';
import { z } from 'zod';

// Auth schemas
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

// Returns the authenticated user or undefined
export async function authenticateUser(username: string, password: string) {
  const user = await storage.getUserByUsername(username);
  
  if (!user) {
    return undefined;
  }
  
  // In a real application, we would hash passwords and use a secure comparison
  // For this demo, we're doing a direct comparison
  if (user.password !== password) {
    return undefined;
  }
  
  return user;
}

// Middleware to check if user is authenticated
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const userId = req.session?.userId;
  
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: Please log in to access this resource" });
  }
  
  next();
}

// Helper to get the current user from session
export async function getCurrentUser(req: Request) {
  const userId = req.session?.userId;
  
  if (!userId) {
    return undefined;
  }
  
  return storage.getUser(Number(userId));
}