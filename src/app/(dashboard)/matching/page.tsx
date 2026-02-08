"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// ============================================================================
// TYPES
// ============================================================================

type OpportunityType = "stage" | "baan" | "freelance";
type LocationFilter = "all" | "amsterdam" | "rotterdam" | "groningen" | "remote";
type SectorFilter = "all" | "tech" | "finance" | "healthcare" | "education" | "marketing";

interface Opportunity {
  id: string;
  company: string;
  role: string;
  location: string;
  type: OpportunityType;
  matchPercentage: number;
  requiredSkills: string[];
  description: string;
  logo?: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-1",
    company: "TechVision",
    role: "Junior UX Designer",
    location: "Amsterdam",
    type: "baan",
    matchPercentage: 92,
    requiredSkills: ["UI/UX", "Figma", "Communication"],
    description: "Looking for a talented designer to join our team",
  },
  {
    id: "opp-2",
    company: "GreenStart",
    role: "Marketing Stagiair",
    location: "Rotterdam",
    type: "stage",
    matchPercentage: 87,
    requiredSkills: ["Marketing", "Social Media", "Analytics"],
    description: "Help us grow our digital presence and brand awareness",
  },
  {
    id: "opp-3",
    company: "DataFlow",
    role: "Business Analyst",
    location: "Amsterdam",
    type: "freelance",
    matchPercentage: 78,
    requiredSkills: ["Analysis", "Problem Solving", "Data"],
    description: "Short-term project analyzing customer behavior patterns",
  },
  {
    id: "opp-4",
    company: "CloudForce",
    role: "Project Coordinator",
    location: "Remote",
    type: "baan",
    matchPercentage: 85,
    requiredSkills: ["Organization", "Leadership", "Communication"],
    description: "Lead cross-functional teams to deliver projects on time",
  },
  {
    id: "opp-5",
    company: "InnovateLab",
    role: "Content Creator",
    location: "Groningen",
    type: "stage",
    matchPercentage: 81,
    requiredSkills: ["Writing", "Communication", "Creativity"],
    description: "Create engaging content for our digital platforms",
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Match percentage circle
 */
const MatchCircle: React.FC<{ percentage: number }> = ({ percentage }) => {
  const color = percentage >= 85 ? "success" : percentage >= 70 ? "primary" : "warning";
  const colorMap = {
    success: "text-success",
    primary: "text-primary",
    warning: "text-warning",
  };

  return (
    <div className={cn("relative w-20 h-20 flex items-center justify-center")}>
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-bg-light dark:text-[#3d2a35]"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={`${(percentage / 100) * 2 * Math.PI * 45} ${2 * Math.PI * 45}`}
          initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.8 }}
          strokeLinecap="round"
          className={cn("transition-colors", colorMap[color])}
        />
      </svg>
      <span className={cn("text-lg font-display font-bold", colorMap[color])}>
        {percentage}%
      </span>
    </div>
  );
};

/**
 * Opportunity card
 */
const OpportunityCard: React.FC<{ opportunity: Opportunity; index: number }> = ({
  opportunity,
  index,
}) => {
  const typeMap = {
    stage: { label: "Stage", color: "bg-soft-blue/10 text-soft-blue" },
    baan: { label: "Baan", color: "bg-success/10 text-success" },
    freelance: { label: "Freelance", color: "bg-primary/10 text-primary" },
  };

  const typeConfig = typeMap[opportunity.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="pb-0">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white font-bold">
                  {opportunity.company.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-txt-secondary font-sans">
                    {opportunity.company}
                  </p>
                  <h3 className="font-display font-bold text-txt">
                    {opportunity.role}
                  </h3>
                </div>
              </div>
            </div>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap",
                typeConfig.color
              )}
            >
              {typeConfig.label}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pb-4">
          <div className="flex items-center gap-2 mb-4 text-sm text-txt-secondary">
            <span className="material-symbols-outlined text-lg">location_on</span>
            <span>{opportunity.location}</span>
          </div>

          <div className="mb-4">
            <p className="text-xs font-sans text-txt-secondary mb-3 font-semibold uppercase">
              Vereiste Vaardigheden
            </p>
            <div className="flex flex-wrap gap-2">
              {opportunity.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-block px-2 py-1 bg-bg-light dark:bg-[#3d2a35] text-txt text-xs font-sans rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 items-center gap-4 pt-4 border-t border-border-light">
            <div>
              <p className="text-xs text-txt-secondary font-sans mb-2">Match %</p>
              <MatchCircle percentage={opportunity.matchPercentage} />
            </div>
            <Button variant="primary" size="sm" className="h-12 w-full">
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

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function MatchingPage() {
  const [typeFilter, setTypeFilter] = useState<OpportunityType | "all">("all");
  const [locationFilter, setLocationFilter] = useState<LocationFilter>("all");
  const [sectorFilter, setSectorFilter] = useState<SectorFilter>("all");

  const filteredOpportunities = MOCK_OPPORTUNITIES.filter((opp) => {
    if (typeFilter !== "all" && opp.type !== typeFilter) return false;
    return true;
  });

  const stats = {
    total: MOCK_OPPORTUNITIES.length,
    average: Math.round(
      MOCK_OPPORTUNITIES.reduce((sum, opp) => sum + opp.matchPercentage, 0) /
        MOCK_OPPORTUNITIES.length
    ),
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-txt mb-2">
          Jouw Matches
        </h1>
        <p className="text-txt-secondary font-sans text-lg">
          Ontdek kansen die perfect voor jou zijn
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-2xl fill-1">
                inbox
              </span>
            </div>
            <div>
              <p className="text-xs text-txt-secondary uppercase font-sans">
                Beschikbare kansen
              </p>
              <p className="text-2xl font-display font-bold text-txt">
                {stats.total}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-success/10 text-success">
              <span className="material-symbols-outlined text-2xl fill-1">
                check_circle
              </span>
            </div>
            <div>
              <p className="text-xs text-txt-secondary uppercase font-sans">
                Gem. Match %
              </p>
              <p className="text-2xl font-display font-bold text-txt">
                {stats.average}%
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* Type Filter */}
        <Card className="p-4">
          <p className="text-xs font-sans font-semibold text-txt-secondary mb-3 uppercase">
            Type
          </p>
          <div className="space-y-2">
            {["all", "stage", "baan", "freelance"].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type as any)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-sans",
                  typeFilter === type
                    ? "bg-primary text-white"
                    : "hover:bg-bg-light text-txt"
                )}
              >
                {type === "all" ? "Alles" : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </Card>

        {/* Location Filter */}
        <Card className="p-4">
          <p className="text-xs font-sans font-semibold text-txt-secondary mb-3 uppercase">
            Locatie
          </p>
          <div className="space-y-2">
            {[
              { value: "all" as LocationFilter, label: "Alles" },
              { value: "amsterdam" as LocationFilter, label: "Amsterdam" },
              { value: "rotterdam" as LocationFilter, label: "Rotterdam" },
              { value: "groningen" as LocationFilter, label: "Groningen" },
              { value: "remote" as LocationFilter, label: "Remote" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setLocationFilter(value)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-sans",
                  locationFilter === value
                    ? "bg-primary text-white"
                    : "hover:bg-bg-light text-txt"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </Card>

        {/* Sector Filter */}
        <Card className="p-4">
          <p className="text-xs font-sans font-semibold text-txt-secondary mb-3 uppercase">
            Sector
          </p>
          <div className="space-y-2">
            {[
              { value: "all" as SectorFilter, label: "Alles" },
              { value: "tech" as SectorFilter, label: "Technologie" },
              { value: "finance" as SectorFilter, label: "Finance" },
              { value: "healthcare" as SectorFilter, label: "Gezondheidszorg" },
              { value: "education" as SectorFilter, label: "Onderwijs" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSectorFilter(value)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-sans",
                  sectorFilter === value
                    ? "bg-primary text-white"
                    : "hover:bg-bg-light text-txt"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Opportunities Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filteredOpportunities.map((opp, i) => (
          <OpportunityCard key={opp.id} opportunity={opp} index={i} />
        ))}
      </motion.div>

      {filteredOpportunities.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <span className="material-symbols-outlined text-6xl text-txt-secondary mb-4 block">
            search_off
          </span>
          <p className="text-txt-secondary font-sans text-lg">
            Geen opportuniteiten gevonden met de geselecteerde filters
          </p>
        </motion.div>
      )}
    </div>
  );
}
