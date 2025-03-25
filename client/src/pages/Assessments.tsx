import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SkillAssessment from '@/components/assessment/SkillAssessment';
import { ArrowRightIcon, FileListIcon, UserHeartIcon, PresentationIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import type { User, Assessment } from '@shared/schema';

const Assessments: React.FC = () => {
  // In a real application, we would get the current user ID from authentication
  // For now, we'll use a hardcoded ID
  const userId = 1;
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: [`/api/users/${userId}`],
  });

  const { data: assessments, isLoading: assessmentsLoading } = useQuery<Assessment[]>({
    queryKey: [`/api/users/${userId}/assessments`],
  });

  // Helper function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Helper function to get the icon based on assessment type
  const getIcon = (type: string) => {
    switch (type) {
      case 'technical':
        return <FileListIcon className="h-6 w-6" />;
      case 'soft':
        return <UserHeartIcon className="h-6 w-6" />;
      case 'career':
        return <PresentationIcon className="h-6 w-6" />;
      default:
        return <FileListIcon className="h-6 w-6" />;
    }
  };

  // Helper function to get the background color based on assessment type
  const getIconBg = (type: string) => {
    switch (type) {
      case 'technical':
        return 'bg-blue-100 text-primary';
      case 'soft':
        return 'bg-purple-100 text-accent';
      case 'career':
        return 'bg-green-100 text-secondary';
      default:
        return 'bg-blue-100 text-primary';
    }
  };

  // Sample data for when we don't have real data yet
  const sampleAssessments = [
    {
      id: 1,
      userId: 1,
      title: "Technical Skills Assessment",
      type: "technical",
      description: "Programming & Data Analysis",
      date: new Date("2023-10-15T10:00:00").toISOString(),
      duration: 45,
      status: "scheduled"
    },
    {
      id: 2,
      userId: 1,
      title: "Soft Skills Assessment",
      type: "soft",
      description: "Communication & Leadership",
      date: new Date("2023-10-18T14:30:00").toISOString(),
      duration: 30,
      status: "scheduled"
    },
    {
      id: 3,
      userId: 1,
      title: "Career Preference Assessment",
      type: "career",
      description: "Work Style & Environment",
      date: new Date("2023-10-12T11:15:00").toISOString(),
      duration: 25,
      status: "completed"
    }
  ];

  // Use real data if available, otherwise use sample data
  const displayAssessments = assessments && assessments.length > 0 ? assessments : sampleAssessments;

  // Filter assessments based on active tab
  const filteredAssessments = displayAssessments.filter(assessment => {
    if (activeTab === 'upcoming') return assessment.status === 'scheduled';
    if (activeTab === 'completed') return assessment.status === 'completed';
    return true;
  });

  const handleStartAssessment = (type: string) => {
    setSelectedAssessment(type);
  };

  const handleAssessmentComplete = (results: any) => {
    console.log('Assessment completed with results:', results);
    setSelectedAssessment(null);
    // In a real application, we would refresh the assessments data here
  };

  return (
    <DashboardLayout title="Assessments" userName={userLoading || !user ? "Olivia Davis" : user.fullName}>
      <div className="max-w-5xl mx-auto">
        {selectedAssessment ? (
          <SkillAssessment 
            type={selectedAssessment as 'technical' | 'soft' | 'career'} 
            userId={userId}
            onComplete={handleAssessmentComplete}
          />
        ) : (
          <>
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Assessment Center</CardTitle>
                  <CardDescription>
                    Complete assessments to help us understand your skills, preferences, 
                    and career aspirations for more tailored recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-2 border-primary/20 hover:border-primary transition-colors">
                      <CardHeader className="pb-2">
                        <div className={`w-12 h-12 rounded-lg ${getIconBg('technical')} flex items-center justify-center mb-2`}>
                          <FileListIcon />
                        </div>
                        <CardTitle className="text-lg">Technical Skills</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          Evaluate your programming, data analysis, and technical proficiencies.
                        </p>
                        <Button 
                          onClick={() => handleStartAssessment('technical')}
                          className="w-full"
                        >
                          Start Assessment <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-accent/20 hover:border-accent transition-colors">
                      <CardHeader className="pb-2">
                        <div className={`w-12 h-12 rounded-lg ${getIconBg('soft')} flex items-center justify-center mb-2`}>
                          <UserHeartIcon />
                        </div>
                        <CardTitle className="text-lg">Soft Skills</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          Assess your communication, leadership, and interpersonal abilities.
                        </p>
                        <Button 
                          onClick={() => handleStartAssessment('soft')}
                          variant="outline"
                          className="w-full border-accent text-accent hover:bg-accent/10"
                        >
                          Start Assessment <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-secondary/20 hover:border-secondary transition-colors">
                      <CardHeader className="pb-2">
                        <div className={`w-12 h-12 rounded-lg ${getIconBg('career')} flex items-center justify-center mb-2`}>
                          <PresentationIcon />
                        </div>
                        <CardTitle className="text-lg">Career Preferences</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          Discover your ideal work environment and career path alignment.
                        </p>
                        <Button 
                          onClick={() => handleStartAssessment('career')}
                          variant="outline"
                          className="w-full border-secondary text-secondary hover:bg-secondary/10"
                        >
                          Start Assessment <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Your Assessments</h2>
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="upcoming" className="mt-0">
                <Card>
                  <CardContent className="pt-6">
                    {assessmentsLoading ? (
                      <div className="h-48 flex items-center justify-center">
                        <p className="text-gray-500">Loading assessments...</p>
                      </div>
                    ) : filteredAssessments.length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="text-gray-500">No upcoming assessments found.</p>
                        <p className="text-sm text-gray-400 mt-2">Start a new assessment from the options above.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredAssessments.map((assessment) => (
                          <div 
                            key={assessment.id}
                            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center"
                          >
                            <div className="flex items-start">
                              <div className={`flex-shrink-0 h-10 w-10 rounded-lg ${getIconBg(assessment.type)} flex items-center justify-center`}>
                                {getIcon(assessment.type)}
                              </div>
                              <div className="ml-4">
                                <h3 className="text-base font-medium text-gray-800">{assessment.title}</h3>
                                <p className="text-sm text-gray-600">{assessment.description}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {formatDate(assessment.date)} • {assessment.duration} minutes
                                </p>
                              </div>
                            </div>
                            <Button 
                              onClick={() => handleStartAssessment(assessment.type)}
                              variant={assessment.type === 'technical' ? 'default' : 'outline'}
                              className={assessment.type === 'soft' ? 'border-accent text-accent hover:bg-accent/10' : 
                                         assessment.type === 'career' ? 'border-secondary text-secondary hover:bg-secondary/10' : ''}
                            >
                              Start Now
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                <Card>
                  <CardContent className="pt-6">
                    {assessmentsLoading ? (
                      <div className="h-48 flex items-center justify-center">
                        <p className="text-gray-500">Loading assessments...</p>
                      </div>
                    ) : filteredAssessments.length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="text-gray-500">No completed assessments found.</p>
                        <p className="text-sm text-gray-400 mt-2">Start a new assessment from the options above.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredAssessments.map((assessment) => (
                          <div 
                            key={assessment.id}
                            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center"
                          >
                            <div className="flex items-start">
                              <div className={`flex-shrink-0 h-10 w-10 rounded-lg ${getIconBg(assessment.type)} flex items-center justify-center`}>
                                {getIcon(assessment.type)}
                              </div>
                              <div className="ml-4">
                                <h3 className="text-base font-medium text-gray-800">{assessment.title}</h3>
                                <p className="text-sm text-gray-600">{assessment.description}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Completed on {formatDate(assessment.date)}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline">
                              View Results
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="all" className="mt-0">
                <Card>
                  <CardContent className="pt-6">
                    {assessmentsLoading ? (
                      <div className="h-48 flex items-center justify-center">
                        <p className="text-gray-500">Loading assessments...</p>
                      </div>
                    ) : filteredAssessments.length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="text-gray-500">No assessments found.</p>
                        <p className="text-sm text-gray-400 mt-2">Start a new assessment from the options above.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredAssessments.map((assessment) => (
                          <div 
                            key={assessment.id}
                            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center"
                          >
                            <div className="flex items-start">
                              <div className={`flex-shrink-0 h-10 w-10 rounded-lg ${getIconBg(assessment.type)} flex items-center justify-center`}>
                                {getIcon(assessment.type)}
                              </div>
                              <div className="ml-4">
                                <h3 className="text-base font-medium text-gray-800">{assessment.title}</h3>
                                <p className="text-sm text-gray-600">{assessment.description}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {assessment.status === 'completed' ? 
                                    `Completed on ${formatDate(assessment.date)}` : 
                                    `Scheduled for ${formatDate(assessment.date)} • ${assessment.duration} minutes`}
                                </p>
                              </div>
                            </div>
                            <Button 
                              variant={assessment.status === 'completed' ? 'outline' : 'default'}
                              onClick={() => {
                                if (assessment.status !== 'completed') {
                                  handleStartAssessment(assessment.type);
                                }
                              }}
                            >
                              {assessment.status === 'completed' ? 'View Results' : 'Start Now'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Assessments;
