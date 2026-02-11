"use client";

import { useState } from "react";

interface TopBarProps {
  pageTitle: string;
  xp?: number;
  streak?: number;
}

export default function TopBar({ pageTitle, xp = 2450, streak = 7 }: TopBarProps) {
  const [notificationCount, setNotificationCount] = useState(3);

  return (
    <header className="sticky top-0 z-40 bg-surface-light bg-opacity-95 backdrop-blur supports-[backdrop-filter]:bg-opacity-80 border-b border-border-light dark:bg-surface-dark dark:border-border-dark transition-all duration-300">
      <div className="flex items-center justify-between px-4 md:px-8 py-4 gap-4">
        {/* Left: Page Title */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-text-primary dark:text-text-inverse font-display truncate">
            {pageTitle}
          </h1>
        </div>

        {/* Center: Search (Desktop only) */}
        <div className="hidden lg:block flex-1 max-w-xs">
          <div className="relative">
            <input
              type="text"
              placeholder="Zoeken..."
              className="w-full px-4 py-2 pl-10 rounded-lg bg-surface-muted border border-border-light text-text-primary placeholder-text-muted dark:bg-surface-darker dark:border-border-dark dark:text-text-inverse dark:placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 material-symbols-outlined text-text-muted text-xl">
              search
            </span>
          </div>
        </div>

        {/* Right: Stats and Profile */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          {/* XP Counter */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gold bg-opacity-10 dark:bg-opacity-20">
            <span className="material-symbols-outlined text-gold text-xl">
              star
            </span>
            <span className="text-sm font-semibold text-text-primary dark:text-text-inverse hidden md:inline">
              {xp} XP
            </span>
            <span className="text-sm font-semibold text-text-primary dark:text-text-inverse md:hidden">
              {xp}
            </span>
          </div>

          {/* Streak Counter */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-warning bg-opacity-10 dark:bg-opacity-20">
            <span className="material-symbols-outlined text-warning text-xl">
              local_fire_department
            </span>
            <span className="text-sm font-semibold text-text-primary dark:text-text-inverse hidden md:inline">
              {streak} dagen
            </span>
            <span className="text-sm font-semibold text-text-primary dark:text-text-inverse md:hidden">
              {streak}
            </span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-surface-muted dark:hover:bg-surface-dark transition-colors">
            <span className="material-symbols-outlined text-text-primary dark:text-text-inverse text-2xl">
              notifications
            </span>
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full text-white text-xs font-bold flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <button className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors">
            <span className="material-symbols-outlined text-primary text-2xl">
              account_circle
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
