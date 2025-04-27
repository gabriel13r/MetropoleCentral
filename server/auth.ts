import session from "express-session";
import { Express } from "express";
import crypto from "crypto";
import { User as UserType } from "@shared/schema";
import { storage } from "./storage";

declare global {
  namespace Express {
    interface Session {
      userId?: number;
    }
    interface User extends UserType {}
  }
}

// Adicionando tipo para session-express
declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

// Ideal seria usar bcrypt para comparação segura de senhas
// Mas para simplificar, usaremos comparação direta neste exemplo
// Em produção, recomendamos usar bcrypt para hash de senha

export function setupAuth(app: Express) {
  if (!process.env.SESSION_SECRET) {
    // Gere um secret aleatório para desenvolvimento, mas em produção deve ser configurado
    process.env.SESSION_SECRET = crypto.randomBytes(32).toString("hex");
    console.warn("⚠️ Using randomly generated session secret. This is OK for development, but in production, configure SESSION_SECRET environment variable.");
  }
  
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semana
      sameSite: "lax"
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
}