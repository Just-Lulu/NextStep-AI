import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Search, BriefcaseIcon, TrendingUp, Award } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function CareerPaths() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCareer, setSelectedCareer] = useState(null);
  
  // Fetch user's career matches
  const { data: careerMatches, isLoading: isLoadingCareers } = useQuery({
    queryKey: ["/api/users", user?.id, "career-matches"],
    enabled: !!user?.id,
  });
  
  // Fetch user's skill gaps based on selectedCareer
  const { data: skillGaps, isLoading: isLoadingSkillGaps } = useQuery({
    queryKey: ["/api/users", user?.id, "skill-gaps"],
    enabled: !!user?.id,
  });
  
  // Filter careers based on search query
  const filteredCareers = careerMatches ? 
    careerMatches.filter(career => 
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];
  
  // Filter skill gaps based on selected career
  const filteredSkillGaps = skillGaps && selectedCareer ? 
    skillGaps.filter(gap => gap.targetCareer === selectedCareer.title) : [];
  
  // Handle career selection
  const handleCareerSelect = (career) => {
    setSelectedCareer(career);
  };
  
  return (
    <DashboardLayout title="Career Paths" userName={user?.fullName}>
      <div className="space-y-6">
        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search career paths..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Career List */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Recommended Career Paths</h2>
            {filteredCareers.length > 0 ? (
              <div className="space-y-4">
                {filteredCareers.map((career) => (
                  <Card 
                    key={career.id} 
                    className={`cursor-pointer transition-all ${
                      selectedCareer?.id === career.id ? "border-primary ring-1 ring-primary" : ""
                    }`}
                    onClick={() => handleCareerSelect(career)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{career.title}</CardTitle>
                        <Badge variant={career.demandStatus === "High demand" ? "default" : 
                                        career.demandStatus === "Growing" ? "success" : 
                                        career.demandStatus === "Stable" ? "secondary" : "outline"}>
                          {career.demandStatus}
                        </Badge>
                      </div>
                      <CardDescription>{career.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Match Score</span>
                          <span>{career.matchPercentage}%</span>
                        </div>
                        <Progress value={career.matchPercentage} className="h-2" />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {career.requiredSkills.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{career.salaryRange}</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{career.title}</DialogTitle>
                            <DialogDescription>{career.description}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <Tabs defaultValue="overview">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="skills">Required Skills</TabsTrigger>
                                <TabsTrigger value="market">Market Insight</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="overview" className="space-y-4 pt-4">
                                <div>
                                  <h3 className="font-medium">Job Description</h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {career.description}
                                  </p>
                                </div>
                                <div>
                                  <h3 className="font-medium">Salary Range</h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {career.salaryRange}
                                  </p>
                                </div>
                                <div>
                                  <h3 className="font-medium">Market Demand</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant={career.demandStatus === "High demand" ? "default" : 
                                                    career.demandStatus === "Growing" ? "success" : 
                                                    career.demandStatus === "Stable" ? "secondary" : "outline"}>
                                      {career.demandStatus}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                      {career.demandStatus === "High demand" ? "Excellent job prospects" : 
                                       career.demandStatus === "Growing" ? "Good job prospects" : 
                                       career.demandStatus === "Stable" ? "Stable job prospects" : 
                                       "Limited job prospects"}
                                    </span>
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="skills" className="pt-4">
                                <div className="space-y-4">
                                  <h3 className="font-medium">Required Skills</h3>
                                  <div className="grid grid-cols-2 gap-3">
                                    {career.requiredSkills.map((skill, index) => (
                                      <div key={index} className="flex items-center gap-2">
                                        <Award className="h-4 w-4 text-primary" />
                                        <span>{skill}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="market" className="pt-4">
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="font-medium">Market Trend</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                      <TrendingUp className="h-4 w-4 text-green-500" />
                                      <span className="text-sm">
                                        This field is {
                                          career.demandStatus === "High demand" ? "rapidly growing" : 
                                          career.demandStatus === "Growing" ? "growing steadily" : 
                                          career.demandStatus === "Stable" ? "stable" : "changing"
                                        }
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h3 className="font-medium">Industry Outlook</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {career.demandStatus === "High demand" ? 
                                        "This career has excellent long-term prospects with many job openings and competitive salaries." : 
                                       career.demandStatus === "Growing" ? 
                                        "This career shows good growth potential with increasing demand for professionals." : 
                                       career.demandStatus === "Stable" ? 
                                        "This career has a stable outlook with consistent demand for skilled professionals." : 
                                        "This career field is evolving. Stay updated with emerging technologies and skills."
                                      }
                                    </p>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-lg mb-2">No Career Matches Found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? 
                    "No careers match your search criteria. Try broadening your search." : 
                    "Complete your skills assessment to get personalized career recommendations."}
                </p>
                <Button className="mt-4" asChild>
                  <a href="/assessments">Take Assessment</a>
                </Button>
              </Card>
            )}
          </div>
          
          {/* Career Details */}
          <div>
            {selectedCareer ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{selectedCareer.title}</CardTitle>
                        <CardDescription>Match Score: {selectedCareer.matchPercentage}%</CardDescription>
                      </div>
                      <BriefcaseIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Skill Gap Analysis</h3>
                      {filteredSkillGaps.length > 0 ? (
                        <div className="space-y-3">
                          {filteredSkillGaps.map((gap) => (
                            <div key={gap.id}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{gap.skill}</span>
                                <span>Level {gap.currentLevel}/5</span>
                              </div>
                              <Progress value={gap.currentLevel * 20} className="h-2" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No skill gaps identified for this career yet.
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Salary Range</h3>
                      <p className="text-sm">{selectedCareer.salaryRange}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Market Demand</h3>
                      <Badge variant={selectedCareer.demandStatus === "High demand" ? "default" : 
                                      selectedCareer.demandStatus === "Growing" ? "success" : 
                                      selectedCareer.demandStatus === "Stable" ? "secondary" : "outline"}>
                        {selectedCareer.demandStatus}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href="/skill-development">Develop Required Skills</a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <Card className="p-6 text-center">
                <BriefcaseIcon className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-lg mb-2">Select a Career Path</h3>
                <p className="text-muted-foreground">
                  Click on a career from the list to view detailed information and skill requirements.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}