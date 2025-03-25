import React from 'react';
import { Link, useLocation } from 'wouter';
import {
  DashboardIcon,
  UserIcon,
  ChartIcon,
  BriefcaseIcon,
  GraduationCapIcon
} from '@/components/ui/icons';

const MobileNavigation: React.FC = () => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  const activeLinkClass = "flex flex-col items-center justify-center text-primary";
  const linkClass = "flex flex-col items-center justify-center text-gray-500";

  return (
    <nav className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-10">
      <div className="grid grid-cols-5 h-16">
        <Link href="/" className={isActive("/") ? activeLinkClass : linkClass}>
          <DashboardIcon size="xl" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        <Link href="/profile" className={isActive("/profile") ? activeLinkClass : linkClass}>
          <UserIcon size="xl" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
        <Link href="/assessments" className={isActive("/assessments") ? activeLinkClass : linkClass}>
          <ChartIcon size="xl" />
          <span className="text-xs mt-1">Assess</span>
        </Link>
        <Link href="/career-paths" className={isActive("/career-paths") ? activeLinkClass : linkClass}>
          <BriefcaseIcon size="xl" />
          <span className="text-xs mt-1">Careers</span>
        </Link>
        <Link href="/skill-development" className={isActive("/skill-development") ? activeLinkClass : linkClass}>
          <GraduationCapIcon size="xl" />
          <span className="text-xs mt-1">Learn</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavigation;
