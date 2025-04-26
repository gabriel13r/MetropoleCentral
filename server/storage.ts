import { 
  users, type User, type InsertUser,
  characters, type Character, type InsertCharacter,
  serverUpdates, type ServerUpdate, type InsertServerUpdate,
  applications, type Application, type InsertApplication
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserBySteamId(steamId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Character methods
  getCharacter(id: number): Promise<Character | undefined>;
  getCharactersByUserId(userId: number): Promise<Character[]>;
  createCharacter(character: InsertCharacter): Promise<Character>;
  updateCharacter(id: number, character: Partial<Character>): Promise<Character | undefined>;
  
  // Server Updates methods
  getServerUpdates(limit?: number): Promise<ServerUpdate[]>;
  getServerUpdate(id: number): Promise<ServerUpdate | undefined>;
  createServerUpdate(update: InsertServerUpdate): Promise<ServerUpdate>;
  
  // Application methods
  getApplications(): Promise<Application[]>;
  getUserApplications(userId: number): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplicationStatus(id: number, status: string, reviewerId: number, notes?: string): Promise<Application | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private characters: Map<number, Character>;
  private serverUpdates: Map<number, ServerUpdate>;
  private applications: Map<number, Application>;
  
  private userId: number;
  private characterId: number;
  private serverUpdateId: number;
  private applicationId: number;

  constructor() {
    this.users = new Map();
    this.characters = new Map();
    this.serverUpdates = new Map();
    this.applications = new Map();
    
    this.userId = 1;
    this.characterId = 1;
    this.serverUpdateId = 1;
    this.applicationId = 1;
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      joinedAt: now, 
      lastLogin: now,
      role: insertUser.role || "player"
    };
    this.users.set(id, user);
    return user;
  }
  
  async getUserBySteamId(steamId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.steamId === steamId
    );
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
  
  // Application methods
  async getApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }
  
  async getUserApplications(userId: number): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(
      (application) => application.userId === userId
    );
  }
  
  async createApplication(application: InsertApplication): Promise<Application> {
    const id = this.applicationId++;
    const now = new Date();
    const newApplication: Application = {
      ...application,
      id,
      submittedAt: now,
      status: "pending",
      reviewedAt: null,
      reviewerId: null,
      reviewNotes: null
    };
    this.applications.set(id, newApplication);
    return newApplication;
  }
  
  async updateApplicationStatus(id: number, status: string, reviewerId: number, notes?: string): Promise<Application | undefined> {
    const application = this.applications.get(id);
    if (!application) return undefined;
    
    const updatedApplication: Application = {
      ...application,
      status,
      reviewerId,
      reviewNotes: notes || null,
      reviewedAt: new Date()
    };
    
    this.applications.set(id, updatedApplication);
    return updatedApplication;
  }
  
  // Helper method to initialize some demo data
  private initializeServerUpdates() {
    const updates: ServerUpdate[] = [
      {
        id: this.serverUpdateId++,
        title: "Servidor Metropole GTA RP - Atualização semanal",
        content: "Novos veículos adicionados, correções de bugs e melhorias de desempenho.",
        type: "update",
        thumbnail: null,
        publishedAt: new Date(),
        isImportant: false
      },
      {
        id: this.serverUpdateId++,
        title: "Novo Evento de Corrida na Cidade",
        content: "Participe do nosso evento de corrida neste fim de semana! Grandes prêmios para os vencedores.",
        type: "event",
        thumbnail: null,
        publishedAt: new Date(Date.now() - 86400000), // 1 day ago
        isImportant: true
      },
      {
        id: this.serverUpdateId++,
        title: "Manutenção Programada",
        content: "O servidor estará offline para manutenção na terça-feira, 27 de abril, das 03h às 06h.",
        type: "maintenance",
        thumbnail: null,
        publishedAt: new Date(Date.now() - 172800000), // 2 days ago
        isImportant: true
      }
    ];
    
    updates.forEach(update => {
      this.serverUpdates.set(update.id, update);
    });
  }
}

export const storage = new MemStorage();
