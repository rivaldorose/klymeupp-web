"use client";

import React, { useState } from "react";

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_SKILLS = [
  {
    id: "1",
    name: "Communicatie",
    description: "Spreken, luisteren en presenteren",
    icon: "chat",
    iconBg: "bg-pink-100 text-primary",
    progress: 4,
    total: 5,
    isTopSkill: true,
  },
  {
    id: "2",
    name: "Samenwerken",
    description: "Effectief in teamverband werken",
    icon: "groups",
    iconBg: "bg-blue-100 text-blue-500",
    progress: 5,
    total: 5,
    isTopSkill: false,
  },
  {
    id: "3",
    name: "Probleemoplossend vermogen",
    description: "Creatieve oplossingen bedenken",
    icon: "psychology",
    iconBg: "bg-purple-100 text-purple-500",
    progress: 3,
    total: 5,
    isTopSkill: false,
  },
  {
    id: "4",
    name: "Creativiteit",
    description: "Out-of-the-box denken",
    icon: "lightbulb",
    iconBg: "bg-amber-100 text-amber-500",
    progress: 4,
    total: 5,
    isTopSkill: true,
  },
];

const MOCK_BADGES = [
  { id: "1", name: "First Steps", icon: "verified", color: "text-emerald-500", isLocked: false, earnedDate: "2024-02-01" },
  { id: "2", name: "Communicator", icon: "chat_bubble", color: "text-primary", isLocked: false, earnedDate: "2024-02-05" },
  { id: "3", name: "Team Player", icon: "group", color: "text-blue-500", isLocked: false, earnedDate: "2024-02-10" },
  { id: "4", name: "Challenge Master", icon: "bolt", color: "text-amber-500", isLocked: false, earnedDate: "2024-02-15" },
  { id: "5", name: "Knowledge Keeper", icon: "school", color: "text-emerald-500", isLocked: true },
  { id: "6", name: "Leadership", icon: "shield", color: "text-primary", isLocked: true },
  { id: "7", name: "Innovator", icon: "auto_awesome", color: "text-purple-500", isLocked: true },
  { id: "8", name: "Presenter", icon: "record_voice_over", color: "text-amber-500", isLocked: true },
  { id: "9", name: "Analyst", icon: "analytics", color: "text-blue-500", isLocked: true },
  { id: "10", name: "Expert", icon: "workspace_premium", color: "text-primary", isLocked: true },
  { id: "11", name: "Networker", icon: "hub", color: "text-emerald-500", isLocked: true },
  { id: "12", name: "Mentor", icon: "volunteer_activism", color: "text-amber-500", isLocked: true },
];

const MOCK_PROJECTS = [
  {
    id: "1",
    title: "Community Platform Design",
    description: "Designed and prototyped a community engagement platform with figma",
    gradient: "from-blue-400 to-blue-600",
    skills: ["Design", "UI/UX", "Figma"],
    date: "Jan 2024",
  },
  {
    id: "2",
    title: "Interview Preparation Workshop",
    description: "Led a workshop teaching 15+ peers interview techniques and soft skills",
    gradient: "from-purple-400 to-purple-600",
    skills: ["Leadership", "Communication", "Training"],
    date: "Dec 2023",
  },
  {
    id: "3",
    title: "Career Path Analysis",
    description: "Analyzed career opportunities and created a personal development plan",
    gradient: "from-emerald-400 to-emerald-600",
    skills: ["Research", "Analysis", "Planning"],
    date: "Nov 2023",
  },
  {
    id: "4",
    title: "Social Media Campaign",
    description: "Created a social media campaign for a local non-profit organization",
    gradient: "from-primary to-pink-400",
    skills: ["Marketing", "Content Creation", "Strategy"],
    date: "Oct 2023",
  },
  {
    id: "5",
    title: "Data Visualization Dashboard",
    description: "Built an interactive dashboard to visualize sustainability metrics",
    gradient: "from-amber-400 to-orange-500",
    skills: ["Data", "Visualization", "Analytics"],
    date: "Sep 2023",
  },
];

type Tab = "skills" | "badges" | "projects" | "cv";

const TABS: Array<{ id: Tab; label: string; icon: string }> = [
  { id: "skills", label: "Skills", icon: "bolt" },
  { id: "badges", label: "Badges", icon: "verified" },
  { id: "projects", label: "Projecten", icon: "folder_open" },
  { id: "cv", label: "CV", icon: "description" },
];

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<Tab>("skills");

  return (
    <div className="w-full max-w-[960px] mx-auto space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <div className="size-[88px] rounded-full border-[3px] border-primary p-0.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-4xl">
                person
              </span>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full border-2 border-white">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Rivaldo M.</h1>
          <p className="text-gray-500 font-medium mt-1">
            Creatieve ondernemer in wording 🚀
          </p>
          <div className="mt-3 inline-flex items-center px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold border border-primary/20">
            Level 5 — Bouwer
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-between shadow-sm">
        <div className="flex-1 flex flex-col items-center border-r border-gray-100">
          <p className="text-xl font-bold">1,250</p>
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
            XP
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center border-r border-gray-100">
          <p className="text-xl font-bold">12</p>
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
            Badges
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <p className="text-xl font-bold">5</p>
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
            Projecten
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 justify-center">
        <button className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 h-12 rounded-full font-bold transition-all hover:bg-primary/5">
          <span className="material-symbols-outlined text-xl">share</span>
          Deel profiel
        </button>
        <button className="flex items-center justify-center size-12 bg-primary/10 text-primary rounded-full font-bold hover:bg-primary/20 transition-colors">
          <span className="material-symbols-outlined">edit</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 flex gap-8 px-2 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 border-b-[3px] flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "border-primary text-gray-900"
                : "border-transparent text-gray-400 hover:text-primary"
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={
                activeTab === tab.id
                  ? { fontVariationSettings: "'FILL' 1" }
                  : {}
              }
            >
              {tab.icon}
            </span>
            <span className="text-sm font-bold">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_SKILLS.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`size-12 rounded-lg flex items-center justify-center ${skill.iconBg}`}
                    >
                      <span className="material-symbols-outlined text-3xl">
                        {skill.icon}
                      </span>
                    </div>
                    {skill.isTopSkill && (
                      <div className="flex items-center gap-1 text-amber-400">
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="text-xs font-bold text-gray-400">
                          Top Skill
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-1">{skill.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {skill.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        PROGRESS
                      </span>
                      <span className="text-sm font-bold text-emerald-500">
                        {skill.progress}/{skill.total}
                      </span>
                    </div>
                    <div className="flex gap-1.5 w-full">
                      {Array.from({ length: skill.total }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 rounded-full flex-1 ${
                            i < skill.progress
                              ? "bg-emerald-500"
                              : "bg-gray-100"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Skill Button */}
            <button className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-primary hover:text-primary transition-all font-bold">
              <span className="material-symbols-outlined">add_circle</span>
              Voeg nieuwe skill toe
            </button>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === "badges" && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {MOCK_BADGES.map((badge) => (
              <div key={badge.id} className="flex flex-col items-center">
                <div
                  className={`aspect-square w-full bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center p-4 relative hover:scale-105 transition-transform cursor-pointer ${
                    badge.isLocked ? "opacity-40 grayscale" : ""
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-4xl ${badge.color}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {badge.icon}
                  </span>
                  {!badge.isLocked && (
                    <div className="absolute -top-1.5 -right-1.5 size-4 bg-emerald-500 rounded-full border-2 border-white" />
                  )}
                  {badge.isLocked && (
                    <div className="absolute -top-1.5 -right-1.5 size-4 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[8px] text-white">
                        lock
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold mt-2 text-center">
                  {badge.name}
                </p>
                {!badge.isLocked && badge.earnedDate && (
                  <p className="text-[10px] text-gray-400 text-center mt-0.5">
                    {new Date(badge.earnedDate).toLocaleDateString("nl-NL", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projecten Tab */}
        {activeTab === "projects" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div
                    className={`h-32 w-full bg-gradient-to-br ${project.gradient}`}
                  />
                  <div className="p-5">
                    <h3 className="font-bold mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-400 font-medium">
                        {project.date}
                      </span>
                      <button className="text-primary text-sm font-bold flex items-center gap-1 group-hover:underline">
                        Bekijk
                        <span className="material-symbols-outlined text-sm">
                          arrow_outward
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Project Button */}
            <button className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-primary hover:text-primary transition-all font-bold">
              <span className="material-symbols-outlined">add_circle</span>
              Voeg nieuw project toe
            </button>
          </div>
        )}

        {/* CV Tab */}
        {activeTab === "cv" && (
          <div className="flex flex-col items-center gap-6 py-12">
            <div className="size-20 bg-gray-100 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-gray-400 text-4xl">
                description
              </span>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Genereer je CV</h3>
              <p className="text-gray-500 text-sm max-w-md">
                Op basis van je skills, projecten en challenges genereren we
                automatisch een professioneel CV voor je.
              </p>
            </div>
            <button className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
              CV Genereren
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
