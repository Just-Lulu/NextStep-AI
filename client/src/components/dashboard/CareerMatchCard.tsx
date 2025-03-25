import React from 'react';
import { LineChartIcon } from '@/components/ui/icons';

interface CareerMatchCardProps {
  title: string;
  matchPercentage: number;
  salaryRange: string;
  description: string;
  requiredSkills: string[];
  demandStatus: string;
  onExplore: () => void;
}

const CareerMatchCard: React.FC<CareerMatchCardProps> = ({
  title,
  matchPercentage,
  salaryRange,
  description,
  requiredSkills,
  demandStatus,
  onExplore
}) => {
  // Helper function to get match color based on percentage
  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-secondary bg-green-50";
    if (percentage >= 80) return "text-green-600 bg-green-50";
    if (percentage >= 70) return "text-blue-600 bg-blue-50";
    return "text-amber-600 bg-amber-50";
  };

  // Helper function to get demand icon and text
  const getDemandClass = () => {
    if (demandStatus === "High Demand") return "text-green-500";
    if (demandStatus === "Growing Demand") return "text-green-500";
    return "text-amber-500";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <div className={`${getMatchColor(matchPercentage)} text-xs px-2 py-1 rounded-full font-medium`}>
            {matchPercentage}% Match
          </div>
        </div>
        <div className="flex items-center mb-4 text-sm text-gray-600">
          <i className="ri-briefcase-4-line mr-2"></i>
          <span>Average Salary: {salaryRange}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="mb-4">
          <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Top Skills Required</h4>
          <div className="flex flex-wrap gap-2">
            {requiredSkills.map((skill, index) => (
              <span key={index} className="bg-blue-50 text-primary text-xs px-2 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            <span className="flex items-center">
              <LineChartIcon className={`${getDemandClass()} mr-1`} />
              {demandStatus}
            </span>
          </div>
          <button 
            onClick={onExplore}
            className="text-primary text-sm font-medium hover:underline"
          >
            Explore Career
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerMatchCard;
