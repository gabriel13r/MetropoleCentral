import { users, type User, type InsertUser } from "@shared/schema";
import type { Article, NewsletterSubscriber } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Article methods
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  
  // Newsletter methods
  addNewsletterSubscriber(email: string): Promise<NewsletterSubscriber>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private articles: Map<number, Article>;
  private newsletterSubscribers: Map<number, NewsletterSubscriber>;
  
  private userId: number;
  private articleId: number;
  private subscriberId: number;

  constructor() {
    this.users = new Map();
    this.articles = new Map();
    this.newsletterSubscribers = new Map();
    
    this.userId = 1;
    this.articleId = 1;
    this.subscriberId = 1;
    
    // Initialize with some demo articles
    this.initializeArticles();
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Article methods
  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }
  
  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }
  
  async getArticlesByCategory(category: string): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(
      (article) => article.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Newsletter methods
  async addNewsletterSubscriber(email: string): Promise<NewsletterSubscriber> {
    // Check if already subscribed
    const existingSubscriber = Array.from(this.newsletterSubscribers.values()).find(
      (subscriber) => subscriber.email === email
    );
    
    if (existingSubscriber) {
      return existingSubscriber;
    }
    
    const id = this.subscriberId++;
    const subscriber: NewsletterSubscriber = {
      id,
      email,
      subscribedAt: new Date().toISOString()
    };
    
    this.newsletterSubscribers.set(id, subscriber);
    return subscriber;
  }
  
  // Helper method to initialize some demo articles
  private initializeArticles() {
    const articles: Article[] = [
      {
        id: this.articleId++,
        title: "Governo anuncia novo pacote de medidas econômicas",
        content: "As medidas incluem estímulos fiscais e programas de investimento em infraestrutura.",
        excerpt: "Pacote visa impulsionar crescimento econômico nos próximos meses.",
        author: "Ricardo Silva",
        category: "Política",
        publishedAt: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
      },
      {
        id: this.articleId++,
        title: "Bolsa atinge novo recorde com otimismo do mercado",
        content: "Indicadores econômicos positivos e expectativa de recuperação impulsionam mercado de ações.",
        excerpt: "Índice Bovespa ultrapassa marca histórica pela primeira vez.",
        author: "Ana Costa",
        category: "Economia",
        publishedAt: new Date(Date.now() - 14400000).toISOString() // 4 hours ago
      },
      {
        id: this.articleId++,
        title: "Inteligência artificial transforma setor de saúde no Brasil",
        content: "Novas tecnologias estão sendo implementadas em hospitais e clínicas em todo o país.",
        excerpt: "IA promete revolucionar diagnósticos e tratamentos médicos.",
        author: "Carlos Mendes",
        category: "Tecnologia",
        publishedAt: new Date(Date.now() - 21600000).toISOString() // 6 hours ago
      }
    ];
    
    articles.forEach(article => {
      this.articles.set(article.id, article);
    });
  }
}

export const storage = new MemStorage();
