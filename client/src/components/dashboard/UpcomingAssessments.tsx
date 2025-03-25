import React from 'react';
import { ArrowRightIcon, FileListIcon, UserHeartIcon, PresentationIcon } from '@/components/ui/icons';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import type { Assessment } from '@shared/schema';

interface UpcomingAssessmentsProps {
  userId: number;
}

const UpcomingAssessments: React.FC<UpcomingAssessmentsProps> = ({ userId }) => {
  const { data: assessments, isLoading } = useQuery<Assessment[]>({
    queryKey: [`/api/users/${userId}/assessments`],
  });

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

  // Helper function to format the time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleTimeString('en-US', options);
  };

  // Helper function to get the icon based on assessment type
  const getIcon = (type: string) => {
    switch (type) {
      case 'technical':
        return <FileListIcon />;
      case 'soft':
        return <UserHeartIcon />;
      case 'career':
        return <PresentationIcon />;
      default:
        return <FileListIcon />;
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

  // Helper function to get the status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Upcoming Assessments</h2>
        <Link href="/assessments" className="text-primary flex items-center text-sm font-medium hover:underline">
          View All <ArrowRightIcon className="ml-1" />
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="min-h-[300px] flex items-center justify-center">
              <p className="text-gray-500">Loading assessments...</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayAssessments.map((assessment) => (
                  <tr key={assessment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded ${getIconBg(assessment.type)} flex items-center justify-center`}>
                          {getIcon(assessment.type)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{assessment.title}</div>
                          <div className="text-xs text-gray-500">{assessment.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(assessment.date)}</div>
                      <div className="text-xs text-gray-500">{formatTime(assessment.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{assessment.duration} minutes</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(assessment.status)}`}>
                        {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {assessment.status === 'scheduled' ? (
                        <Link href={`/assessments/${assessment.id}`} className="text-primary hover:text-primary-dark">
                          Start
                        </Link>
                      ) : (
                        <Link href={`/assessments/${assessment.id}/results`} className="text-gray-500 hover:text-gray-700">
                          View Results
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingAssessments;
