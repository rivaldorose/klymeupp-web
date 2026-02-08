"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// ============================================================================
// TYPES
// ============================================================================

interface KPICard {
  id: string;
  label: string;
  value: number | string;
  icon: string;
  color: "primary" | "success" | "warning" | "soft-blue";
  trend?: number;
}

interface Application {
  id: string;
  candidateName: string;
  stage: string;
  matchPercentage: number;
  status: "new" | "reviewing" | "accepted" | "rejected";
  timestamp: string;
}

interface TopCandidate {
  id: string;
  name: string;
  matchPercentage: number;
  skills: string[];
  avatar: string;
}

interface Challenge {
  id: string;
  title: string;
  totalParticipants: number;
  completions: number;
  progress: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_KPIS: KPICard[] = [
  {
    id: "kpi-1",
    label: "Actieve Vacatures",
    value: 12,
    icon: "briefcase",
    color: "primary",
    trend: 2,
  },
  {
    id: "kpi-2",
    label: "Kandidaten",
    value: 248,
    icon: "people",
    color: "success",
    trend: 15,
  },
  {
    id: "kpi-3",
    label: "Match Rate",
    value: "78%",
    icon: "trending_up",
    color: "warning",
    trend: -3,
  },
  {
    id: "kpi-4",
    label: "Challenges Live",
    value: 5,
    icon: "emoji_events",
    color: "soft-blue",
    trend: 1,
  },
];

const MOCK_APPLICATIONS: Application[] = [
  {
    id: "app-1",
    candidateName: "Sophie van Dijk",
    stage: "Junior UX Designer",
    matchPercentage: 92,
    status: "new",
    timestamp: "2 minuten geleden",
  },
  {
    id: "app-2",
    candidateName: "Marco de Silva",
    stage: "Marketing Stagiair",
    matchPercentage: 87,
    status: "reviewing",
    timestamp: "1 uur geleden",
  },
  {
    id: "app-3",
    candidateName: "Emma Konings",
    stage: "Project Coordinator",
    matchPercentage: 85,
    status: "accepted",
    timestamp: "3 uur geleden",
  },
  {
    id: "app-4",
    candidateName: "Lars de B.",
    stage: "Business Analyst",
    matchPercentage: 78,
    status: "reviewing",
    timestamp: "5 uur geleden",
  },
];

const MOCK_TOP_CANDIDATES: TopCandidate[] = [
  {
    id: "cand-1",
    name: "Sophie V.",
    matchPercentage: 95,
    skills: ["Design", "UI/UX", "Figma"],
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8CaIHrIeWcjB_oAh12PsRfd8Dns-ABqqFw9xuRzVfZPQSozRLBV_KZTrAn1Cs4lmeeo34tOsIaUr1x-4rnNTVKFRwkax9_beFvIS3bbZ8MzqulaUrU7f_VUTTigK98R7kl8VJhd9H48_JVWg5aWOc03mTjExLStgsOvJn7mKX4SkB3VSYNQI6VGRNtx1tANb-y3YTGsV6yyDfZL2CVaEIf_wNjbD7MwiuCev1kcsi2PeW0cvNrOYwLWB46fIPEMA6437qF_04CZk",
  },
  {
    id: "cand-2",
    name: "Lars B.",
    matchPercentage: 91,
    skills: ["Analysis", "Data", "SQL"],
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgfg9Xqvt0hDPz3eJ19xX9X9l68hEk2wZMvF1floU7FYX1RZmsDYg4VHZm9Lc1miGtpHA65WeSy6knU_VSbqlPFpLOYMVacIu1KWuXUsJCWiy2aeo5R1ry2D15CqgqBrQOLkCrFdnHeBqN7OdUOkx72X3vc-Pu6e1KMqpk8g476OnEUSGRF3azc731wzEVoLbRxyXS86VYNJZX6LaCZVsdBblM1PkH2xAGF_yToLb4sE0r1f4kCKkKTUGbdaMPdUszVHLmkJBZMgk",
  },
  {
    id: "cand-3",
    name: "Emma K.",
    matchPercentage: 88,
    skills: ["Leadership", "Communication", "Project Mgmt"],
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtesd5U7uTfcTpT0mFBXSocgyAYRRElMZ_BN9h5Q19M7nXZyW0J_M45nzFPn2oxmXqH0YiSaMdhUHAYnwvq5RFOY_xal8Ya2iCp7z3TgjEO16DQR8Lyk1E3grlVNjAdyewLPMEt6F56g3_eqtLizqaI_Z6iHIQs259x-ZfbI4WSTM0kQDQ7eitYiVGQ2MqakdkX3wa1n1oLEebKarMLUxXlClz_Fpnp3jcV8XJSHTTCy6xPI6vAOCw7_QqpP5g4B4kK3S7WBQgYLE",
  },
];

const MOCK_CHALLENGES: Challenge[] = [
  {
    id: "challenge-1",
    title: "Interview Skills Master",
    totalParticipants: 84,
    completions: 62,
    progress: 74,
  },
  {
    id: "challenge-2",
    title: "CV Writing Expert",
    totalParticipants: 56,
    completions: 38,
    progress: 68,
  },
  {
    id: "challenge-3",
    title: "Networking Pro",
    totalParticipants: 92,
    completions: 71,
    progress: 77,
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * KPI Card
 */
const KPICard: React.FC<{ kpi: KPICard; index: number }> = ({ kpi, index }) => {
  const colorMap = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    "soft-blue": "bg-soft-blue/10 text-soft-blue",
  };

  const trendColor = kpi.trend && kpi.trend > 0 ? "text-success" : kpi.trend && kpi.trend < 0 ? "text-warning" : "text-txt-secondary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("p-3 rounded-lg", colorMap[kpi.color])}>
            <span className="material-symbols-outlined text-2xl fill-1">
              {kpi.icon}
            </span>
          </div>
          {kpi.trend !== undefined && (
            <div className={cn("flex items-center gap-1 text-xs font-bold", trendColor)}>
              <span className="material-symbols-outlined text-base">
                {kpi.trend > 0 ? "trending_up" : kpi.trend < 0 ? "trending_down" : "remove"}
              </span>
              {Math.abs(kpi.trend)}%
            </div>
          )}
        </div>
        <p className="text-xs text-txt-secondary uppercase font-sans font-semibold mb-1">
          {kpi.label}
        </p>
        <p className="text-3xl font-partner font-bold text-txt">
          {kpi.value}
        </p>
      </Card>
    </motion.div>
  );
};

/**
 * Application row
 */
const ApplicationRow: React.FC<{ app: Application; index: number }> = ({
  app,
  index,
}) => {
  const statusMap = {
    new: { label: "Nieuw", color: "bg-primary/10 text-primary" },
    reviewing: { label: "Beoordeling", color: "bg-warning/10 text-warning" },
    accepted: { label: "Geaccepteerd", color: "bg-success/10 text-success" },
    rejected: { label: "Afgewezen", color: "bg-[#f5222d]/10 text-[#f5222d]" },
  };

  const statusConfig = statusMap[app.status];

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b border-border-light hover:bg-bg-light/50 transition-colors"
    >
      <td className="px-6 py-4 text-sm font-partner text-txt">
        {app.candidateName}
      </td>
      <td className="px-6 py-4 text-sm font-partner text-txt-secondary">
        {app.stage}
      </td>
      <td className="px-6 py-4 text-sm font-partner font-semibold">
        <div className="flex items-center gap-2">
          <div className="w-12 h-2 bg-bg-light rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${app.matchPercentage}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-primary"
            />
          </div>
          <span className="text-primary">{app.matchPercentage}%</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm">
        <span className={cn("px-3 py-1 rounded-full text-xs font-bold", statusConfig.color)}>
          {statusConfig.label}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-txt-secondary font-partner">
        {app.timestamp}
      </td>
      <td className="px-6 py-4 text-sm">
        <Button variant="ghost" size="sm" className="text-primary">
          Bekijk
        </Button>
      </td>
    </motion.tr>
  );
};

/**
 * Top candidate card
 */
const TopCandidateCard: React.FC<{ candidate: TopCandidate; index: number }> = ({
  candidate,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center gap-4 p-4 rounded-lg border border-border-light hover:bg-bg-light/50 transition-colors"
    >
      <img
        src={candidate.avatar}
        alt={candidate.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <p className="font-partner font-bold text-txt">{candidate.name}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {candidate.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-partner"
            >
              {skill}
            </span>
          ))}
          {candidate.skills.length > 2 && (
            <span className="text-xs text-txt-secondary font-partner">
              +{candidate.skills.length - 2}
            </span>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-partner font-bold text-primary">
          {candidate.matchPercentage}%
        </p>
        <p className="text-xs text-txt-secondary font-partner">Match</p>
      </div>
    </motion.div>
  );
};

/**
 * Challenge card
 */
const ChallengeCard: React.FC<{ challenge: Challenge; index: number }> = ({
  challenge,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="p-6">
        <h3 className="font-partner font-bold text-txt mb-4">{challenge.title}</h3>
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-txt-secondary font-partner">
              {challenge.completions} / {challenge.totalParticipants} voltooid
            </span>
            <span className="text-primary font-bold font-partner">
              {challenge.progress}%
            </span>
          </div>
          <div className="w-full bg-bg-light rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${challenge.progress}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-primary to-primary/50"
            />
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Details bekijken
        </Button>
      </Card>
    </motion.div>
  );
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function PartnerDashboardPage() {
  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-partner font-bold text-txt mb-2">
          Welkom terug!
        </h1>
        <p className="text-txt-secondary font-partner text-lg">
          Partner Dashboard - KlymeUpp
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {MOCK_KPIS.map((kpi, i) => (
          <KPICard key={kpi.id} kpi={kpi} index={i} />
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Applications Table */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-partner font-bold text-txt">
                Recente Sollicitaties
              </h2>
              <Button variant="ghost" size="sm" className="text-primary">
                Alles bekijken
                <span className="material-symbols-outlined ml-1 text-base">
                  chevron_right
                </span>
              </Button>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-light bg-bg-light/50">
                      <th className="px-6 py-4 text-left text-xs font-partner font-bold text-txt-secondary uppercase">
                        Kandidaat
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-partner font-bold text-txt-secondary uppercase">
                        Functie
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-partner font-bold text-txt-secondary uppercase">
                        Match
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-partner font-bold text-txt-secondary uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-partner font-bold text-txt-secondary uppercase">
                        Moment
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-partner font-bold text-txt-secondary uppercase">
                        Actie
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_APPLICATIONS.map((app, i) => (
                      <ApplicationRow key={app.id} app={app} index={i} />
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="space-y-8">
          {/* Top Candidates */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-partner font-bold text-txt">
                Top Kandidaten
              </h2>
            </div>
            <div className="space-y-3">
              {MOCK_TOP_CANDIDATES.map((candidate, i) => (
                <TopCandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  index={i}
                />
              ))}
            </div>
          </motion.div>

          {/* Active Challenges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-partner font-bold text-txt">
                Actieve Challenges
              </h2>
            </div>
            <div className="space-y-4">
              {MOCK_CHALLENGES.map((challenge, i) => (
                <ChallengeCard key={challenge.id} challenge={challenge} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
