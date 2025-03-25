import React from 'react';
import { Button } from '@/components/ui/button';
import { SurveyIcon, ProfileIcon, BookmarksIcon } from '@/components/ui/icons';
import { Link } from 'wouter';

interface NextStep {
  id: number;
  icon: 'survey' | 'profile' | 'book';
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
  actionVariant: 'primary' | 'outline' | 'secondary';
}

interface NextStepsSectionProps {
  nextSteps?: NextStep[];
}

const NextStepsSection: React.FC<NextStepsSectionProps> = ({ nextSteps }) => {
  // Default next steps if none provided
  const defaultNextSteps: NextStep[] = [
    {
      id: 1,
      icon: 'survey',
      title: 'Complete Your Technical Skills Assessment',
      description: 'This will help us provide more accurate career recommendations based on your technical abilities.',
      actionText: 'Start Assessment',
      actionLink: '/assessments/technical',
      actionVariant: 'primary'
    },
    {
      id: 2,
      icon: 'profile',
      title: 'Update Your Academic Background',
      description: 'Add your coursework, projects, and academic achievements to enhance your profile.',
      actionText: 'Update Profile',
      actionLink: '/profile',
      actionVariant: 'outline'
    },
    {
      id: 3,
      icon: 'book',
      title: 'Explore Python Programming Course',
      description: 'Our analysis shows this skill is critical for your target career path as a Data Scientist.',
      actionText: 'View Course',
      actionLink: '/skill-development/python',
      actionVariant: 'secondary'
    }
  ];

  const stepsToShow = nextSteps || defaultNextSteps;

  // Helper function to render the appropriate icon
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'survey':
        return <SurveyIcon className="text-lg" />;
      case 'profile':
        return <ProfileIcon className="text-lg" />;
      case 'book':
        return <BookmarksIcon className="text-lg" />;
      default:
        return <SurveyIcon className="text-lg" />;
    }
  };

  // Helper function to get the icon background color
  const getIconBg = (iconType: string) => {
    switch (iconType) {
      case 'survey':
        return 'bg-blue-100 text-primary';
      case 'profile':
        return 'bg-purple-100 text-accent';
      case 'book':
        return 'bg-green-100 text-secondary';
      default:
        return 'bg-blue-100 text-primary';
    }
  };

  // Helper function to get the button variant
  const getButtonVariant = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white hover:bg-blue-600';
      case 'outline':
        return 'border border-accent text-accent hover:bg-purple-50';
      case 'secondary':
        return 'border border-secondary text-secondary hover:bg-green-50';
      default:
        return 'bg-primary text-white hover:bg-blue-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Recommended Next Steps</h2>
      
      <div className="space-y-4">
        {stepsToShow.map((step) => (
          <div 
            key={step.id} 
            className="flex items-start p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className={`flex-shrink-0 h-10 w-10 rounded-full ${getIconBg(step.icon)} flex items-center justify-center`}>
              {renderIcon(step.icon)}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-base font-medium text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{step.description}</p>
              <div className="mt-3">
                <Link href={step.actionLink}>
                  <Button 
                    variant="default" 
                    className={`text-sm font-medium py-1.5 px-3 rounded transition-colors ${getButtonVariant(step.actionVariant)}`}
                  >
                    {step.actionText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextStepsSection;
