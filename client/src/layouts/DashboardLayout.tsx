import React, { ReactNode } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import MobileHeader from '@/components/dashboard/MobileHeader';
import DesktopHeader from '@/components/dashboard/DesktopHeader';
import MobileNavigation from '@/components/dashboard/MobileNavigation';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  userName?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  userName = "Olivia Davis" 
}) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <MobileHeader />

        {/* Desktop Header */}
        <DesktopHeader title={title} userName={userName} />

        {/* Content Wrapper */}
        <div className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50 pb-20 md:pb-6">
          {children}
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation />
      </main>
    </div>
  );
};

export default DashboardLayout;
