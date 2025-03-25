import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchIcon, BookIcon, DatabaseIcon, LineChartIcon } from '@/components/ui/icons';
import type { User, SkillGap, Resource } from '@shared/schema';

const SkillDevelopment: React.FC = () => {
  // In a real application, we would get the current user ID from authentication
  // For now, we'll use a hardcoded ID
  const userId = 1;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recommended');

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: [`/api/users/${userId}`],
  });

  const { data: skillGaps, isLoading: skillsLoading } = useQuery<SkillGap[]>({
    queryKey: [`/api/users/${userId}/skill-gaps`],
  });

  const { data: resources, isLoading: resourcesLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
  });

  // Sample data when we don't have real data yet
  const sampleSkillGaps = [
    { id: 1, userId: 1, skill: "Machine Learning", currentLevel: 65, targetCareer: "Data Scientist" },
    { id: 2, userId: 1, skill: "Statistical Analysis", currentLevel: 80, targetCareer: "Data Scientist" },
    { id: 3, userId: 1, skill: "Python Programming", currentLevel: 40, targetCareer: "Data Scientist" },
    { id: 4, userId: 1, skill: "SQL & Database Management", currentLevel: 25, targetCareer: "Data Scientist" },
    { id: 5, userId: 1, skill: "Data Visualization", currentLevel: 60, targetCareer: "Data Scientist" },
    { id: 6, userId: 1, skill: "Product Management", currentLevel: 45, targetCareer: "Product Manager" },
    { id: 7, userId: 1, skill: "UX Research", currentLevel: 55, targetCareer: "UX/UI Designer" },
    { id: 8, userId: 1, skill: "Stakeholder Management", currentLevel: 70, targetCareer: "Product Manager" }
  ];

  const sampleResources = [
    { 
      id: 1, 
      title: "Python for Data Science", 
      type: "course", 
      description: "Comprehensive course covering Python fundamentals for data analysis",
      link: "#",
      skillId: 3
    },
    { 
      id: 2, 
      title: "SQL Fundamentals", 
      type: "course", 
      description: "Learn database management and SQL queries for data analysis",
      link: "#",
      skillId: 4
    },
    { 
      id: 3, 
      title: "Introduction to Machine Learning", 
      type: "course", 
      description: "Master the basics of machine learning algorithms and applications",
      link: "#",
      skillId: 1
    },
    { 
      id: 4, 
      title: "Statistical Analysis with R", 
      type: "tutorial", 
      description: "Practice statistical techniques using R programming language",
      link: "#",
      skillId: 2
    },
    { 
      id: 5, 
      title: "Data Visualization with Tableau", 
      type: "workshop", 
      description: "Create compelling visual data stories using Tableau",
      link: "#",
      skillId: 5
    },
    { 
      id: 6, 
      title: "Agile Product Management", 
      type: "course", 
      description: "Learn agile methodologies for effective product management",
      link: "#",
      skillId: 6
    },
    { 
      id: 7, 
      title: "Practical UX Research Methods", 
      type: "workshop", 
      description: "Hands-on workshop on conducting effective user research",
      link: "#",
      skillId: 7
    },
    { 
      id: 8, 
      title: "Stakeholder Communication", 
      type: "tutorial", 
      description: "Effective techniques for managing stakeholder expectations",
      link: "#",
      skillId: 8
    }
  ];

  // Use real data if available, otherwise use sample data
  const displaySkillGaps = skillGaps && skillGaps.length > 0 ? skillGaps : sampleSkillGaps;
  const displayResources = resources && resources.length > 0 ? resources : sampleResources;

  // Helper function to determine progress color based on skill level
  const getProgressColor = (level: number) => {
    if (level >= 70) return "bg-primary";
    if (level >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  // Helper function to get the icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookIcon className="h-6 w-6" />;
      case 'tutorial':
        return <DatabaseIcon className="h-6 w-6" />;
      case 'workshop':
        return <LineChartIcon className="h-6 w-6" />;
      default:
        return <BookIcon className="h-6 w-6" />;
    }
  };

  // Helper function to get the background color based on resource type
  const getResourceIconBg = (type: string) => {
    switch (type) {
      case 'course':
        return 'bg-blue-100 text-primary';
      case 'tutorial':
        return 'bg-purple-100 text-accent';
      case 'workshop':
        return 'bg-green-100 text-secondary';
      default:
        return 'bg-blue-100 text-primary';
    }
  };

  // Filter resources based on search query and active tab
  const filteredResources = displayResources
    .filter(resource => 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(resource => {
      const targetSkill = displaySkillGaps.find(sg => sg.id === resource.skillId);
      if (activeTab === 'recommended' && targetSkill) {
        return targetSkill.currentLevel < 50; // Recommend resources for low-level skills
      }
      return true; // 'all' tab shows all resources
    });

  return (
    <DashboardLayout title="Skill Development" userName={userLoading || !user ? "Olivia Davis" : user.fullName}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Skill Gap Analysis</CardTitle>
                <CardDescription>
                  Track your current skill levels for your target career paths
                </CardDescription>
              </CardHeader>
              <CardContent>
                {skillsLoading ? (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-4 bg-gray-200 rounded w-8"></div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {displaySkillGaps.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                            <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {skill.targetCareer}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{skill.currentLevel}%</span>
                        </div>
                        <Progress 
                          value={skill.currentLevel} 
                          className="h-2.5 bg-gray-200" 
                          indicatorClassName={getProgressColor(skill.currentLevel)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Update Skills
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Learning Resources</CardTitle>
                <CardDescription>
                  Discover courses, tutorials, and workshops to develop your skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder="Search for resources, skills, or topics..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="whitespace-nowrap">Find Resources</Button>
                </div>

                <Tabs defaultValue="recommended" onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="recommended">Recommended</TabsTrigger>
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                  </TabsList>

                  <TabsContent value="recommended" className="mt-0">
                    {resourcesLoading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="p-4 border border-gray-200 rounded-lg animate-pulse">
                            <div className="flex items-start">
                              <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                              <div className="ml-3 w-full">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : filteredResources.length === 0 ? (
                      <div className="p-8 text-center">
                        <p className="text-gray-500 mb-2">No resources match your current search.</p>
                        <p className="text-sm text-gray-400">Try adjusting your search terms or explore all resources.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredResources.map((resource) => (
                          <a href={resource.link || "#"} key={resource.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors block">
                            <div className="flex items-start">
                              <div className={`flex-shrink-0 h-10 w-10 rounded-md ${getResourceIconBg(resource.type)} flex items-center justify-center`}>
                                {getResourceIcon(resource.type)}
                              </div>
                              <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-800">{resource.title}</h4>
                                <p className="text-xs text-gray-500 mt-1">{resource.description}</p>
                                <div className="flex items-center mt-2">
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                                  </span>
                                  {resource.skillId && (
                                    <span className="ml-2 text-xs bg-blue-50 text-primary px-2 py-0.5 rounded">
                                      {displaySkillGaps.find(s => s.id === resource.skillId)?.skill || ''}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="courses" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayResources
                        .filter(r => r.type === 'course')
                        .filter(r => 
                          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.description.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((resource) => (
                          <a href={resource.link || "#"} key={resource.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors block">
                            <div className="flex items-start">
                              <div className={`flex-shrink-0 h-10 w-10 rounded-md ${getResourceIconBg(resource.type)} flex items-center justify-center`}>
                                {getResourceIcon(resource.type)}
                              </div>
                              <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-800">{resource.title}</h4>
                                <p className="text-xs text-gray-500 mt-1">{resource.description}</p>
                                <div className="flex items-center mt-2">
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                    Course
                                  </span>
                                  {resource.skillId && (
                                    <span className="ml-2 text-xs bg-blue-50 text-primary px-2 py-0.5 rounded">
                                      {displaySkillGaps.find(s => s.id === resource.skillId)?.skill || ''}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </a>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="tutorials" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayResources
                        .filter(r => r.type === 'tutorial')
                        .filter(r => 
                          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.description.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((resource) => (
                          <a href={resource.link || "#"} key={resource.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors block">
                            <div className="flex items-start">
                              <div className={`flex-shrink-0 h-10 w-10 rounded-md ${getResourceIconBg(resource.type)} flex items-center justify-center`}>
                                {getResourceIcon(resource.type)}
                              </div>
                              <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-800">{resource.title}</h4>
                                <p className="text-xs text-gray-500 mt-1">{resource.description}</p>
                                <div className="flex items-center mt-2">
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                    Tutorial
                                  </span>
                                  {resource.skillId && (
                                    <span className="ml-2 text-xs bg-blue-50 text-primary px-2 py-0.5 rounded">
                                      {displaySkillGaps.find(s => s.id === resource.skillId)?.skill || ''}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </a>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="all" className="mt-0">
                    {resourcesLoading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="p-4 border border-gray-200 rounded-lg animate-pulse">
                            <div className="flex items-start">
                              <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                              <div className="ml-3 w-full">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {displayResources
                          .filter(r => 
                            r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            r.description.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((resource) => (
                            <a href={resource.link || "#"} key={resource.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors block">
                              <div className="flex items-start">
                                <div className={`flex-shrink-0 h-10 w-10 rounded-md ${getResourceIconBg(resource.type)} flex items-center justify-center`}>
                                  {getResourceIcon(resource.type)}
                                </div>
                                <div className="ml-3">
                                  <h4 className="text-sm font-medium text-gray-800">{resource.title}</h4>
                                  <p className="text-xs text-gray-500 mt-1">{resource.description}</p>
                                  <div className="flex items-center mt-2">
                                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                                    </span>
                                    {resource.skillId && (
                                      <span className="ml-2 text-xs bg-blue-50 text-primary px-2 py-0.5 rounded">
                                        {displaySkillGaps.find(s => s.id === resource.skillId)?.skill || ''}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </a>
                          ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Learning Path</CardTitle>
            <CardDescription>
              Follow a structured learning path to achieve your career goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-primary">
                    <span className="font-bold">1</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium text-gray-800">Foundations of Data Science</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Master the core skills needed for a career in data science, including Python programming,
                      statistics, and data visualization.
                    </p>
                    <div className="mt-4 space-y-2">
                      <a href="#" className="flex items-center p-2 border border-gray-200 rounded bg-white hover:bg-blue-50 transition-colors">
                        <BookIcon className="h-5 w-5 text-primary mr-3" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Python for Data Science</h4>
                          <p className="text-xs text-gray-500">Estimated completion: 4 weeks</p>
                        </div>
                      </a>
                      <a href="#" className="flex items-center p-2 border border-gray-200 rounded bg-white hover:bg-blue-50 transition-colors">
                        <DatabaseIcon className="h-5 w-5 text-accent mr-3" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">SQL Fundamentals</h4>
                          <p className="text-xs text-gray-500">Estimated completion: 3 weeks</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center text-accent">
                    <span className="font-bold">2</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium text-gray-800">Advanced Data Analysis</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Develop expertise in machine learning algorithms, statistical analysis, and data modeling.
                    </p>
                    <div className="mt-4 space-y-2">
                      <a href="#" className="flex items-center p-2 border border-gray-200 rounded bg-white hover:bg-purple-50 transition-colors">
                        <BookIcon className="h-5 w-5 text-accent mr-3" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Introduction to Machine Learning</h4>
                          <p className="text-xs text-gray-500">Estimated completion: 6 weeks</p>
                        </div>
                      </a>
                      <a href="#" className="flex items-center p-2 border border-gray-200 rounded bg-white hover:bg-purple-50 transition-colors">
                        <LineChartIcon className="h-5 w-5 text-accent mr-3" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Statistical Analysis with R</h4>
                          <p className="text-xs text-gray-500">Estimated completion: 5 weeks</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg opacity-60">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-500">
                    <span className="font-bold">3</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium text-gray-800">Specialized Skills & Industry Applications</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Apply your skills to real-world scenarios and develop expertise in industry-specific applications.
                    </p>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        Unlock Next Level (Complete Previous Steps)
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SkillDevelopment;
