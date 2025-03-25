import React from 'react';
import { ArrowRightIcon } from '@/components/ui/icons';
import CareerMatchCard from './CareerMatchCard';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import type { CareerMatch } from '@shared/schema';

interface CareerMatchSectionProps {
  userId: number;
}

const CareerMatchSection: React.FC<CareerMatchSectionProps> = ({ userId }) => {
  const { data: careerMatches, isLoading } = useQuery<CareerMatch[]>({
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
    }
  ];

  // Use real data if available, otherwise use sample data
  const displayMatches = careerMatches && careerMatches.length > 0 ? careerMatches : sampleCareerMatches;

  const handleExplore = (id: number) => {
    console.log(`Exploring career with ID: ${id}`);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Your Top Career Matches</h2>
        <Link href="/career-paths" className="text-primary flex items-center text-sm font-medium hover:underline">
          View All Matches <ArrowRightIcon className="ml-1" />
        </Link>
      </div>
      
      {isLoading ? (
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayMatches.map((career) => (
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
    </div>
  );
};

export default CareerMatchSection;
