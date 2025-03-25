import { 
  users, 
  type User, 
  type InsertUser,
  assessments,
  type Assessment,
  type InsertAssessment,
  careerMatches,
  type CareerMatch,
  type InsertCareerMatch,
  skillGaps,
  type SkillGap,
  type InsertSkillGap,
  resources,
  type Resource,
  type InsertResource,
  marketTrends,
  type MarketTrend,
  type InsertMarketTrend
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined>;
  
  // Assessment operations
  getAssessmentsByUserId(userId: number): Promise<Assessment[]>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  updateAssessment(id: number, assessmentData: Partial<InsertAssessment>): Promise<Assessment | undefined>;
  
  // Career Match operations
  getCareerMatchesByUserId(userId: number): Promise<CareerMatch[]>;
  createCareerMatch(careerMatch: InsertCareerMatch): Promise<CareerMatch>;
  
  // Skill Gap operations
  getSkillGapsByUserId(userId: number): Promise<SkillGap[]>;
  createSkillGap(skillGap: InsertSkillGap): Promise<SkillGap>;
  updateSkillGap(id: number, skillGapData: Partial<InsertSkillGap>): Promise<SkillGap | undefined>;
  
  // Resource operations
  getResourcesBySkillId(skillId: number): Promise<Resource[]>;
  getAllResources(): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  // Market Trend operations
  getMarketTrends(): Promise<MarketTrend[]>;
  getMarketTrendsByCareer(careerTitle: string): Promise<MarketTrend[]>;
  createMarketTrend(marketTrend: InsertMarketTrend): Promise<MarketTrend>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private assessments: Map<number, Assessment>;
  private careerMatches: Map<number, CareerMatch>;
  private skillGaps: Map<number, SkillGap>;
  private resources: Map<number, Resource>;
  private marketTrends: Map<number, MarketTrend>;
  
  private currentUserId: number;
  private currentAssessmentId: number;
  private currentCareerMatchId: number;
  private currentSkillGapId: number;
  private currentResourceId: number;
  private currentMarketTrendId: number;

  constructor() {
    this.users = new Map();
    this.assessments = new Map();
    this.careerMatches = new Map();
    this.skillGaps = new Map();
    this.resources = new Map();
    this.marketTrends = new Map();
    
    this.currentUserId = 1;
    this.currentAssessmentId = 1;
    this.currentCareerMatchId = 1;
    this.currentSkillGapId = 1;
    this.currentResourceId = 1;
    this.currentMarketTrendId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample market trends for different careers
    const careers = ["Data Science", "UX Design", "Product Management"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const dataScience = [110, 125, 140, 152, 158, 170, 185, 190, 205, 220, 235, 245];
    const uxDesign = [95, 100, 108, 115, 122, 130, 135, 142, 148, 155, 160, 168];
    const productManagement = [80, 88, 95, 102, 110, 115, 122, 128, 135, 140, 148, 155];
    
    months.forEach((month, index) => {
      this.createMarketTrend({
        careerTitle: "Data Science",
        month,
        year: 2023,
        jobCount: dataScience[index],
      });
      
      this.createMarketTrend({
        careerTitle: "UX Design",
        month,
        year: 2023,
        jobCount: uxDesign[index],
      });
      
      this.createMarketTrend({
        careerTitle: "Product Management",
        month,
        year: 2023,
        jobCount: productManagement[index],
      });
    });
    
    // Sample resources
    this.createResource({
      title: "Python for Data Science",
      type: "course",
      description: "Comprehensive course covering Python fundamentals for data analysis",
      link: "https://example.com/python-course",
      skillId: 1,
    });
    
    this.createResource({
      title: "SQL Fundamentals",
      type: "course",
      description: "Learn database management and SQL queries for data analysis",
      link: "https://example.com/sql-course",
      skillId: 2,
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Assessment methods
  async getAssessmentsByUserId(userId: number): Promise<Assessment[]> {
    return Array.from(this.assessments.values()).filter(
      (assessment) => assessment.userId === userId,
    );
  }
  
  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = this.currentAssessmentId++;
    const assessment: Assessment = { ...insertAssessment, id };
    this.assessments.set(id, assessment);
    return assessment;
  }
  
  async updateAssessment(id: number, assessmentData: Partial<InsertAssessment>): Promise<Assessment | undefined> {
    const assessment = this.assessments.get(id);
    if (!assessment) return undefined;
    
    const updatedAssessment = { ...assessment, ...assessmentData };
    this.assessments.set(id, updatedAssessment);
    return updatedAssessment;
  }
  
  // Career Match methods
  async getCareerMatchesByUserId(userId: number): Promise<CareerMatch[]> {
    return Array.from(this.careerMatches.values()).filter(
      (careerMatch) => careerMatch.userId === userId,
    );
  }
  
  async createCareerMatch(insertCareerMatch: InsertCareerMatch): Promise<CareerMatch> {
    const id = this.currentCareerMatchId++;
    const careerMatch: CareerMatch = { ...insertCareerMatch, id };
    this.careerMatches.set(id, careerMatch);
    return careerMatch;
  }
  
  // Skill Gap methods
  async getSkillGapsByUserId(userId: number): Promise<SkillGap[]> {
    return Array.from(this.skillGaps.values()).filter(
      (skillGap) => skillGap.userId === userId,
    );
  }
  
  async createSkillGap(insertSkillGap: InsertSkillGap): Promise<SkillGap> {
    const id = this.currentSkillGapId++;
    const skillGap: SkillGap = { ...insertSkillGap, id };
    this.skillGaps.set(id, skillGap);
    return skillGap;
  }
  
  async updateSkillGap(id: number, skillGapData: Partial<InsertSkillGap>): Promise<SkillGap | undefined> {
    const skillGap = this.skillGaps.get(id);
    if (!skillGap) return undefined;
    
    const updatedSkillGap = { ...skillGap, ...skillGapData };
    this.skillGaps.set(id, updatedSkillGap);
    return updatedSkillGap;
  }
  
  // Resource methods
  async getResourcesBySkillId(skillId: number): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(
      (resource) => resource.skillId === skillId,
    );
  }
  
  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }
  
  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.currentResourceId++;
    const resource: Resource = { ...insertResource, id };
    this.resources.set(id, resource);
    return resource;
  }
  
  // Market Trend methods
  async getMarketTrends(): Promise<MarketTrend[]> {
    return Array.from(this.marketTrends.values());
  }
  
  async getMarketTrendsByCareer(careerTitle: string): Promise<MarketTrend[]> {
    return Array.from(this.marketTrends.values()).filter(
      (marketTrend) => marketTrend.careerTitle === careerTitle,
    );
  }
  
  async createMarketTrend(insertMarketTrend: InsertMarketTrend): Promise<MarketTrend> {
    const id = this.currentMarketTrendId++;
    const marketTrend: MarketTrend = { ...insertMarketTrend, id };
    this.marketTrends.set(id, marketTrend);
    return marketTrend;
  }
}

export const storage = new MemStorage();
