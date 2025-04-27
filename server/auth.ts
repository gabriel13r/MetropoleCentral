import session from "express-session";
import { Express, Request, Response, NextFunction } from "express";
import crypto from "crypto";
import passport from "passport";
import { Strategy as SteamStrategy } from "passport-steam";
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

// Verificar a chave de API da Steam
if (!process.env.STEAM_API_KEY) {
  console.error("STEAM_API_KEY is not set. Steam authentication will not work properly.");
}

const CALLBACK_URL = process.env.NODE_ENV === "production"
  ? "https://fishgg.com/api/auth/steam/return"  // URL de produção
  : "http://localhost:5000/api/auth/steam/return"; // URL local para desenvolvimento

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
  app.use(passport.initialize());
  app.use(passport.session());

  // Configuração do Passport
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

  // Estratégia de autenticação Steam
  passport.use(new SteamStrategy({
    returnURL: CALLBACK_URL,
    realm: CALLBACK_URL.split('/api')[0], // URL base
    apiKey: process.env.STEAM_API_KEY as string
  }, async (identifier: string, profile: any, done: any) => {
    try {
      const steamId = profile.id;
      let user = await storage.getUserBySteamId(steamId);

      if (!user) {
        // Criar novo usuário com dados do perfil Steam
        user = await storage.createUser({
          username: profile.displayName,
          steamId: steamId,
          displayName: profile.displayName,
          avatar: profile._json.avatarfull
        });
      } else {
        // Atualizar informações do usuário existente
        user = await storage.updateUser(user.id, {
          displayName: profile.displayName,
          avatar: profile._json.avatarfull
        }) as UserType;
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  // Rotas de autenticação Steam
  app.get('/api/auth/steam', passport.authenticate('steam'));

  app.get('/api/auth/steam/return', 
    passport.authenticate('steam', { failureRedirect: '/auth?error=steam-auth-failed' }),
    (req: Request, res: Response) => {
      // Login bem-sucedido, redireciona para o dashboard
      res.redirect('/dashboard');
    }
  );

  // Rota para verificar usuário atual
  app.get('/api/user', (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(req.user);
  });

  // Rota para logout
  app.post('/api/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });
}