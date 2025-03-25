import React from 'react';
import { SearchIcon, NotificationIcon, ArrowDownIcon } from '@/components/ui/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DesktopHeaderProps {
  title: string;
  userName?: string;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({ 
  title, 
  userName = "User"
}) => {
  return (
    <header className="hidden md:block bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-6">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button className="p-2 rounded-md hover:bg-gray-100 relative">
            <NotificationIcon size="lg" className="text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
          </button>
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="ml-2 text-sm font-medium text-gray-700">{userName}</span>
            <ArrowDownIcon className="ml-1 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
