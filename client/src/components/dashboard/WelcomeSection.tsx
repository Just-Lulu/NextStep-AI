import React from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeSectionProps {
  userName: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName }) => {
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-6 text-white shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Welcome back, {userName}!</h2>
              <p className="opacity-90 text-sm md:text-base">Let's continue exploring your career journey. We have new insights for you.</p>
            </div>
            <Button 
              variant="default" 
              className="bg-white text-primary font-medium hover:bg-blue-50 transition-colors shadow-sm"
            >
              Start Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
