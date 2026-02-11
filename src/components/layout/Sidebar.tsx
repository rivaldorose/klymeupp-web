"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navigationItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "home" },
  { label: "Leerpad", href: "/skills", icon: "route" },
  { label: "Challenges", href: "/challenges", icon: "emoji_events" },
  { label: "Portfolio", href: "/portfolio", icon: "work" },
  { label: "Stages & Matching", href: "/matching", icon: "handshake" },
  { label: "Community", href: "/community", icon: "groups" },
  { label: "Welzijn", href: "/wellbeing", icon: "favorite" },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:fixed md:left-0 md:top-0 md:h-screen md:flex md:flex-col md:bg-background-light md:border-r md:border-border-light md:transition-all md:duration-300 ${
          isCollapsed ? "md:w-20" : "md:w-72"
        } dark:md:bg-background-dark dark:md:border-border-dark`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between px-6 py-8">
          <div className={`transition-all duration-300 ${isCollapsed ? "hidden" : ""}`}>
            <h1 className="text-2xl font-bold text-primary font-display">
              KlymeUpp
            </h1>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-surface-muted dark:hover:bg-surface-dark transition-colors"
            aria-label="Toggle sidebar"
          >
            <span className="material-symbols-outlined text-lg">
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
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-primary bg-opacity-10 border-l-4 border-primary text-primary dark:bg-primary dark:bg-opacity-20"
                        : "text-text-secondary hover:bg-surface-muted dark:text-text-muted dark:hover:bg-surface-dark"
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
          className={`px-6 py-6 border-t border-border-light dark:border-border-dark ${
            isCollapsed ? "px-3" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-xl">
                account_circle
              </span>
            </div>
            <div className={`flex-1 transition-all duration-300 ${isCollapsed ? "hidden" : ""}`}>
              <p className="text-sm font-semibold text-text-primary dark:text-text-inverse">
                Gebruiker
              </p>
              <p className="text-xs text-text-secondary dark:text-text-muted">
                Level 5
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background-light border-t border-border-light dark:bg-background-dark dark:border-border-dark safe-area-inset-bottom">
        <ul className="flex justify-around">
          {navigationItems.slice(0, 5).map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={`flex flex-col items-center justify-center gap-1 py-3 px-2 transition-colors ${
                    active
                      ? "text-primary"
                      : "text-text-secondary dark:text-text-muted"
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {item.icon}
                  </span>
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
