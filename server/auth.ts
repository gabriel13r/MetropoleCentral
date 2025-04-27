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

// Usando a URL do Replit como base, ou localhost se não estiver disponível
const BASE_URL = process.env.REPLIT_SLUG 
  ? `https://${process.env.REPLIT_SLUG}.${process.env.REPLIT_OWNER}.repl.co`
  : "http://localhost:5000";  // Porta 5000 conforme indicado nos logs

const CALLBACK_URL = process.env.NODE_ENV === "production"
  ? "https://fishgg.com/api/auth/steam/return"  // URL de produção
  : `${BASE_URL}/api/auth/steam/return`; // URL para desenvolvimento

console.log(`[CONFIG] BASE_URL configurada como: ${BASE_URL}`);
console.log(`[CONFIG] CALLBACK_URL configurada como: ${CALLBACK_URL}`);

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
  const realm = BASE_URL; // Usando base_url completo como realm
  
  console.log(`[AUTH] Configurando Steam Strategy com:`);
  console.log(`[AUTH] - returnURL: ${CALLBACK_URL}`);
  console.log(`[AUTH] - realm: ${realm}`);
  console.log(`[AUTH] - apiKey: ${process.env.STEAM_API_KEY ? "Configurada" : "NÃO CONFIGURADA"}`);
  
  passport.use(new SteamStrategy({
    returnURL: CALLBACK_URL,
    realm: realm,
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
  app.get('/api/auth/steam', (req, res, next) => {
    console.log(`[AUTH] Iniciando autenticação Steam, callback URL: ${CALLBACK_URL}`);
    passport.authenticate('steam')(req, res, next);
  });

  app.get('/api/auth/steam/return', 
    passport.authenticate('steam', { failureRedirect: '/auth?error=steam-auth-failed' }),
    (req: Request, res: Response) => {
      // Login bem-sucedido, redireciona para o dashboard no cliente (porta 3000)
      console.log(`[AUTH] Login Steam bem-sucedido, redirecionando para /dashboard. User: ${JSON.stringify(req.user)}`);
      
      // Em desenvolvimento, redirecionamos para a porta 3000
      if (process.env.NODE_ENV === 'development') {
        res.redirect('http://localhost:3000/dashboard');
      } else {
        res.redirect('/dashboard');
      }
    }
  );

  // Rota para verificar usuário atual
  app.get('/api/user', (req: Request, res: Response) => {
    console.log(`[AUTH] Checando usuário atual. isAuthenticated: ${req.isAuthenticated()}`);
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    console.log(`[AUTH] Usuário autenticado: ${req.user?.username}`);
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