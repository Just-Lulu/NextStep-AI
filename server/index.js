require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { z } = require('zod');
const { log, setupVite, serveStatic } = require('./vite');
const { registerRoutes } = require('./routes');

// Check for required environment variables
if (!process.env.SESSION_SECRET) {
  process.env.SESSION_SECRET = 'local-dev-secret'; // For local development only
  log('SESSION_SECRET not set, using a default value for local development');
}

// Check for OpenAI API Key
if (!process.env.OPENAI_API_KEY) {
  log('WARNING: OPENAI_API_KEY environment variable is not set. AI features will not work.');
}

async function start() {
  // Create Express server
  const app = express();
  
  // Parse JSON requests
  app.use(express.json());
  
  // Set up session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      },
    })
  );
  
  // Register API routes and get the server
  const server = await registerRoutes(app);
  
  // Serve static files
  serveStatic(app);
  
  // Setup Vite middleware for development
  await setupVite(app, server);
  
  // Error handling middleware
  app.use((err, _req, res, _next) => {
    console.error(err.stack);
    
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: err.errors,
      });
    }
    
    res.status(500).json({
      message: 'Internal server error',
    });
  });
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    log(`serving on port ${PORT}`);
  });
}

// Start the server
start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});