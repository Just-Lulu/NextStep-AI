import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/layouts/DashboardLayout";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import NextStepsSection from "@/components/dashboard/NextStepsSection";
import CareerMatchSection from "@/components/dashboard/CareerMatchSection";
import SkillGapAnalysis from "@/components/dashboard/SkillGapAnalysis";
import UpcomingAssessments from "@/components/dashboard/UpcomingAssessments";
import MarketTrendsVisualization from "@/components/dashboard/MarketTrendsVisualization";

export default function Dashboard() {
  const { user } = useAuth();
  const [targetCareer, setTargetCareer] = useState(null);
  
  const { data: careerMatches, isLoading: isLoadingCareerMatches } = useQuery({
    queryKey: ["/api/users", user?.id, "career-matches"],
    enabled: !!user?.id,
  });
  
  // Set the top career match as the default target career
  useEffect(() => {
    if (careerMatches && careerMatches.length > 0) {
      setTargetCareer(careerMatches[0].title);
    }
  }, [careerMatches]);
  
  // Define next steps for the user
  const nextSteps = [
    {
      id: 1,
      icon: "survey",
      title: "Complete Your Skills Assessment",
      description: "Take a quick assessment to help us understand your skills better",
      actionText: "Start Assessment",
      actionLink: "/assessments",
      actionVariant: "primary",
    },
    {
      id: 2,
      icon: "profile",
      title: "Update Your Profile",
      description: "Add more details to your academic background and interests",
      actionText: "Edit Profile",
      actionLink: "/profile",
      actionVariant: "outline",
    },
    {
      id: 3,
      icon: "book",
      title: "Explore Learning Resources",
      description: "Find courses and materials to develop your skills",
      actionText: "View Resources",
      actionLink: "/skill-development",
      actionVariant: "secondary",
    },
  ];
  
  return (
    <DashboardLayout title="Dashboard" userName={user?.fullName}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <WelcomeSection userName={user?.fullName || "there"} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NextStepsSection nextSteps={nextSteps} />
            <UpcomingAssessments userId={user?.id} />
          </div>
          
          <CareerMatchSection userId={user?.id} />
          
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-xl font-semibold mb-6">Job Market Trends</h2>
            <MarketTrendsVisualization targetCareer={targetCareer} />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <SkillGapAnalysis userId={user?.id} targetCareer={targetCareer} />
        </div>
      </div>
    </DashboardLayout>
  );
}