import session from "express-session";
import { Express, Request, Response, NextFunction } from "express";
import crypto from "crypto";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
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

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

const BASE_URL = process.env.REPLIT_SLUG 
  ? `https://discord.com/oauth2/authorize?client_id=1366196340601917542&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A5000%2Fapi%2Fauth%2Fdiscord%2Fcallback&scope=identify`
  : "http://127.0.0.1:5000";

// Define as credenciais diretamente aqui
const DISCORD_CLIENT_ID = "1366196340601917542";
const DISCORD_CLIENT_SECRET = "aX55M6Sdt87cFvk4AQ9lWkf8wcXKk5Rz";

export function setupAuth(app: Express) {
  if (!process.env.SESSION_SECRET) {
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
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "lax"
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: Express.User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // Agora não precisa mais do IF de checagem
  passport.use(new DiscordStrategy({
    clientID: DISCORD_CLIENT_ID,
    clientSecret: DISCORD_CLIENT_SECRET,
    callbackURL: `${BASE_URL}/api/auth/discord/callback`,
    scope: ['identify', 'email']
  }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      let user = await storage.getUserByDiscordId(profile.id);

      if (!user) {
        user = await storage.createUser({
          username: profile.username,
          discordId: profile.id,
          displayName: profile.username,
          avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  app.get('/api/auth/discord', passport.authenticate('discord'));

  app.get('/api/auth/discord/callback',
    passport.authenticate('discord', { 
      failureRedirect: '/auth?error=discord-auth-failed',
      successRedirect: '/dashboard'
    })
  );

  app.get('/api/user', (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(req.user);
  });

  app.post('/api/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });
}
