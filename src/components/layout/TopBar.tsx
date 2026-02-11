"use client";

import { formatXP } from "@/lib/utils";

interface TopBarProps {
  pageTitle: string;
  xp?: number;
  streak?: number;
}

export default function TopBar({ pageTitle, xp = 1250, streak = 7 }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#f4f0f2] px-4 lg:px-40 py-3">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white">
            <span className="material-symbols-outlined font-bold">trending_up</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight hidden sm:block">KlymeUpp</h2>
        </div>

        {/* Right: Stats and Profile */}
        <div className="flex flex-1 justify-end items-center gap-2 sm:gap-4">
          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-[#fff4e5] px-3 py-1.5 rounded-full border border-[#ffe4c4]">
            <span
              className="material-symbols-outlined text-[#f39c12] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="text-[#a06917] text-sm font-bold">{streak} dagen</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
            <span
              className="material-symbols-outlined text-primary text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            <span className="text-primary text-sm font-bold">{formatXP(xp)} XP</span>
          </div>

          {/* Profile Avatar */}
          <div className="flex items-center gap-2 ml-2">
            <div className="size-10 rounded-full border-2 border-primary p-0.5">
              <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl">person</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
