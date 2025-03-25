import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchIcon } from '@/components/ui/icons';
import CareerMatchCard from '@/components/dashboard/CareerMatchCard';
import type { User, CareerMatch } from '@shared/schema';

const CareerPaths: React.FC = () => {
  // In a real application, we would get the current user ID from authentication
  // For now, we'll use a hardcoded ID
  const userId = 1;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recommended');

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: [`/api/users/${userId}`],
  });

  const { data: careerMatches, isLoading: careersLoading } = useQuery<CareerMatch[]>({
    queryKey: [`/api/users/${userId}/career-matches`],
  });

  // Sample data for when we don't have real data yet
  const sampleCareerMatches = [
    {
      id: 1,
      userId: 1,
      title: "Data Scientist",
      matchPercentage: 95,
      salarRange: "₦5.2M - ₦12.8M",
      description: "Analyze complex data to inform business decisions using machine learning and statistical analysis. Strong growth potential in various industries.",
      requiredSkills: ["Python", "Machine Learning", "SQL", "Statistical Analysis"],
      demandStatus: "High Demand"
    },
    {
      id: 2,
      userId: 1,
      title: "UX/UI Designer",
      matchPercentage: 87,
      salarRange: "₦4.5M - ₦9.8M",
      description: "Design user-centered digital experiences through research, wireframing, and prototyping. Critical role in product development teams.",
      requiredSkills: ["User Research", "Figma", "Prototyping", "Visual Design"],
      demandStatus: "Growing Demand"
    },
    {
      id: 3,
      userId: 1,
      title: "Product Manager",
      matchPercentage: 82,
      salarRange: "₦6.5M - ₦15.2M",
      description: "Lead product development from conception to launch, balancing business objectives with user needs. Cross-functional leadership role.",
      requiredSkills: ["Market Research", "Stakeholder Management", "Agile", "Data Analysis"],
      demandStatus: "High Demand"
    },
    {
      id: 4,
      userId: 1,
      title: "Software Engineer",
      matchPercentage: 79,
      salarRange: "₦4.8M - ₦11.5M",
      description: "Design, develop and maintain software systems and applications. Apply engineering principles to create efficient and scalable solutions.",
      requiredSkills: ["JavaScript", "React", "Node.js", "System Design"],
      demandStatus: "High Demand"
    },
    {
      id: 5,
      userId: 1,
      title: "Business Analyst",
      matchPercentage: 75,
      salarRange: "₦4.2M - ₦9.5M",
      description: "Bridge the gap between business and IT by analyzing data, documenting requirements, and recommending solutions to business problems.",
      requiredSkills: ["Data Analysis", "SQL", "Requirements Gathering", "Communication"],
      demandStatus: "Stable"
    },
    {
      id: 6,
      userId: 1,
      title: "Digital Marketing Specialist",
      matchPercentage: 68,
      salarRange: "₦3.8M - ₦8.5M",
      description: "Create and implement digital marketing strategies across various channels to increase brand awareness, engagement, and conversions.",
      requiredSkills: ["Social Media", "SEO", "Content Creation", "Analytics"],
      demandStatus: "Growing Demand"
    }
  ];

  // Additional sample data for emerging careers
  const emergingCareers = [
    {
      id: 7,
      userId: 1,
      title: "AI Ethics Specialist",
      matchPercentage: 73,
      salarRange: "₦5.5M - ₦12.0M",
      description: "Ensure AI systems are designed and deployed ethically, addressing issues of bias, fairness, transparency, and accountability.",
      requiredSkills: ["Ethics", "AI/ML Knowledge", "Policy Development", "Critical Thinking"],
      demandStatus: "Emerging Field"
    },
    {
      id: 8,
      userId: 1,
      title: "Cybersecurity Analyst",
      matchPercentage: 78,
      salarRange: "₦5.0M - ₦13.5M",
      description: "Protect systems and networks from digital attacks by identifying vulnerabilities and implementing security measures.",
      requiredSkills: ["Network Security", "Threat Analysis", "Security Tools", "Incident Response"],
      demandStatus: "High Demand"
    },
    {
      id: 9,
      userId: 1,
      title: "Sustainability Consultant",
      matchPercentage: 65,
      salarRange: "₦4.5M - ₦10.0M",
      description: "Help organizations improve their environmental impact and develop sustainable business practices.",
      requiredSkills: ["Environmental Science", "Business Analysis", "Reporting", "Project Management"],
      demandStatus: "Growing Demand"
    }
  ];

  // Use real data if available, otherwise use sample data
  const displayMatches = careerMatches && careerMatches.length > 0 ? careerMatches : sampleCareerMatches;

  // Filter based on search query and active tab
  const filteredCareers = displayMatches
    .filter(career => 
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(career => {
      if (activeTab === 'recommended') return career.matchPercentage >= 75;
      if (activeTab === 'trending') return career.demandStatus === 'High Demand' || career.demandStatus === 'Growing Demand';
      return true; // 'all' tab shows all careers
    });

  // Get careers to display based on active tab
  const getCareersToDisplay = () => {
    if (activeTab === 'emerging') return emergingCareers;
    return filteredCareers;
  };

  const handleExplore = (id: number) => {
    console.log(`Exploring career with ID: ${id}`);
    // In a real application, we might navigate to a career details page
  };

  return (
    <DashboardLayout title="Career Paths" userName={userLoading || !user ? "Olivia Davis" : user.fullName}>
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Explore Career Opportunities</CardTitle>
            <CardDescription>
              Discover career paths that match your skills, interests, and academic background.
              Explore detailed information about each career including required skills, salary ranges, and job market demand.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search for careers, skills, or industries..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="whitespace-nowrap">Find Careers</Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="recommended" onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Career Matches</h2>
            <TabsList>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="emerging">Emerging</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="recommended" className="mt-0">
            {careersLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-5 h-80 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-16 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : getCareersToDisplay().length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <p className="text-gray-500 mb-2">No careers match your current search.</p>
                <p className="text-sm text-gray-400">Try adjusting your search terms or explore all careers.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCareersToDisplay().map((career) => (
                  <CareerMatchCard
                    key={career.id}
                    title={career.title}
                    matchPercentage={career.matchPercentage}
                    salaryRange={career.salarRange || "₦3.5M - ₦8.0M"}
                    description={career.description || ""}
                    requiredSkills={career.requiredSkills || []}
                    demandStatus={career.demandStatus || "Stable"}
                    onExplore={() => handleExplore(career.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="trending" className="mt-0">
            {careersLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-5 h-80 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-16 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : getCareersToDisplay().length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <p className="text-gray-500 mb-2">No trending careers match your current search.</p>
                <p className="text-sm text-gray-400">Try adjusting your search terms or explore all careers.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCareersToDisplay().map((career) => (
                  <CareerMatchCard
                    key={career.id}
                    title={career.title}
                    matchPercentage={career.matchPercentage}
                    salaryRange={career.salarRange || "₦3.5M - ₦8.0M"}
                    description={career.description || ""}
                    requiredSkills={career.requiredSkills || []}
                    demandStatus={career.demandStatus || "Stable"}
                    onExplore={() => handleExplore(career.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="emerging" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergingCareers.map((career) => (
                <CareerMatchCard
                  key={career.id}
                  title={career.title}
                  matchPercentage={career.matchPercentage}
                  salaryRange={career.salarRange || "₦3.5M - ₦8.0M"}
                  description={career.description || ""}
                  requiredSkills={career.requiredSkills || []}
                  demandStatus={career.demandStatus || "Emerging Field"}
                  onExplore={() => handleExplore(career.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-0">
            {careersLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-5 h-80 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-16 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredCareers.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <p className="text-gray-500 mb-2">No careers match your current search.</p>
                <p className="text-sm text-gray-400">Try adjusting your search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCareers.map((career) => (
                  <CareerMatchCard
                    key={career.id}
                    title={career.title}
                    matchPercentage={career.matchPercentage}
                    salaryRange={career.salarRange || "₦3.5M - ₦8.0M"}
                    description={career.description || ""}
                    requiredSkills={career.requiredSkills || []}
                    demandStatus={career.demandStatus || "Stable"}
                    onExplore={() => handleExplore(career.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CareerPaths;
