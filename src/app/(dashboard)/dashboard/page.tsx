"use client";

import React, { useMemo } from "react";
import { formatXP, getGreeting, calculateLevel } from "@/lib/utils";

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_USER = {
  name: "Alex",
  xp: 1250,
  streak: 7,
  avatar_url:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAj439sNQqzT3gMXfgRgAqQX1q7n1VI2BsGuAFtGfI7mVdf-VxWuiWHiajL04RDEea5sQNVIkKhu_d9x-u_n0iROOYYUgYii91KTZR3nTrMiVhfoC-APIddmtFhBi61__qY9CDttc9SuxsJoTYTpKF6of4EznReD1VPiW8KVnAXF_SXhygxuDjdWxEQSpd-7eXJ6mR6uGzJ4vJmulNniR04SmBKZ7C49w9rsJb0vm_lS0jqwLIp1AAbCbxhJeUbRcO1KkjlNkKhkEY",
};

const MOCK_LEARNING_PATHS = [
  { id: "1", name: "Soft Skills", progress: 65, completed: 4, total: 6, color: "text-soft-green" },
  { id: "2", name: "Praktijkvaardigheden", progress: 30, completed: 2, total: 8, color: "text-primary" },
  { id: "3", name: "Arbeidsmarkt Ready", progress: 10, completed: 1, total: 10, color: "text-soft-blue" },
];

const MOCK_LEADERBOARD = [
  {
    rank: 1,
    name: "Sophie V.",
    xp: 2450,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8CaIHrIeWcjB_oAh12PsRfd8Dns-ABqqFw9xuRzVfZPQSozRLBV_KZTrAn1Cs4lmeeo34tOsIaUr1x-4rnNTVKFRwkax9_beFvIS3bbZ8MzqulaUrU7f_VUTTigK98R7kl8VJhd9H48_JVWg5aWOc03mTjExLStgsOvJn7mKX4SkB3VSYNQI6VGRNtx1tANb-y3YTGsV6yyDfZL2CVaEIf_wNjbD7MwiuCev1kcsi2PeW0cvNrOYwLWB46fIPEMA6437qF_04CZk",
  },
  {
    rank: 2,
    name: "Lars de B.",
    xp: 2120,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgfg9Xqvt0hDPz3eJ19xX9X9l68hEk2wZMvF1floU7FYX1RZmsDYg4VHZm9Lc1miGtpHA65WeSy6knU_VSbqlPFpLOYMVacIu1KWuXUsJCWiy2aeo5R1ry2D15CqgqBrQOLkCrFdnHeBqN7OdUOkx72X3vc-Pu6e1KMqpk8g476OnEUSGRF3azc731wzEVoLbRxyXS86VYNJZX6LaCZVsdBblM1PkH2xAGF_yToLb4sE0r1f4kCKkKTUGbdaMPdUszVHLmkJBZMgk",
  },
  {
    rank: 3,
    name: "Emma K.",
    xp: 1980,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtesd5U7uTfcTpT0mFBXSocgyAYRRElMZ_BN9h5Q19M7nXZyW0J_M45nzFPn2oxmXqH0YiSaMdhUHAYnwvq5RFOY_xal8Ya2iCp7z3TgjEO16DQR8Lyk1E3grlVNjAdyewLPMEt6F56g3_eqtLizqaI_Z6iHIQs259x-ZfbI4WSTM0kQDQ7eitYiVGQ2MqakdkX3wa1n1oLEebKarMLUxXlClz_Fpnp3jcV8XJSHTTCy6xPI6vAOCw7_QqpP5g4B4kK3S7WBQgYLE",
  },
];

const MOCK_BADGES = [
  { id: "1", icon: "verified", color: "text-soft-green", isNew: true },
  { id: "2", icon: "rocket_launch", color: "text-soft-blue", isNew: false },
  { id: "3", icon: "chat_bubble", color: "text-primary", isNew: false },
];

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function DashboardPage() {
  const greeting = useMemo(() => getGreeting(), []);
  const { level, progress } = calculateLevel(MOCK_USER.xp);
  const levelNames = ["Ontdekker", "Exploreerder", "Avonturier", "Verkenner", "Meester"];
  const levelName = levelNames[level - 1] || "Legenda";

  return (
    <div className="w-full">
      {/* Greeting & Level Progress */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold mb-2">Hey {MOCK_USER.name}! 👋</h1>
          <p className="text-gray-500 font-medium">
            Klaar om je carrière een boost te geven vandaag?
          </p>
        </div>
        <div className="w-full md:w-80 bg-white p-4 rounded-xl shadow-sm border border-[#f4f0f2]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-primary">
              Level {level} — {levelName}
            </span>
            <span className="text-xs font-bold text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-[#f4f0f2] h-3 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-10">
          {/* Daily Challenge */}
          <section>
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-[#ff4d9d] to-[#ff7eb3] p-8 text-white shadow-lg group">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[14px]">timer</span>
                    Nog 8 uur
                  </div>
                  <h2 className="text-2xl font-extrabold mb-2 leading-tight">
                    Interview Skills: Stel jezelf voor in 60 sec
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        workspace_premium
                      </span>
                      <span className="font-bold">+50 XP</span>
                    </div>
                    <div className="w-1 h-1 bg-white/50 rounded-full" />
                    <span className="text-white/80 font-medium">Dagelijkse Challenge</span>
                  </div>
                </div>
                <button className="bg-white text-primary hover:bg-gray-100 transition-colors px-8 py-3 rounded-full font-extrabold text-sm shadow-md whitespace-nowrap">
                  Start Challenge
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 size-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
            </div>
          </section>

          {/* Learning Paths */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold">Jouw Leerpaden</h2>
              <button className="text-primary text-sm font-bold flex items-center gap-1">
                Bekijk alles{" "}
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {MOCK_LEARNING_PATHS.map((path) => (
                <div
                  key={path.id}
                  className="bg-white p-6 rounded-xl border border-[#f4f0f2] flex flex-col items-center text-center shadow-sm"
                >
                  <div className="relative size-24 mb-4 flex items-center justify-center">
                    <svg className="size-full" viewBox="0 0 36 36">
                      <path
                        className="text-gray-100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className={path.color}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray={`${path.progress}, 100`}
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                    </svg>
                    <span className="absolute text-xl font-extrabold">{path.progress}%</span>
                  </div>
                  <h3 className="font-extrabold text-sm mb-1">{path.name}</h3>
                  <p className="text-xs text-gray-500">
                    {path.completed}/{path.total} modules voltooid
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          {/* Leaderboard */}
          <section className="bg-white rounded-xl border border-[#f4f0f2] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#f4f0f2]">
              <h2 className="text-xl font-extrabold flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-warning"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  emoji_events
                </span>
                Leaderboard
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {MOCK_LEADERBOARD.map((entry) => (
                <div key={entry.rank} className="flex items-center gap-3">
                  <div
                    className={`size-8 flex items-center justify-center rounded-full font-black text-sm ${
                      entry.rank === 1
                        ? "bg-warning/20 text-warning"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {entry.rank}
                  </div>
                  <div className="size-10 rounded-full bg-gray-200 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={entry.name}
                      className="w-full h-full rounded-full object-cover"
                      src={entry.avatar}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{entry.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                      {formatXP(entry.xp)} XP
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full p-4 text-sm font-bold bg-[#fcfcfc] text-gray-600 hover:text-primary transition-colors border-t border-[#f4f0f2]">
              Volledige Ranglijst
            </button>
          </section>

          {/* Badges */}
          <section>
            <h2 className="text-xl font-extrabold mb-4 px-1">Nieuwe Badges</h2>
            <div className="grid grid-cols-3 gap-2">
              {MOCK_BADGES.map((badge) => (
                <div
                  key={badge.id}
                  className="aspect-square bg-white rounded-xl flex items-center justify-center border border-[#f4f0f2] shadow-sm group hover:scale-105 transition-transform cursor-pointer relative"
                >
                  <span
                    className={`material-symbols-outlined ${badge.color} text-3xl`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {badge.icon}
                  </span>
                  {badge.isNew && (
                    <div className="absolute -top-1 -right-1 size-3 bg-primary rounded-full border-2 border-white" />
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
