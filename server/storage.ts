import { 
  users, type User, type InsertUser,
  characters, type Character, type InsertCharacter,
  serverUpdates, type ServerUpdate, type InsertServerUpdate,
  allowlists, type Allowlist, type InsertAllowlist,
  diamondPackages, type DiamondPackage, type InsertDiamondPackage,
  diamondTransactions, type DiamondTransaction, type InsertDiamondTransaction,
  tickets, type Ticket, type InsertTicket
} from "@shared/schema";
import session from "express-session";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserBySteamId(steamId: string): Promise<User | undefined>;
  getUserByDiscordId(discordId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  updateUserDiamonds(id: number, amount: number): Promise<User | undefined>;
  updateStripeCustomerId(id: number, customerId: string): Promise<User | undefined>;
  updateUserStripeInfo(id: number, info: { customerId: string, subscriptionId: string }): Promise<User | undefined>;
  
  // Character methods
  getCharacter(id: number): Promise<Character | undefined>;
  getCharactersByUserId(userId: number): Promise<Character[]>;
  createCharacter(character: InsertCharacter): Promise<Character>;
  updateCharacter(id: number, character: Partial<Character>): Promise<Character | undefined>;
  
  // Server Updates methods
  getServerUpdates(limit?: number): Promise<ServerUpdate[]>;
  getServerUpdate(id: number): Promise<ServerUpdate | undefined>;
  createServerUpdate(update: InsertServerUpdate): Promise<ServerUpdate>;
  
  // Allowlist methods
  getAllowlists(): Promise<Allowlist[]>;
  getUserAllowlist(userId: number): Promise<Allowlist | undefined>;
  createAllowlist(allowlist: InsertAllowlist): Promise<Allowlist>;
  updateAllowlistStatus(id: number, status: string, reviewerId: number, notes?: string): Promise<Allowlist | undefined>;
  setPriorityAllowlist(id: number, isPriority: boolean): Promise<Allowlist | undefined>;
  
  // Diamond packages methods
  getDiamondPackages(): Promise<DiamondPackage[]>;
  getDiamondPackage(id: number): Promise<DiamondPackage | undefined>;
  createDiamondPackage(pkg: InsertDiamondPackage): Promise<DiamondPackage>;
  updateDiamondPackage(id: number, pkg: Partial<DiamondPackage>): Promise<DiamondPackage | undefined>;
  
  // Diamond transactions methods
  getDiamondTransactions(userId?: number): Promise<DiamondTransaction[]>;
  getDiamondTransaction(id: number): Promise<DiamondTransaction | undefined>;
  createDiamondTransaction(transaction: InsertDiamondTransaction): Promise<DiamondTransaction>;
  updateDiamondTransactionStatus(id: number, status: string): Promise<DiamondTransaction | undefined>;
  
  // Ticket methods
  getTickets(userId?: number): Promise<Ticket[]>;
  getTicket(id: number): Promise<Ticket | undefined>;
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  updateTicketStatus(id: number, status: string, assignedTo?: number): Promise<Ticket | undefined>;
  
  // Session store
  sessionStore: session.Store;
}

import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private characters: Map<number, Character>;
  private serverUpdates: Map<number, ServerUpdate>;
  private allowlists: Map<number, Allowlist>;
  private diamondPackages: Map<number, DiamondPackage>;
  private diamondTransactions: Map<number, DiamondTransaction>;
  private tickets: Map<number, Ticket>;
  
  private userId: number;
  private characterId: number;
  private serverUpdateId: number;
  private allowlistId: number;
  private diamondPackageId: number;
  private diamondTransactionId: number;
  private ticketId: number;
  
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.characters = new Map();
    this.serverUpdates = new Map();
    this.allowlists = new Map();
    this.diamondPackages = new Map();
    this.diamondTransactions = new Map();
    this.tickets = new Map();
    
    this.userId = 1;
    this.characterId = 1;
    this.serverUpdateId = 1;
    this.allowlistId = 1;
    this.diamondPackageId = 1;
    this.diamondTransactionId = 1;
    this.ticketId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Initialize sample data
    this.initializeServerUpdates();
    this.initializeDiamondPackages();
    
    // Create a demo user
    this.createUser({
      username: "teste",
      password: "$2b$10$MNZrMgozmllVCPWQQTOXo.IrbD5nUSfqbW8.jm2vewehqEE1.4lBG", // "password"
      displayName: "teste#42167",
      hexId: "10000011896f81b",
      discordId: "283543709621237723"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserBySteamId(steamId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.steamId === steamId
    );
  }

  async getUserByDiscordId(discordId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.discordId === discordId
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      displayName: insertUser.displayName || null,
      email: insertUser.email || null,
      steamId: insertUser.steamId || null,
      discordId: insertUser.discordId || null,
      hexId: insertUser.hexId || null,
      avatar: insertUser.avatar || null,
      diamonds: 0,
      isVip: false,
      vipExpiry: null,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      joinedAt: now, 
      lastLogin: now,
      role: "player"
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser: User = {
      ...user,
      ...data
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async updateUserDiamonds(id: number, amount: number): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser: User = {
      ...user,
      diamonds: (user.diamonds || 0) + amount
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async updateStripeCustomerId(id: number, customerId: string): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser: User = {
      ...user,
      stripeCustomerId: customerId
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async updateUserStripeInfo(id: number, info: { customerId: string, subscriptionId: string }): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser: User = {
      ...user,
      stripeCustomerId: info.customerId,
      stripeSubscriptionId: info.subscriptionId
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Character methods
  async getCharactersByUserId(userId: number): Promise<Character[]> {
    return Array.from(this.characters.values()).filter(
      (character) => character.userId === userId
    );
  }
  
  async getCharacter(id: number): Promise<Character | undefined> {
    return this.characters.get(id);
  }
  
  async createCharacter(insertCharacter: InsertCharacter): Promise<Character> {
    const id = this.characterId++;
    const now = new Date();
    const character: Character = {
      ...insertCharacter,
      id,
      createdAt: now,
      lastPlayed: now,
      isActive: true
    };
    this.characters.set(id, character);
    return character;
  }
  
  async updateCharacter(id: number, data: Partial<Character>): Promise<Character | undefined> {
    const character = this.characters.get(id);
    if (!character) return undefined;
    
    const updatedCharacter: Character = {
      ...character,
      ...data
    };
    
    this.characters.set(id, updatedCharacter);
    return updatedCharacter;
  }
  
  // Server Updates methods
  async getServerUpdates(limit?: number): Promise<ServerUpdate[]> {
    const updates = Array.from(this.serverUpdates.values())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return limit ? updates.slice(0, limit) : updates;
  }
  
  async getServerUpdate(id: number): Promise<ServerUpdate | undefined> {
    return this.serverUpdates.get(id);
  }
  
  async createServerUpdate(update: InsertServerUpdate): Promise<ServerUpdate> {
    const id = this.serverUpdateId++;
    const serverUpdate: ServerUpdate = {
      ...update,
      id,
      publishedAt: new Date()
    };
    this.serverUpdates.set(id, serverUpdate);
    return serverUpdate;
  }
  
  // Allowlist methods
  async getAllowlists(): Promise<Allowlist[]> {
    return Array.from(this.allowlists.values());
  }
  
  async getUserAllowlist(userId: number): Promise<Allowlist | undefined> {
    return Array.from(this.allowlists.values()).find(
      allowlist => allowlist.userId === userId
    );
  }
  
  async createAllowlist(allowlist: InsertAllowlist): Promise<Allowlist> {
    const id = this.allowlistId++;
    const now = new Date();
    const newAllowlist: Allowlist = {
      ...allowlist,
      id,
      submittedAt: now,
      status: "pending",
      isPriority: false,
      reviewedAt: null,
      reviewerId: null,
      reviewNotes: null
    };
    
    this.allowlists.set(id, newAllowlist);
    return newAllowlist;
  }
  
  async updateAllowlistStatus(id: number, status: string, reviewerId: number, notes?: string): Promise<Allowlist | undefined> {
    const allowlist = this.allowlists.get(id);
    if (!allowlist) return undefined;
    
    const updatedAllowlist: Allowlist = {
      ...allowlist,
      status,
      reviewerId,
      reviewNotes: notes || null,
      reviewedAt: new Date()
    };
    
    this.allowlists.set(id, updatedAllowlist);
    return updatedAllowlist;
  }
  
  async setPriorityAllowlist(id: number, isPriority: boolean): Promise<Allowlist | undefined> {
    const allowlist = this.allowlists.get(id);
    if (!allowlist) return undefined;
    
    const updatedAllowlist: Allowlist = {
      ...allowlist,
      isPriority
    };
    
    this.allowlists.set(id, updatedAllowlist);
    return updatedAllowlist;
  }
  
  // Diamond packages methods
  async getDiamondPackages(): Promise<DiamondPackage[]> {
    return Array.from(this.diamondPackages.values())
      .filter(pkg => pkg.isActive);
  }
  
  async getDiamondPackage(id: number): Promise<DiamondPackage | undefined> {
    return this.diamondPackages.get(id);
  }
  
  async createDiamondPackage(pkg: InsertDiamondPackage): Promise<DiamondPackage> {
    const id = this.diamondPackageId++;
    const diamondPackage: DiamondPackage = {
      ...pkg,
      id,
      isActive: true
    };
    
    this.diamondPackages.set(id, diamondPackage);
    return diamondPackage;
  }
  
  async updateDiamondPackage(id: number, data: Partial<DiamondPackage>): Promise<DiamondPackage | undefined> {
    const diamondPackage = this.diamondPackages.get(id);
    if (!diamondPackage) return undefined;
    
    const updatedPackage: DiamondPackage = {
      ...diamondPackage,
      ...data
    };
    
    this.diamondPackages.set(id, updatedPackage);
    return updatedPackage;
  }
  
  // Diamond transactions methods
  async getDiamondTransactions(userId?: number): Promise<DiamondTransaction[]> {
    const transactions = Array.from(this.diamondTransactions.values());
    
    if (userId) {
      return transactions.filter(t => t.userId === userId);
    }
    
    return transactions;
  }
  
  async getDiamondTransaction(id: number): Promise<DiamondTransaction | undefined> {
    return this.diamondTransactions.get(id);
  }
  
  async createDiamondTransaction(transaction: InsertDiamondTransaction): Promise<DiamondTransaction> {
    const id = this.diamondTransactionId++;
    const now = new Date();
    
    const newTransaction: DiamondTransaction = {
      ...transaction,
      id,
      createdAt: now
    };
    
    this.diamondTransactions.set(id, newTransaction);
    return newTransaction;
  }
  
  async updateDiamondTransactionStatus(id: number, status: string): Promise<DiamondTransaction | undefined> {
    const transaction = this.diamondTransactions.get(id);
    if (!transaction) return undefined;
    
    const updatedTransaction: DiamondTransaction = {
      ...transaction,
      status
    };
    
    this.diamondTransactions.set(id, updatedTransaction);
    return updatedTransaction;
  }
  
  // Ticket methods
  async getTickets(userId?: number): Promise<Ticket[]> {
    const tickets = Array.from(this.tickets.values());
    
    if (userId) {
      return tickets.filter(t => t.userId === userId);
    }
    
    return tickets;
  }
  
  async getTicket(id: number): Promise<Ticket | undefined> {
    return this.tickets.get(id);
  }
  
  async createTicket(ticket: InsertTicket): Promise<Ticket> {
    const id = this.ticketId++;
    const now = new Date();
    
    const newTicket: Ticket = {
      ...ticket,
      id,
      status: "open",
      createdAt: now,
      closedAt: null,
      assignedTo: null
    };
    
    this.tickets.set(id, newTicket);
    return newTicket;
  }
  
  async updateTicketStatus(id: number, status: string, assignedTo?: number): Promise<Ticket | undefined> {
    const ticket = this.tickets.get(id);
    if (!ticket) return undefined;
    
    const updatedTicket: Ticket = {
      ...ticket,
      status,
      assignedTo: assignedTo || ticket.assignedTo,
      closedAt: status === "closed" ? new Date() : ticket.closedAt
    };
    
    this.tickets.set(id, updatedTicket);
    return updatedTicket;
  }
  
  // Helper method to initialize some demo data
  private initializeServerUpdates() {
    const updates: ServerUpdate[] = [
      {
        id: this.serverUpdateId++,
        title: "Servidor Metropole GTA RP - Atualização semanal",
        content: "Novos veículos adicionados, correções de bugs e melhorias de desempenho.",
        type: "update",
        version: "v1.2.5",
        thumbnail: null,
        publishedAt: new Date(),
        isImportant: false
      },
      {
        id: this.serverUpdateId++,
        title: "Novo Evento de Corrida na Cidade",
        content: "Participe do nosso evento de corrida neste fim de semana! Grandes prêmios para os vencedores.",
        type: "event",
        version: "v1.2.4",
        thumbnail: null,
        publishedAt: new Date(Date.now() - 86400000), // 1 day ago
        isImportant: true
      },
      {
        id: this.serverUpdateId++,
        title: "Manutenção Programada",
        content: "O servidor estará offline para manutenção na terça-feira, 27 de abril, das 03h às 06h.",
        type: "maintenance",
        version: "v1.2.3",
        thumbnail: null,
        publishedAt: new Date(Date.now() - 172800000), // 2 days ago
        isImportant: true
      }
    ];
    
    updates.forEach(update => {
      this.serverUpdates.set(update.id, update);
    });
  }
  
  private initializeDiamondPackages() {
    const packages: DiamondPackage[] = [
      {
        id: this.diamondPackageId++,
        amount: 65,
        price: "16",
        description: "Pacote Básico",
        isActive: true
      },
      {
        id: this.diamondPackageId++,
        amount: 125,
        price: "26",
        description: "Pacote Iniciante",
        isActive: true
      },
      {
        id: this.diamondPackageId++,
        amount: 555,
        price: "123",
        description: "Pacote Intermediário",
        isActive: true
      },
      {
        id: this.diamondPackageId++,
        amount: 1125,
        price: "243",
        description: "Pacote Avançado",
        isActive: true
      },
      {
        id: this.diamondPackageId++,
        amount: 2250,
        price: "484",
        description: "Pacote Premium",
        isActive: true
      },
      {
        id: this.diamondPackageId++,
        amount: 5600,
        price: "1202",
        description: "Pacote Ultimate",
        isActive: true
      }
    ];
    
    packages.forEach(pkg => {
      this.diamondPackages.set(pkg.id, pkg);
    });
    
    // Create an initial allowlist for our demo user
    this.createAllowlist({
      userId: 1,
      isPriority: false
    });
  }
}

export const storage = new MemStorage();
