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
    <div className="min-h-screen bg-background-light">
      {/* Sidebar */}
      <Sidebar />

      {/* TopBar */}
      <TopBar pageTitle={pageTitle} xp={xp} streak={streak} />

      {/* Page Content */}
      <main>
        <div className="max-w-[1200px] mx-auto w-full px-4 lg:px-10 py-8">
          {children}
        </div>
      </main>

      {/* Mobile Safe Area Padding for Bottom Navigation */}
      <div className="lg:hidden h-24" />
    </div>
  );
}
