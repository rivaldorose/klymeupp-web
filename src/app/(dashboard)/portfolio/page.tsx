"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// ============================================================================
// TYPES
// ============================================================================

interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  progress: number;
  icon: string;
  color: "success" | "primary" | "soft-blue" | "warning";
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  skills: string[];
  date: string;
  link?: string;
}

interface PortfolioBadge {
  id: string;
  name: string;
  icon: string;
  color: string;
  isLocked: boolean;
  earnedDate?: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_SKILLS: Skill[] = [
  {
    id: "skill-1",
    name: "Communicatie",
    level: "Advanced",
    progress: 85,
    icon: "chat_bubble",
    color: "primary",
  },
  {
    id: "skill-2",
    name: "Teamwork",
    level: "Advanced",
    progress: 90,
    icon: "group",
    color: "success",
  },
  {
    id: "skill-3",
    name: "Probleemoplossing",
    level: "Intermediate",
    progress: 70,
    icon: "lightbulb",
    color: "warning",
  },
  {
    id: "skill-4",
    name: "Tijd Management",
    level: "Intermediate",
    progress: 65,
    icon: "schedule",
    color: "soft-blue",
  },
];

const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Community Platform Design",
    description: "Designed and prototyped a community engagement platform with figma",
    image: "bg-gradient-to-br from-blue-400 to-blue-600",
    skills: ["Design", "UI/UX", "Figma"],
    date: "Jan 2024",
  },
  {
    id: "proj-2",
    title: "Interview Preparation Workshop",
    description: "Led a workshop teaching 15+ peers interview techniques and soft skills",
    image: "bg-gradient-to-br from-purple-400 to-purple-600",
    skills: ["Leadership", "Communication", "Training"],
    date: "Dec 2023",
  },
  {
    id: "proj-3",
    title: "Career Path Analysis",
    description: "Analyzed career opportunities and created a personal development plan",
    image: "bg-gradient-to-br from-green-400 to-green-600",
    skills: ["Research", "Analysis", "Planning"],
    date: "Nov 2023",
  },
];

const MOCK_BADGES: PortfolioBadge[] = [
  {
    id: "badge-1",
    name: "First Steps",
    icon: "verified",
    color: "text-success",
    isLocked: false,
    earnedDate: "2024-02-01",
  },
  {
    id: "badge-2",
    name: "Communicator",
    icon: "chat_bubble",
    color: "text-primary",
    isLocked: false,
    earnedDate: "2024-02-05",
  },
  {
    id: "badge-3",
    name: "Team Player",
    icon: "group",
    color: "text-soft-blue",
    isLocked: false,
    earnedDate: "2024-02-10",
  },
  {
    id: "badge-4",
    name: "Challenge Master",
    icon: "bolt",
    color: "text-warning",
    isLocked: false,
    earnedDate: "2024-02-15",
  },
  {
    id: "badge-5",
    name: "Knowledge Keeper",
    icon: "school",
    color: "text-success",
    isLocked: true,
  },
  {
    id: "badge-6",
    name: "Leadership",
    icon: "shield",
    color: "text-primary",
    isLocked: true,
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Skill card with progress bar
 */
const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const colorMap = {
    success: "bg-success/10 text-success",
    primary: "bg-primary/10 text-primary",
    "soft-blue": "bg-soft-blue/10 text-soft-blue",
    warning: "bg-warning/10 text-warning",
  };

  const progressColorMap = {
    success: "bg-success",
    primary: "bg-primary",
    "soft-blue": "bg-soft-blue",
    warning: "bg-warning",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className={cn("p-3 rounded-lg", colorMap[skill.color])}>
              <span className="material-symbols-outlined text-2xl fill-1">
                {skill.icon}
              </span>
            </div>
            <div>
              <h3 className="font-display font-bold text-txt text-sm">
                {skill.name}
              </h3>
              <p className="text-xs text-txt-secondary">{skill.level}</p>
            </div>
          </div>
          <span className="text-sm font-bold text-txt-secondary">
            {skill.progress}%
          </span>
        </div>
        <div className="w-full bg-bg-light dark:bg-[#3d2a35] h-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${skill.progress}%` }}
            transition={{ duration: 0.8 }}
            className={cn("h-full rounded-full", progressColorMap[skill.color])}
          />
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * Project card
 */
const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className={cn("h-32 w-full", project.image)} />
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="font-display font-bold text-lg text-txt mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-txt-secondary mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border-light">
            <span className="text-xs text-txt-secondary font-sans">
              {project.date}
            </span>
            <Button variant="ghost" size="sm" className="text-primary">
              Bekijk
              <span className="material-symbols-outlined ml-1 text-sm">
                arrow_outward
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/**
 * Badge card
 */
const BadgeCard: React.FC<{ badge: PortfolioBadge; index: number }> = ({
  badge,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: badge.isLocked ? 1 : 1.05 }}
    >
      <Card
        className={cn(
          "aspect-square flex flex-col items-center justify-center p-4 relative",
          badge.isLocked && "opacity-40 grayscale"
        )}
      >
        <span className={cn("material-symbols-outlined text-4xl fill-1", badge.color)}>
          {badge.icon}
        </span>
        {!badge.isLocked && (
          <div className="absolute -top-2 -right-2 size-4 bg-success rounded-full border-2 border-white dark:border-surface-light" />
        )}
        {badge.isLocked && (
          <div className="absolute -top-2 -right-2 size-4 bg-gray-400 rounded-full border-2 border-white dark:border-surface-light flex items-center justify-center">
            <span className="material-symbols-outlined text-[10px]">lock</span>
          </div>
        )}
      </Card>
      <p className="text-xs font-sans font-semibold text-txt mt-3 text-center">
        {badge.name}
      </p>
      {!badge.isLocked && badge.earnedDate && (
        <p className="text-[10px] text-txt-secondary text-center mt-1">
          {new Date(badge.earnedDate).toLocaleDateString("nl-NL", {
            month: "short",
            day: "numeric",
          })}
        </p>
      )}
    </motion.div>
  );
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<"skills" | "projects" | "badges">(
    "skills"
  );

  const tabs: Array<{
    id: "skills" | "projects" | "badges";
    label: string;
    icon: string;
  }> = [
    { id: "skills", label: "Vaardigheden", icon: "stars" },
    { id: "projects", label: "Projecten", icon: "folder_open" },
    { id: "badges", label: "Badges", icon: "military_tech" },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-txt mb-2">
          Jouw Portfolio
        </h1>
        <p className="text-txt-secondary font-sans text-lg">
          Toon je vaardigheden, projecten en verdienste badges
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex gap-2 md:gap-4 border-b border-border-light"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-200 font-sans font-semibold",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-txt-secondary hover:text-txt"
            )}
          >
            <span className="material-symbols-outlined text-xl">
              {tab.icon}
            </span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <div>
        {/* Vaardigheden Tab */}
        {activeTab === "skills" && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {MOCK_SKILLS.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} index={i} />
            ))}
          </motion.div>
        )}

        {/* Projecten Tab */}
        {activeTab === "projects" && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {MOCK_PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        )}

        {/* Badges Tab */}
        {activeTab === "badges" && (
          <motion.div
            key="badges"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
          >
            {MOCK_BADGES.map((badge, i) => (
              <BadgeCard key={badge.id} badge={badge} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
