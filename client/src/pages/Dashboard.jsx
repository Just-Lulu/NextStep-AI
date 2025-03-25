import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/layouts/DashboardLayout";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import CareerMatchSection from "@/components/dashboard/CareerMatchSection";
import SkillGapAnalysis from "@/components/dashboard/SkillGapAnalysis";
import MarketTrendsVisualization from "@/components/dashboard/MarketTrendsVisualization";
import NextStepsSection from "@/components/dashboard/NextStepsSection";
import UpcomingAssessments from "@/components/dashboard/UpcomingAssessments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RoadMapIcon, SurveyIcon, ProfileIcon } from "@/components/ui/icons";

export default function Dashboard() {
  const { user } = useAuth();
  
  // Fetch market trends data
  const { data: marketTrends, isLoading: isLoadingTrends } = useQuery({
    queryKey: ["/api/market-trends"],
    enabled: true,
  });
  
  // Next steps suggestions for the user
  const nextSteps = [
    {
      id: 1,
      icon: 'survey',
      title: 'Complete Your Assessment',
      description: 'Take a comprehensive skill assessment to get personalized career recommendations.',
      actionText: 'Start Assessment',
      actionLink: '/assessments',
      actionVariant: 'primary',
    },
    {
      id: 2,
      icon: 'profile',
      title: 'Update Your Profile',
      description: 'Add more details about your academic background and interests.',
      actionText: 'Edit Profile',
      actionLink: '/profile',
      actionVariant: 'outline',
    },
    {
      id: 3,
      icon: 'book',
      title: 'Explore Learning Resources',
      description: 'Discover resources to develop skills needed for your desired career path.',
      actionText: 'View Resources',
      actionLink: '/skill-development',
      actionVariant: 'secondary',
    },
  ];
  
  return (
    <DashboardLayout title="Dashboard" userName={user?.fullName}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <WelcomeSection userName={user?.fullName || 'there'} />
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Career Matches Section */}
          <div className="lg:col-span-2">
            <CareerMatchSection userId={user?.id} />
          </div>
          
          {/* Assessment Reminder */}
          <div>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <SurveyIcon className="mr-2" />
                  Upcoming Assessments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user ? (
                  <UpcomingAssessments userId={user.id} />
                ) : (
                  <div className="space-y-2">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Skill Gap Analysis */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <RoadMapIcon className="mr-2" />
                  Skill Gap Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user ? (
                  <SkillGapAnalysis userId={user.id} />
                ) : (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-28 w-full" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Market Trends */}
          <div>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ProfileIcon className="mr-2" />
                  Market Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingTrends ? (
                  <div className="space-y-3">
                    <Skeleton className="h-28 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ) : (
                  <MarketTrendsVisualization data={marketTrends || []} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Next Steps */}
        <NextStepsSection nextSteps={nextSteps} />
      </div>
    </DashboardLayout>
  );
}