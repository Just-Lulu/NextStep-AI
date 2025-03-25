import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Search, BookOpen, Video, Globe, 
  FileText, Award, ArrowUpRight, Bookmark, 
  Clock, ExternalLink, Check
} from "lucide-react";

export default function SkillDevelopment() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  
  // Fetch user's skill gaps
  const { data: skillGaps, isLoading: isLoadingSkillGaps } = useQuery({
    queryKey: ["/api/users", user?.id, "skill-gaps"],
    enabled: !!user?.id,
  });
  
  // Fetch resources (would be filtered by skill ID in a real app)
  const { data: resources, isLoading: isLoadingResources } = useQuery({
    queryKey: ["/api/resources"],
    enabled: true,
  });
  
  // Filter skills based on search query
  const filteredSkillGaps = skillGaps ? 
    skillGaps.filter(gap => 
      gap.skill.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];
  
  // Filter resources based on selected skill
  const filteredResources = resources && selectedSkill ? 
    resources.filter(resource => resource.skillId === selectedSkill.id) : 
    resources || [];
  
  // Organize resources by type
  const groupedResources = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {});
  
  // Handle skill selection
  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
  };
  
  // Calculate completion percentage (placeholder)
  const calculateProgress = (skill) => {
    return skill.currentLevel * 20; // Convert level 1-5 to percentage
  };
  
  // Get resource icon based on type
  const getResourceIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'tutorial':
        return <FileText className="h-4 w-4" />;
      case 'book':
        return <BookOpen className="h-4 w-4" />;
      case 'website':
        return <Globe className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };
  
  return (
    <DashboardLayout title="Skill Development" userName={user?.fullName}>
      <div className="space-y-6">
        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skill List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Skills to Develop</h2>
            
            {filteredSkillGaps && filteredSkillGaps.length > 0 ? (
              <div className="space-y-3">
                {filteredSkillGaps.map((skill) => (
                  <Card 
                    key={skill.id}
                    className={`cursor-pointer transition-all ${
                      selectedSkill?.id === skill.id ? "border-primary ring-1 ring-primary" : ""
                    }`}
                    onClick={() => handleSkillSelect(skill)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{skill.skill}</h3>
                        {skill.targetCareer && (
                          <Badge variant="outline" className="text-xs">
                            {skill.targetCareer}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Current Level</span>
                          <span>{skill.currentLevel}/5</span>
                        </div>
                        <Progress value={calculateProgress(skill)} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-4 text-center">
                <Award className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-medium mb-1">No Skills Found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? 
                    "No skills match your search query." : 
                    "Take assessments to identify skills to develop."}
                </p>
                {!searchQuery && (
                  <Button size="sm" className="mt-3" asChild>
                    <a href="/assessments">Take Assessment</a>
                  </Button>
                )}
              </Card>
            )}
          </div>
          
          {/* Learning Resources */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>
                  {selectedSkill ? `${selectedSkill.skill} Resources` : "Learning Resources"}
                </CardTitle>
                <CardDescription>
                  {selectedSkill ? 
                    `Resources to help you improve your ${selectedSkill.skill} skills` : 
                    "Select a skill to view recommended learning resources"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedSkill ? (
                  <Tabs defaultValue="all" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      {Object.keys(groupedResources).map((type) => (
                        <TabsTrigger key={type} value={type.toLowerCase()}>
                          {type}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    <TabsContent value="all" className="space-y-6">
                      {Object.keys(groupedResources).length > 0 ? (
                        Object.entries(groupedResources).map(([type, items]) => (
                          <div key={type}>
                            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                              {getResourceIcon(type)}
                              {type}
                            </h3>
                            <div className="space-y-3">
                              {items.map((resource) => (
                                <ResourceCard key={resource.id} resource={resource} />
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                          <h3 className="font-medium text-lg mb-2">No Resources Available</h3>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            We're still gathering the best learning resources for this skill.
                            Check back soon or try another skill.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                    
                    {Object.entries(groupedResources).map(([type, items]) => (
                      <TabsContent key={type} value={type.toLowerCase()} className="space-y-4">
                        {items.map((resource) => (
                          <ResourceCard key={resource.id} resource={resource} />
                        ))}
                      </TabsContent>
                    ))}
                  </Tabs>
                ) : (
                  <div className="text-center py-12">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-lg mb-2">Select a Skill</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Choose a skill from the list to view recommended learning resources
                      and start your skill development journey.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Resource Card Component
function ResourceCard({ resource }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  const toggleBookmark = (e) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };
  
  const toggleCompleted = (e) => {
    e.stopPropagation();
    setCompleted(!completed);
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="flex border-b">
        <div className={`w-1 ${resource.type === 'Course' ? 'bg-blue-500' : 
                                resource.type === 'Tutorial' ? 'bg-green-500' : 
                                resource.type === 'Book' ? 'bg-amber-500' : 
                                resource.type === 'Video' ? 'bg-red-500' : 'bg-purple-500'}`} />
        <div className="p-4 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className={`font-medium ${completed ? 'line-through text-muted-foreground' : ''}`}>
                {resource.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={toggleBookmark}
              >
                <Bookmark 
                  className={`h-4 w-4 ${bookmarked ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={toggleCompleted}
              >
                <Check 
                  className={`h-4 w-4 ${completed ? 'text-green-500' : 'text-muted-foreground'}`}
                />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-3">
            <Badge variant="outline" className="text-xs font-normal">
              {resource.type}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {resource.type === 'Course' ? '4-6 weeks' : 
               resource.type === 'Tutorial' ? '1-2 hours' : 
               resource.type === 'Book' ? '10-15 hours' : 
               resource.type === 'Video' ? '30-60 mins' : 'Varies'}
            </span>
          </div>
          
          {resource.link && (
            <div className="mt-3">
              <Button size="sm" variant="outline" className="text-xs gap-1" asChild>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                  Open Resource
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}