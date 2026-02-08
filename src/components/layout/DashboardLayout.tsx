"use client";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  xp?: number;
  streak?: number;
}

export default function DashboardLayout({
  children,
  pageTitle,
  xp,
  streak,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {/* TopBar */}
        <TopBar pageTitle={pageTitle} xp={xp} streak={streak} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">
            {children}
          </div>
        </main>

        {/* Mobile Safe Area Padding for Bottom Navigation */}
        <div className="md:hidden h-20" />
      </div>
    </div>
  );
}
