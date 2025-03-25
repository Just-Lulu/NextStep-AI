import { Request } from 'express';
import { Session } from 'express-session';

// Extend Express session
declare module 'express-session' {
  interface Session {
    userId?: number;
  }
}

// Extend Express request
declare global {
  namespace Express {
    interface Request {
      session: Session & {
        userId?: number;
      };
    }
  }
}