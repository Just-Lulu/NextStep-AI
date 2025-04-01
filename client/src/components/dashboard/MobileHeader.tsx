
import React, { useState } from 'react';
import { MenuIcon, NotificationIcon, RoadMapIcon } from '@/components/ui/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Sidebar from './Sidebar';

const MobileHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "New career match found!", unread: true },
    { id: 2, text: "Complete your skill assessment", unread: true },
    { id: 3, text: "New learning resources available", unread: false }
  ]);

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
        
        <Popover>
          <PopoverTrigger asChild>
            <button className="p-1 rounded-md hover:bg-gray-100 relative">
              <NotificationIcon size="xl" className="text-gray-600" />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0">
            <div className="py-2">
              <div className="px-4 py-2 border-b">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                    notification.unread ? 'bg-gray-50' : ''
                  }`}
                >
                  <p className="text-sm">{notification.text}</p>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default MobileHeader;
