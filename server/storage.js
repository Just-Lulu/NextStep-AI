// In-memory storage implementation

class MemStorage {
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
    
    // Initialize with demo data
    this.initializeData();
  }
  
  // Initialize with demo data
  initializeData() {
    // Create a demo user
    const demoUser = {
      id: this.currentUserId++,
      username: "demo",
      password: "password123", // In a real app, this would be hashed
      fullName: "Demo User",
      email: "demo@adeleke.edu.ng",
      department: "Computer Science",
      level: "300",
      skills: ["JavaScript", "Python", "HTML/CSS", "Node.js", "React"],
      interests: ["Web Development", "Data Science", "Machine Learning", "UI/UX Design"],
      academicBackground: {
        courses: ["Introduction to Programming", "Data Structures and Algorithms", "Database Management", "Web Development"],
        projects: ["E-commerce Website", "Data Analysis Dashboard", "Mobile App Prototype"],
        achievements: ["Dean's List 2023", "Hackathon Winner 2022"],
      },
      createdAt: new Date().toISOString(),
    };
    this.users.set(demoUser.id, demoUser);
    
    // Create demo assessments
    const demoAssessment = {
      id: this.currentAssessmentId++,
      userId: demoUser.id,
      type: "technical",
      results: {
        skills: [
          { name: "JavaScript", level: 4 },
          { name: "Python", level: 3 },
          { name: "HTML/CSS", level: 4 },
          { name: "Node.js", level: 3 },
          { name: "React", level: 3 },
        ],
      },
      completedAt: new Date().toISOString(),
    };
    this.assessments.set(demoAssessment.id, demoAssessment);
    
    // Create demo career matches
    const careerMatches = [
      {
        id: this.currentCareerMatchId++,
        userId: demoUser.id,
        title: "Full Stack Developer",
        matchPercentage: 85,
        description: "Develop both client and server-side applications using JavaScript frameworks.",
        requiredSkills: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
        salaryRange: "$70,000 - $120,000",
        demandStatus: "High demand",
        createdAt: new Date().toISOString(),
      },
      {
        id: this.currentCareerMatchId++,
        userId: demoUser.id,
        title: "Data Scientist",
        matchPercentage: 72,
        description: "Analyze and interpret complex data to help organizations make better decisions.",
        requiredSkills: ["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"],
        salaryRange: "$80,000 - $140,000",
        demandStatus: "Growing",
        createdAt: new Date().toISOString(),
      },
      {
        id: this.currentCareerMatchId++,
        userId: demoUser.id,
        title: "UX/UI Designer",
        matchPercentage: 68,
        description: "Design user interfaces and experiences for websites and applications.",
        requiredSkills: ["UI Design", "User Research", "Wireframing", "Prototyping", "HTML/CSS"],
        salaryRange: "$65,000 - $110,000",
        demandStatus: "Stable",
        createdAt: new Date().toISOString(),
      },
    ];
    
    for (const match of careerMatches) {
      this.careerMatches.set(match.id, match);
    }
    
    // Create demo skill gaps
    const skillGaps = [
      {
        id: this.currentSkillGapId++,
        userId: demoUser.id,
        skill: "MongoDB",
        currentLevel: 1,
        targetCareer: "Full Stack Developer",
        createdAt: new Date().toISOString(),
      },
      {
        id: this.currentSkillGapId++,
        userId: demoUser.id,
        skill: "Express",
        currentLevel: 2,
        targetCareer: "Full Stack Developer",
        createdAt: new Date().toISOString(),
      },
      {
        id: this.currentSkillGapId++,
        userId: demoUser.id,
        skill: "Statistics",
        currentLevel: 2,
        targetCareer: "Data Scientist",
        createdAt: new Date().toISOString(),
      },
    ];
    
    for (const gap of skillGaps) {
      this.skillGaps.set(gap.id, gap);
    }
    
    // Create demo resources
    const resources = [
      {
        id: this.currentResourceId++,
        type: "Course",
        title: "MongoDB University",
        link: "https://university.mongodb.com/",
        description: "Free MongoDB courses from beginner to advanced",
        skillId: 1, // MongoDB skill ID
        createdAt: new Date().toISOString(),
      },
      {
        id: this.currentResourceId++,
        type: "Tutorial",
        title: "Express.js Crash Course",
        link: "https://www.youtube.com/watch?v=L72fhGm1tfE",
        description: "Learn Express.js in 1 hour",
        skillId: 2, // Express skill ID
        createdAt: new Date().toISOString(),
      },
      {
        id: this.currentResourceId++,
        type: "Book",
        title: "Statistics for Data Scientists",
        link: "https://www.oreilly.com/library/view/statistics-for-data/9781492072942/",
        description: "Essential statistics concepts for data science",
        skillId: 3, // Statistics skill ID
        createdAt: new Date().toISOString(),
      },
    ];
    
    for (const resource of resources) {
      this.resources.set(resource.id, resource);
    }
    
    // Create demo market trends
    const marketTrends = [
      {
        id: this.currentMarketTrendId++,
        careerTitle: "Full Stack Developer",
        month: "January 2025",
        jobOpenings: 5200,
        averageSalary: 95000,
        topSkillsInDemand: ["JavaScript", "React", "Node.js", "TypeScript", "AWS"],
        growthRate: 15,
        createdAt: new Date().toISOString(),
      },
      {
        id: this.currentMarketTrendId++,
        careerTitle: "Full Stack Developer",
        month: "February 2025",
        jobOpenings: 5500,
        averageSalary: 96000,
        topSkillsInDemand: ["JavaScript", "React", "Node.js", "TypeScript", "Docker"],
        growthRate: 14,
        createdAt: new Date().toISOString(),
      },
      {
        id: this.currentMarketTrendId++,
        careerTitle: "Full Stack Developer",
        month: "March 2025",
        jobOpenings: 5800,
        averageSalary: 97000,
        topSkillsInDemand: ["JavaScript", "React", "Node.js", "TypeScript", "Kubernetes"],
        growthRate: 16,
        createdAt: new Date().toISOString(),
      },
      {
        id: this.currentMarketTrendId++,
        careerTitle: "Data Scientist",
        month: "January 2025",
        jobOpenings: 3200,
        averageSalary: 105000,
        topSkillsInDemand: ["Python", "SQL", "Machine Learning", "TensorFlow", "AWS"],
        growthRate: 18,
        createdAt: new Date().toISOString(),
      },
      {
        id: this.currentMarketTrendId++,
        careerTitle: "Data Scientist",
        month: "February 2025",
        jobOpenings: 3400,
        averageSalary: 106000,
        topSkillsInDemand: ["Python", "SQL", "Machine Learning", "PyTorch", "Big Data"],
        growthRate: 19,
        createdAt: new Date().toISOString(),
      },
      {
        id: this.currentMarketTrendId++,
        careerTitle: "Data Scientist",
        month: "March 2025",
        jobOpenings: 3600,
        averageSalary: 107000,
        topSkillsInDemand: ["Python", "SQL", "Machine Learning", "Data Visualization", "Statistics"],
        growthRate: 20,
        createdAt: new Date().toISOString(),
      },
    ];
    
    for (const trend of marketTrends) {
      this.marketTrends.set(trend.id, trend);
    }
  }
  
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async createUser(userData) {
    const id = this.currentUserId++;
    const user = { 
      ...userData, 
      id,
      skills: userData.skills || [],
      interests: userData.interests || [],
      academicBackground: userData.academicBackground || {
        courses: [],
        projects: [],
        achievements: [],
      },
      createdAt: new Date().toISOString(),
    };
    
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id, userData) {
    const user = await this.getUser(id);
    
    if (!user) {
      return undefined;
    }
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    
    return updatedUser;
  }
  
  // Assessment operations
  async getAssessmentsByUserId(userId) {
    return Array.from(this.assessments.values()).filter(
      (assessment) => assessment.userId === userId
    );
  }
  
  async createAssessment(assessmentData) {
    const id = this.currentAssessmentId++;
    const assessment = { 
      ...assessmentData, 
      id,
      completedAt: new Date().toISOString(),
    };
    
    this.assessments.set(id, assessment);
    return assessment;
  }
  
  async updateAssessment(id, assessmentData) {
    const assessment = this.assessments.get(id);
    
    if (!assessment) {
      return undefined;
    }
    
    const updatedAssessment = { ...assessment, ...assessmentData };
    this.assessments.set(id, updatedAssessment);
    
    return updatedAssessment;
  }
  
  // Career Match operations
  async getCareerMatchesByUserId(userId) {
    return Array.from(this.careerMatches.values())
      .filter((match) => match.userId === userId)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  }
  
  async createCareerMatch(careerMatchData) {
    const id = this.currentCareerMatchId++;
    const careerMatch = { 
      ...careerMatchData, 
      id,
      createdAt: new Date().toISOString(),
    };
    
    this.careerMatches.set(id, careerMatch);
    return careerMatch;
  }
  
  // Skill Gap operations
  async getSkillGapsByUserId(userId) {
    return Array.from(this.skillGaps.values()).filter(
      (gap) => gap.userId === userId
    );
  }
  
  async createSkillGap(skillGapData) {
    const id = this.currentSkillGapId++;
    const skillGap = { 
      ...skillGapData, 
      id,
      createdAt: new Date().toISOString(),
    };
    
    this.skillGaps.set(id, skillGap);
    return skillGap;
  }
  
  async updateSkillGap(id, skillGapData) {
    const skillGap = this.skillGaps.get(id);
    
    if (!skillGap) {
      return undefined;
    }
    
    const updatedSkillGap = { ...skillGap, ...skillGapData };
    this.skillGaps.set(id, updatedSkillGap);
    
    return updatedSkillGap;
  }
  
  // Resource operations
  async getResourcesBySkillId(skillId) {
    return Array.from(this.resources.values()).filter(
      (resource) => resource.skillId === skillId
    );
  }
  
  async getAllResources() {
    return Array.from(this.resources.values());
  }
  
  async createResource(resourceData) {
    const id = this.currentResourceId++;
    const resource = { 
      ...resourceData, 
      id,
      createdAt: new Date().toISOString(),
    };
    
    this.resources.set(id, resource);
    return resource;
  }
  
  // Market Trend operations
  async getMarketTrends() {
    return Array.from(this.marketTrends.values());
  }
  
  async getMarketTrendsByCareer(careerTitle) {
    return Array.from(this.marketTrends.values())
      .filter((trend) => trend.careerTitle === careerTitle)
      .sort((a, b) => new Date(a.month) - new Date(b.month));
  }
  
  async createMarketTrend(marketTrendData) {
    const id = this.currentMarketTrendId++;
    const marketTrend = { 
      ...marketTrendData, 
      id,
      createdAt: new Date().toISOString(),
    };
    
    this.marketTrends.set(id, marketTrend);
    return marketTrend;
  }
}

// Create and export the storage instance
const storage = new MemStorage();

module.exports = { storage, MemStorage };