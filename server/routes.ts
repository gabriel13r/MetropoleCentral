import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { setupAuth } from "./auth";

// Verificar a chave de API da Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" })
  : undefined;

export async function registerRoutes(app: Express): Promise<Server> {
  // Configuração de autenticação via Steam
  setupAuth(app);
  
  // ============== Auth Routes (Legacy) ==============
  app.post("/api/register", async (req, res) => {
    try {
      const { username, password, steamId, hexId, discordId, displayName } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser({
        username,
        password,
        steamId,
        hexId,
        discordId,
        displayName
      });
      
      res.status(201).json({
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        diamonds: user.diamonds,
        isVip: user.isVip
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      req.session.userId = user.id;
      
      res.json({
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        diamonds: user.diamonds,
        isVip: user.isVip
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
  
  app.get("/api/user", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        diamonds: user.diamonds,
        isVip: user.isVip
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // ============== Server Updates Routes ==============
  app.get("/api/server-updates", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const updates = await storage.getServerUpdates(limit);
      res.json(updates);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/server-updates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const update = await storage.getServerUpdate(id);
      
      if (!update) {
        return res.status(404).json({ message: "Server update not found" });
      }
      
      res.json(update);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // ============== Allowlist Routes ==============
  app.get("/api/allowlist", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const allowlist = await storage.getUserAllowlist(req.session.userId);
      res.json(allowlist || { status: null });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/allowlist", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const existingAllowlist = await storage.getUserAllowlist(req.session.userId);
      if (existingAllowlist) {
        return res.status(400).json({ message: "Allowlist application already exists" });
      }
      
      const allowlist = await storage.createAllowlist({
        userId: req.session.userId,
        isPriority: false
      });
      
      res.status(201).json(allowlist);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/allowlist/prioritize", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const allowlist = await storage.getUserAllowlist(req.session.userId);
      if (!allowlist) {
        return res.status(404).json({ message: "Allowlist application not found" });
      }
      
      const updated = await storage.setPriorityAllowlist(allowlist.id, true);
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Admin routes for allowlist
  app.get("/api/admin/allowlists", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUser(req.session.userId);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Not authorized" });
      }
      
      const allowlists = await storage.getAllowlists();
      res.json(allowlists);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/admin/allowlists/:id/status", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUser(req.session.userId);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Not authorized" });
      }
      
      const { status, notes } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const id = parseInt(req.params.id);
      const updated = await storage.updateAllowlistStatus(id, status, req.session.userId, notes);
      
      if (!updated) {
        return res.status(404).json({ message: "Allowlist application not found" });
      }
      
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // ============== Diamond Packages Routes ==============
  app.get("/api/diamond-packages", async (req, res) => {
    try {
      const packages = await storage.getDiamondPackages();
      res.json(packages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // ============== Diamond Transactions Routes ==============
  app.get("/api/diamond-transactions", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const transactions = await storage.getDiamondTransactions(req.session.userId);
      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // ============== Ticket Routes ==============
  app.get("/api/tickets", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const tickets = await storage.getTickets(req.session.userId);
      res.json(tickets);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/tickets", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
      }
      
      const ticket = await storage.createTicket({
        userId: req.session.userId,
        title,
        content
      });
      
      res.status(201).json(ticket);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // ============== Stripe Payment Routes ==============
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const { packageId } = req.body;
      if (!packageId) {
        return res.status(400).json({ message: "Package ID is required" });
      }
      
      const diamondPackage = await storage.getDiamondPackage(packageId);
      if (!diamondPackage) {
        return res.status(404).json({ message: "Diamond package not found" });
      }
      
      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(parseFloat(diamondPackage.price) * 100), // Convert to cents
        currency: "brl",
        metadata: {
          userId: req.session.userId.toString(),
          packageId: packageId.toString(),
          diamondAmount: diamondPackage.amount.toString()
        }
      });
      
      // Create a pending transaction
      const transaction = await storage.createDiamondTransaction({
        userId: req.session.userId,
        packageId,
        amount: diamondPackage.amount,
        price: diamondPackage.price,
        paymentIntent: paymentIntent.id,
        status: "pending"
      });
      
      res.json({
        clientSecret: paymentIntent.client_secret,
        transactionId: transaction.id
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });
  
  // Webhook for Stripe events
  app.post("/api/webhook", async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    
    try {
      // This would need to be properly implemented with signature verification
      // For now, we'll assume the webhook is valid
      event = req.body;
      
      // Handle the event
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        
        // Find the transaction by payment intent ID
        const transactions = await storage.getDiamondTransactions();
        const transaction = transactions.find(t => t.paymentIntent === paymentIntent.id);
        
        if (transaction) {
          // Update transaction status
          await storage.updateDiamondTransactionStatus(transaction.id, "completed");
          
          // Add diamonds to user
          await storage.updateUserDiamonds(transaction.userId, transaction.amount);
        }
      }
      
      res.json({ received: true });
    } catch (error: any) {
      res.status(400).json({ message: `Webhook Error: ${error.message}` });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
