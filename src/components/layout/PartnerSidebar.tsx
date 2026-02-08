"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navigationItems: NavItem[] = [
  { label: "Dashboard", href: "/partner", icon: "dashboard" },
  { label: "Kandidaten", href: "/partner/candidates", icon: "people" },
  { label: "Challenges", href: "/partner/challenges", icon: "emoji_events" },
  { label: "Statistieken", href: "/partner/stats", icon: "analytics" },
  { label: "Instellingen", href: "/partner/settings", icon: "settings" },
];

export default function PartnerSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/partner") {
      return pathname === "/partner";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:fixed md:left-0 md:top-0 md:h-screen md:flex md:flex-col md:bg-navy md:transition-all md:duration-300 ${
          isCollapsed ? "md:w-20" : "md:w-72"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between px-6 py-8 border-b border-navy-light">
          <div
            className={`transition-all duration-300 ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            <h1 className="text-2xl font-bold text-white font-partner">
              KlymeUpp
            </h1>
            <p className="text-xs text-navy-light font-medium mt-1">
              Partner Portal
            </p>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-navy-light hover:bg-opacity-20 transition-colors"
            aria-label="Toggle sidebar"
          >
            <span className="material-symbols-outlined text-lg text-white">
              {isCollapsed ? "chevron_right" : "chevron_left"}
            </span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 font-partner ${
                      active
                        ? "bg-navy-light text-primary border-l-4 border-primary"
                        : "text-navy-light hover:bg-navy-light hover:bg-opacity-20"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl flex-shrink-0">
                      {item.icon}
                    </span>
                    <span
                      className={`font-medium text-sm transition-all duration-300 ${
                        isCollapsed ? "hidden" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile Section */}
        <div
          className={`px-6 py-6 border-t border-navy-light ${
            isCollapsed ? "px-3" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-xl font-partner">
                account_circle
              </span>
            </div>
            <div
              className={`flex-1 transition-all duration-300 ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              <p className="text-sm font-semibold text-white font-partner">
                Bedrijf
              </p>
              <p className="text-xs text-navy-light font-partner">
                Admin
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-navy border-t border-navy-light safe-area-inset-bottom">
        <ul className="flex justify-around">
          {navigationItems.slice(0, 4).map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={`flex flex-col items-center justify-center gap-1 py-3 px-2 transition-colors ${
                    active ? "text-primary" : "text-navy-light"
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {item.icon}
                  </span>
                  <span className="text-xs font-medium font-partner">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
