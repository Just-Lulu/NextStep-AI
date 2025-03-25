const { storage } = require('./storage');
const { z } = require('zod');

// Auth schemas
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Returns the authenticated user or undefined
async function authenticateUser(username, password) {
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
function requireAuth(req, res, next) {
  const userId = req.session?.userId;
  
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: Please log in to access this resource" });
  }
  
  next();
}

// Helper to get the current user from session
async function getCurrentUser(req) {
  const userId = req.session?.userId;
  
  if (!userId) {
    return undefined;
  }
  
  return storage.getUser(Number(userId));
}

module.exports = {
  loginSchema,
  authenticateUser,
  requireAuth,
  getCurrentUser
};