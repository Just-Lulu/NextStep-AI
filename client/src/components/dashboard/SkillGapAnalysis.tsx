import React from 'react';
import { ArrowRightIcon, BookIcon, DatabaseIcon } from '@/components/ui/icons';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import type { SkillGap, Resource } from '@shared/schema';

interface SkillGapAnalysisProps {
  userId: number;
  targetCareer?: string;
}

const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({ 
  userId, 
  targetCareer = "Data Scientist" 
}) => {
  const { data: skillGaps, isLoading: skillsLoading } = useQuery<SkillGap[]>({
    queryKey: [`/api/users/${userId}/skill-gaps`],
  });

  const { data: resources, isLoading: resourcesLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
  });

  // Helper function to determine progress color based on skill level
  const getProgressColor = (level: number) => {
    if (level >= 70) return "bg-primary";
    if (level >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  // Sample data when we don't have real data yet
  const sampleSkillGaps = [
    { id: 1, userId: 1, skill: "Machine Learning", currentLevel: 65, targetCareer: "Data Scientist" },
    { id: 2, userId: 1, skill: "Statistical Analysis", currentLevel: 80, targetCareer: "Data Scientist" },
    { id: 3, userId: 1, skill: "Python Programming", currentLevel: 40, targetCareer: "Data Scientist" },
    { id: 4, userId: 1, skill: "SQL & Database Management", currentLevel: 25, targetCareer: "Data Scientist" },
  ];

  const sampleResources = [
    { 
      id: 1, 
      title: "Python for Data Science", 
      type: "course", 
      description: "Comprehensive course covering Python fundamentals for data analysis",
      link: "#",
      skillId: 3
    },
    { 
      id: 2, 
      title: "SQL Fundamentals", 
      type: "course", 
      description: "Learn database management and SQL queries for data analysis",
      link: "#",
      skillId: 4
    },
  ];

  // Use real data if available, otherwise use sample data
  const displaySkillGaps = skillGaps && skillGaps.length > 0 ? skillGaps : sampleSkillGaps;
  const displayResources = resources && resources.length > 0 ? resources : sampleResources;

  // Filter resources to only show relevant ones (limit to 2 for display)
  const relevantResources = displayResources.slice(0, 2);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Your Skill Gap Analysis</h2>
        <button className="text-primary text-sm font-medium hover:underline flex items-center">
          View Details <ArrowRightIcon className="ml-1" />
        </button>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-4">
          Based on your target career as a <span className="font-medium">{targetCareer}</span>, 
          here are your key skill gaps:
        </p>
        
        {skillsLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {displaySkillGaps.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                  <span className="text-xs text-gray-500">{skill.currentLevel}%</span>
                </div>
                <Progress 
                  value={skill.currentLevel} 
                  className="h-2.5 bg-gray-200" 
                  indicatorClassName={getProgressColor(skill.currentLevel)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Recommended Resources</h3>
        {resourcesLoading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 h-10 w-10 rounded-md"></div>
                  <div className="ml-3 w-full">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {relevantResources.map((resource) => (
              <a href={resource.link || "#"} key={resource.id} className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 h-10 w-10 rounded-md flex items-center justify-center text-primary">
                    {resource.type === 'course' ? <BookIcon /> : <DatabaseIcon />}
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-800">{resource.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{resource.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillGapAnalysis;
