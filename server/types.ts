import { Session, SessionData } from 'express-session';

// Extend Express session
declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}