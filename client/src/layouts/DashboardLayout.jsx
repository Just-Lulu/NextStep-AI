import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Sidebar from "@/components/dashboard/Sidebar";
import DesktopHeader from "@/components/dashboard/DesktopHeader";
import MobileHeader from "@/components/dashboard/MobileHeader";
import MobileNavigation from "@/components/dashboard/MobileNavigation";

export default function DashboardLayout({ children, title, userName }) {
  const isMobile = useIsMobile();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  // Close mobile nav when switching to desktop view
  useEffect(() => {
    if (!isMobile && isMobileNavOpen) {
      setIsMobileNavOpen(false);
    }
  }, [isMobile, isMobileNavOpen]);
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - visible on desktop */}
      <Sidebar className="hidden md:flex" />
      
      {/* Mobile Navigation - Only visible when toggled on mobile */}
      {isMobileNavOpen && (
        <MobileNavigation 
          className="fixed inset-0 z-50" 
          onClose={() => setIsMobileNavOpen(false)} 
        />
      )}
      
      <div className="flex-1 flex flex-col">
        {/* Header: Desktop or Mobile version */}
        {isMobile ? (
          <MobileHeader 
            title={title} 
            onMenuClick={() => setIsMobileNavOpen(true)} 
          />
        ) : (
          <DesktopHeader 
            title={title} 
            userName={userName} 
          />
        )}
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 pt-6 md:pt-6 pb-16">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}