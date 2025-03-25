import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/layouts/DashboardLayout';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import CareerMatchSection from '@/components/dashboard/CareerMatchSection';
import SkillGapAnalysis from '@/components/dashboard/SkillGapAnalysis';
import MarketTrendsVisualization from '@/components/dashboard/MarketTrendsVisualization';
import UpcomingAssessments from '@/components/dashboard/UpcomingAssessments';
import NextStepsSection from '@/components/dashboard/NextStepsSection';
import type { User } from '@shared/schema';

const Dashboard: React.FC = () => {
  // In a real application, we would get the current user ID from authentication
  // For now, we'll use a hardcoded ID
  const userId = 1;

  const { data: user, isLoading } = useQuery<User>({
    queryKey: [`/api/users/${userId}`],
  });

  // Use a placeholder name if the user data is loading or not available
  const userName = isLoading || !user ? "Olivia" : user.fullName.split(' ')[0];

  return (
    <DashboardLayout title="Dashboard" userName={isLoading || !user ? "Olivia Davis" : user.fullName}>
      {/* Welcome Section */}
      <WelcomeSection userName={userName} />

      {/* Career Match Section */}
      <CareerMatchSection userId={userId} />

      {/* Two column section for Skill Gap and Market Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SkillGapAnalysis userId={userId} />
        <MarketTrendsVisualization />
      </div>

      {/* Upcoming Assessments */}
      <UpcomingAssessments userId={userId} />

      {/* Next Steps Section */}
      <NextStepsSection />
    </DashboardLayout>
  );
};

export default Dashboard;
