import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProfileForm from "@/components/profile/ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  
  const { data: assessments, isLoading: isLoadingAssessments } = useQuery({
    queryKey: ["/api/users", user?.id, "assessments"],
    enabled: !!user?.id,
  });
  
  return (
    <DashboardLayout title="Profile" userName={user?.fullName}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information and Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user ? (
                  <ProfileForm userId={user.id} defaultValues={{
                    fullName: user.fullName,
                    email: user.email,
                    department: user.department || "",
                    level: user.level || "",
                    skills: user.skills || [],
                    interests: user.interests || [],
                  }} />
                ) : (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Skills and Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="skills">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="interests">Interests</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="skills" className="pt-4">
                    <div className="flex flex-wrap gap-2">
                      {user && user.skills && user.skills.length > 0 ? (
                        user.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No skills added yet</p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="interests" className="pt-4">
                    <div className="flex flex-wrap gap-2">
                      {user && user.interests && user.interests.length > 0 ? (
                        user.interests.map((interest, index) => (
                          <Badge key={index} variant="outline">{interest}</Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No interests added yet</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Academic Background */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Background</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Courses</h3>
                    {user && user.academicBackground && user.academicBackground.courses && 
                     user.academicBackground.courses.length > 0 ? (
                      <ul className="text-sm list-disc list-inside space-y-1">
                        {user.academicBackground.courses.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No courses added yet</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Projects</h3>
                    {user && user.academicBackground && user.academicBackground.projects && 
                     user.academicBackground.projects.length > 0 ? (
                      <ul className="text-sm list-disc list-inside space-y-1">
                        {user.academicBackground.projects.map((project, index) => (
                          <li key={index}>{project}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No projects added yet</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Achievements</h3>
                    {user && user.academicBackground && user.academicBackground.achievements && 
                     user.academicBackground.achievements.length > 0 ? (
                      <ul className="text-sm list-disc list-inside space-y-1">
                        {user.academicBackground.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No achievements added yet</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}