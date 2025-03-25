import React from 'react';
import { Link, useLocation } from 'wouter';
import {
  DashboardIcon,
  UserIcon,
  ChartIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  MessageIcon,
  BookIcon,
  QuestionIcon,
  SettingsIcon,
  LogoutIcon,
  RoadMapIcon
} from '@/components/ui/icons';

const Sidebar: React.FC = () => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  const linkClass = (path: string) => {
    return isActive(path)
      ? "px-4 py-2.5 flex items-center text-primary bg-blue-50 border-r-4 border-primary"
      : "px-4 py-2.5 flex items-center text-gray-600 hover:bg-gray-50";
  };

  return (
    <aside className="hidden md:flex md:w-64 flex-col bg-white shadow-md z-10">
      <div className="flex items-center justify-center h-16 border-b px-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
            <RoadMapIcon />
          </div>
          <span className="ml-2 text-lg font-bold text-gray-800">NextStep AI</span>
        </div>
      </div>
      
      <div className="py-6 flex flex-col h-full">
        <nav className="flex-1">
          <div className="px-4 mb-4">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Menu</p>
          </div>
          <Link href="/" className={linkClass("/")}>
            <DashboardIcon className="mr-3" />
            <span>Dashboard</span>
          </Link>
          <Link href="/profile" className={linkClass("/profile")}>
            <UserIcon className="mr-3" />
            <span>My Profile</span>
          </Link>
          <Link href="/assessments" className={linkClass("/assessments")}>
            <ChartIcon className="mr-3" />
            <span>Assessments</span>
          </Link>
          <Link href="/career-paths" className={linkClass("/career-paths")}>
            <BriefcaseIcon className="mr-3" />
            <span>Career Paths</span>
          </Link>
          <Link href="/skill-development" className={linkClass("/skill-development")}>
            <GraduationCapIcon className="mr-3" />
            <span>Skill Development</span>
          </Link>
          <Link href="/messages" className={linkClass("/messages")}>
            <MessageIcon className="mr-3" />
            <span>Messages</span>
          </Link>
          
          <div className="px-4 mt-8 mb-4">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Resources</p>
          </div>
          <Link href="/learning-library" className={linkClass("/learning-library")}>
            <BookIcon className="mr-3" />
            <span>Learning Library</span>
          </Link>
          <Link href="/help-center" className={linkClass("/help-center")}>
            <QuestionIcon className="mr-3" />
            <span>Help Center</span>
          </Link>
        </nav>
        
        <div className="mt-auto px-4 py-2">
          <Link href="/settings" className={`flex items-center text-gray-600 ${isActive("/settings") ? "text-primary" : ""}`}>
            <SettingsIcon className="mr-3" />
            <span>Settings</span>
          </Link>
          <button className="flex items-center text-gray-600 mt-4 w-full text-left">
            <LogoutIcon className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
