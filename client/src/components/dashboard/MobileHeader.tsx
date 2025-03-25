import React, { useState } from 'react';
import { MenuIcon, NotificationIcon, RoadMapIcon } from '@/components/ui/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './Sidebar';

const MobileHeader: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="md:hidden bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-1 rounded-md hover:bg-gray-100">
              <MenuIcon size="xl" className="text-gray-600" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
            <RoadMapIcon />
          </div>
          <span className="ml-2 text-lg font-bold text-gray-800">NextStep AI</span>
        </div>
        
        <button className="p-1 rounded-md hover:bg-gray-100 relative">
          <NotificationIcon size="xl" className="text-gray-600" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
