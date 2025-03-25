import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import Sidebar from "@/components/dashboard/Sidebar";
import DesktopHeader from "@/components/dashboard/DesktopHeader";
import MobileHeader from "@/components/dashboard/MobileHeader";
import MobileNavigation from "@/components/dashboard/MobileNavigation";

export default function DashboardLayout({ children, title, userName }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logoutMutation } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - desktop only */}
      <Sidebar onLogout={handleLogout} />

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile navigation drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop header */}
        <DesktopHeader title={title} userName={userName} />

        {/* Mobile header */}
        <MobileHeader
          title={title}
          onMenuClick={toggleMobileMenu}
          userName={userName}
        />

        {/* Main content scrollable area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}