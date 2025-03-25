import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/layouts/DashboardLayout";
import SkillAssessment from "@/components/assessment/SkillAssessment";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PresentationIcon, FileListIcon, UserHeartIcon } from "@/components/ui/icons";

export default function Assessments() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("intro");
  const [assessmentType, setAssessmentType] = useState(null);
  
  const handleStartAssessment = (type) => {
    setAssessmentType(type);
    setActiveTab("assessment");
  };
  
  const handleAssessmentComplete = (results) => {
    // After assessment is completed, we could:
    // 1. Save the results
    // 2. Show a summary
    // 3. Redirect to recommendations
    console.log("Assessment completed with results:", results);
    setActiveTab("completed");
  };
  
  return (
    <DashboardLayout title="Skill Assessments" userName={user?.fullName}>
      <div className="max-w-4xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="intro">Introduction</TabsTrigger>
            <TabsTrigger value="assessment" disabled={!assessmentType}>Assessment</TabsTrigger>
            <TabsTrigger value="completed" disabled={activeTab !== "completed"}>Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="intro">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Skill Assessments</CardTitle>
                <CardDescription>
                  Complete these assessments to help us understand your skills and interests better
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <PresentationIcon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">Technical Skills</CardTitle>
                      <CardDescription>
                        Assess your programming, data analysis, and other technical abilities
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button onClick={() => handleStartAssessment("technical")} className="w-full">
                        Start Assessment
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <UserHeartIcon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">Soft Skills</CardTitle>
                      <CardDescription>
                        Evaluate your communication, teamwork, and leadership skills
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button onClick={() => handleStartAssessment("soft")} className="w-full">
                        Start Assessment
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <FileListIcon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">Career Preferences</CardTitle>
                      <CardDescription>
                        Share your career interests, work environment preferences, and goals
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button onClick={() => handleStartAssessment("career")} className="w-full">
                        Start Assessment
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="assessment">
            {assessmentType && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {assessmentType === "technical" && "Technical Skills Assessment"}
                    {assessmentType === "soft" && "Soft Skills Assessment"}
                    {assessmentType === "career" && "Career Preferences Assessment"}
                  </CardTitle>
                  <CardDescription>
                    {assessmentType === "technical" && "Evaluate your technical abilities and proficiency in various technologies"}
                    {assessmentType === "soft" && "Assess your interpersonal and professional skills"}
                    {assessmentType === "career" && "Help us understand your career goals and preferences"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SkillAssessment 
                    type={assessmentType} 
                    userId={user?.id} 
                    onComplete={handleAssessmentComplete} 
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Assessment Completed!</CardTitle>
                <CardDescription>
                  Thank you for completing the assessment. Your results are being analyzed.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="max-w-md mx-auto">
                  <p className="text-muted-foreground mb-6">
                    Based on your assessment, we'll generate personalized career recommendations 
                    and identify potential skill gaps for your desired career path.
                  </p>
                  
                  <div className="flex flex-col gap-2">
                    <Button onClick={() => setActiveTab("intro")}>
                      Take Another Assessment
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/">View Dashboard</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}