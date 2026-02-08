"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn, getGreeting, formatXP, calculateLevel } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { User, Badge, Challenge } from "@/types";

// ============================================================================
// TYPES
// ============================================================================

interface LearningPath {
  id: string;
  name: string;
  progress: number;
  modulesCompleted: number;
  modulesTotal: number;
  nextLesson: string;
  color: "success" | "primary" | "soft-blue";
}

interface LeaderboardEntry {
  rank: number;
  user: User;
  xp: number;
  isCurrentUser?: boolean;
}

interface BadgeItem {
  id: string;
  name: string;
  icon: string;
  earnedDate: string;
  isLocked: boolean;
  color: "success" | "soft-blue" | "primary" | "soft-orange";
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_CURRENT_USER: User = {
  id: "user-1",
  email: "alex@example.com",
  name: "Alex",
  avatar_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAj439sNQqzT3gMXfgRgAqQX1q7n1VI2BsGuAFtGfI7mVdf-VxWuiWHiajL04RDEea5sQNVIkKhu_d9x-u_n0iROOYYUgYii91KTZR3nTrMiVhfoC-APIddmtFhBi61__qY9CDttc9SuxsJoTYTpKF6of4EznReD1VPiW8KVnAXF_SXhygxuDjdWxEQSpd-7eXJ6mR6uGzJ4vJmulNniR04SmBKZ7C49w9rsJb0vm_lS0jqwLIp1AAbCbxhJeUbRcO1KkjlNkKhkEY",
  role: "jongere",
  xp: 1250,
  level: 3,
  streak: 7,
  badges: [],
  created_at: new Date().toISOString(),
};

const MOCK_DAILY_CHALLENGE: Challenge = {
  id: "challenge-1",
  title: "Interview Skills: Stel jezelf voor in 60 sec",
  description: "Perfectie je elevator pitch en maak indruk op je potentiële werkgever.",
  category: "dagelijks",
  difficulty: "intermediate",
  xp_reward: 50,
  duration_minutes: 15,
  status: "nieuw",
  image_url: undefined,
  rating: 4.5,
  steps: [
    {
      id: "step-1",
      title: "Voorbereiding",
      description: "Schrijf je 60-secondenpitch op",
      type: "open",
      completed: false,
    },
    {
      id: "step-2",
      title: "Opname",
      description: "Neem jezelf op",
      type: "upload",
      completed: false,
    },
  ],
};

const MOCK_LEARNING_PATHS: LearningPath[] = [
  {
    id: "path-1",
    name: "Soft Skills",
    progress: 65,
    modulesCompleted: 4,
    modulesTotal: 6,
    nextLesson: "Communicatie",
    color: "success",
  },
  {
    id: "path-2",
    name: "Praktijkvaardigheden",
    progress: 30,
    modulesCompleted: 2,
    modulesTotal: 8,
    nextLesson: "Excel Basics",
    color: "primary",
  },
  {
    id: "path-3",
    name: "Arbeidsmarkt Ready",
    progress: 10,
    modulesCompleted: 1,
    modulesTotal: 10,
    nextLesson: "CV Schrijven",
    color: "soft-blue",
  },
];

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      id: "user-2",
      name: "Sophie V.",
      email: "sophie@example.com",
      role: "jongere",
      xp: 2450,
      level: 5,
      streak: 12,
      badges: [],
      created_at: new Date().toISOString(),
      avatar_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8CaIHrIeWcjB_oAh12PsRfd8Dns-ABqqFw9xuRzVfZPQSozRLBV_KZTrAn1Cs4lmeeo34tOsIaUr1x-4rnNTVKFRwkax9_beFvIS3bbZ8MzqulaUrU7f_VUTTigK98R7kl8VJhd9H48_JVWg5aWOc03mTjExLStgsOvJn7mKX4SkB3VSYNQI6VGRNtx1tANb-y3YTGsV6yyDfZL2CVaEIf_wNjbD7MwiuCev1kcsi2PeW0cvNrOYwLWB46fIPEMA6437qF_04CZk",
    },
    xp: 2450,
  },
  {
    rank: 2,
    user: {
      id: "user-3",
      name: "Lars de B.",
      email: "lars@example.com",
      role: "jongere",
      xp: 2120,
      level: 4,
      streak: 8,
      badges: [],
      created_at: new Date().toISOString(),
      avatar_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgfg9Xqvt0hDPz3eJ19xX9X9l68hEk2wZMvF1floU7FYX1RZmsDYg4VHZm9Lc1miGtpHA65WeSy6knU_VSbqlPFpLOYMVacIu1KWuXUsJCWiy2aeo5R1ry2D15CqgqBrQOLkCrFdnHeBqN7OdUOkx72X3vc-Pu6e1KMqpk8g476OnEUSGRF3azc731wzEVoLbRxyXS86VYNJZX6LaCZVsdBblM1PkH2xAGF_yToLb4sE0r1f4kCKkKTUGbdaMPdUszVHLmkJBZMgk",
    },
    xp: 2120,
  },
  {
    rank: 3,
    user: {
      id: "user-4",
      name: "Emma K.",
      email: "emma@example.com",
      role: "jongere",
      xp: 1980,
      level: 3,
      streak: 5,
      badges: [],
      created_at: new Date().toISOString(),
      avatar_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtesd5U7uTfcTpT0mFBXSocgyAYRRElMZ_BN9h5Q19M7nXZyW0J_M45nzFPn2oxmXqH0YiSaMdhUHAYnwvq5RFOY_xal8Ya2iCp7z3TgjEO16DQR8Lyk1E3grlVNjAdyewLPMEt6F56g3_eqtLizqaI_Z6iHIQs259x-ZfbI4WSTM0kQDQ7eitYiVGQ2MqakdkX3wa1n1oLEebKarMLUxXlClz_Fpnp3jcV8XJSHTTCy6xPI6vAOCw7_QqpP5g4B4kK3S7WBQgYLE",
    },
    xp: 1980,
  },
  {
    rank: 4,
    user: {
      id: "user-5",
      name: "Marco S.",
      email: "marco@example.com",
      role: "jongere",
      xp: 1750,
      level: 3,
      streak: 3,
      badges: [],
      created_at: new Date().toISOString(),
      avatar_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8CaIHrIeWcjB_oAh12PsRfd8Dns-ABqqFw9xuRzVfZPQSozRLBV_KZTrAn1Cs4lmeeo34tOsIaUr1x-4rnNTVKFRwkax9_beFvIS3bbZ8MzqulaUrU7f_VUTTigK98R7kl8VJhd9H48_JVWg5aWOc03mTjExLStgsOvJn7mKX4SkB3VSYNQI6VGRNtx1tANb-y3YTGsV6yyDfZL2CVaEIf_wNjbD7MwiuCev1kcsi2PeW0cvNrOYwLWB46fIPEMA6437qF_04CZk",
    },
    xp: 1750,
  },
  {
    rank: 5,
    user: {
      id: "user-1",
      name: "Alex",
      email: "alex@example.com",
      role: "jongere",
      xp: 1250,
      level: 3,
      streak: 7,
      badges: [],
      created_at: new Date().toISOString(),
      avatar_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAj439sNQqzT3gMXfgRgAqQX1q7n1VI2BsGuAFtGfI7mVdf-VxWuiWHiajL04RDEea5sQNVIkKhu_d9x-u_n0iROOYYUgYii91KTZR3nTrMiVhfoC-APIddmtFhBi61__qY9CDttc9SuxsJoTYTpKF6of4EznReD1VPiW8KVnAXF_SXhygxuDjdWxEQSpd-7eXJ6mR6uGzJ4vJmulNniR04SmBKZ7C49w9rsJb0vm_lS0jqwLIp1AAbCbxhJeUbRcO1KkjlNkKhkEY",
    },
    xp: 1250,
    isCurrentUser: true,
  },
];

const MOCK_BADGES: BadgeItem[] = [
  {
    id: "badge-1",
    name: "First Steps",
    icon: "verified",
    earnedDate: "2024-02-01",
    isLocked: false,
    color: "success",
  },
  {
    id: "badge-2",
    name: "Launch Pad",
    icon: "rocket_launch",
    earnedDate: "2024-02-03",
    isLocked: false,
    color: "soft-blue",
  },
  {
    id: "badge-3",
    name: "Communicator",
    icon: "chat_bubble",
    earnedDate: "2024-02-05",
    isLocked: false,
    color: "primary",
  },
  {
    id: "badge-4",
    name: "Challenge Master",
    icon: "bolt",
    earnedDate: "",
    isLocked: true,
    color: "soft-orange",
  },
  {
    id: "badge-5",
    name: "Team Player",
    icon: "group",
    earnedDate: "",
    isLocked: true,
    color: "success",
  },
  {
    id: "badge-6",
    name: "Knowledge Keeper",
    icon: "school",
    earnedDate: "",
    isLocked: true,
    color: "soft-blue",
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Animated heading component with stagger effect
 */
const AnimatedHeading: React.FC<{
  greeting: string;
  name: string;
  subtext: string;
}> = ({ greeting, name, subtext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl md:text-5xl font-display font-bold text-txt mb-2">
        {greeting}, <span className="text-primary">{name}</span>! 👋
      </h1>
      <p className="text-txt-secondary font-sans text-lg">
        {subtext}
      </p>
    </motion.div>
  );
};

/**
 * Level progress card with animation
 */
const LevelProgressCard: React.FC = () => {
  const { level, progress } = calculateLevel(MOCK_CURRENT_USER.xp);
  const levelNames = [
    "Ontdekker",
    "Exploreerder",
    "Avonturier",
    "Verkenner",
    "Meester",
  ];
  const levelName = levelNames[level - 1] || "Legenda";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="p-6 border-2 border-primary/20">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-primary">
            Level {level} — {levelName}
          </span>
          <span className="text-xs font-bold text-txt-secondary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-bg-light dark:bg-[#3d2a35] h-3 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-primary to-pink-400 h-full rounded-full"
          />
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * Daily challenge card with gradient background
 */
const DailyChallengeCard: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-pink-400 to-pink-300 p-8 text-white shadow-lg group">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]">
                timer
              </span>
              Nog 8 uur
            </div>
            <h2 className="text-3xl font-display font-bold mb-3 leading-tight">
              {MOCK_DAILY_CHALLENGE.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined fill-1 text-[20px]">
                  workspace_premium
                </span>
                <span className="font-bold">+{MOCK_DAILY_CHALLENGE.xp_reward} XP</span>
              </div>
              <div className="w-1 h-1 bg-white/50 rounded-full" />
              <span className="font-medium">
                {MOCK_DAILY_CHALLENGE.duration_minutes} min
              </span>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Button
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-full font-bold text-sm whitespace-nowrap"
              onClick={() => console.log("Start challenge clicked")}
            >
              Start Challenge
            </Button>
          </motion.div>
        </div>
        {/* Background decoration */}
        <div className="absolute -right-10 -bottom-10 size-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
      </div>
    </motion.section>
  );
};

/**
 * Circular progress indicator for learning paths
 */
const CircularProgress: React.FC<{
  progress: number;
  color: "success" | "primary" | "soft-blue";
  size?: number;
}> = ({ progress, color, size = 24 }) => {
  const colorMap = {
    success: "stroke-success",
    primary: "stroke-primary",
    "soft-blue": "stroke-soft-blue",
  };

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg className={`size-${size}`} viewBox="0 0 40 40">
      <circle
        className="stroke-bg-light dark:stroke-[#3d2a35]"
        cx="20"
        cy="20"
        r={radius}
        fill="none"
        strokeWidth="2"
      />
      <motion.circle
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`${colorMap[color]}`}
        cx="20"
        cy="20"
        r={radius}
        fill="none"
        strokeWidth="2"
        strokeDasharray={circumference}
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Learning path card
 */
const LearningPathCard: React.FC<{ path: LearningPath; index: number }> = ({
  path,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
    >
      <Card className="p-6 flex flex-col items-center text-center h-full">
        <div className="relative size-28 mb-4 flex items-center justify-center">
          <CircularProgress progress={path.progress} color={path.color} size={28} />
          <div className="absolute text-2xl font-display font-bold text-txt">
            {Math.round(path.progress)}%
          </div>
        </div>
        <h3 className="font-display font-bold text-lg mb-1 text-txt">
          {path.name}
        </h3>
        <p className="text-xs text-txt-secondary mb-4 font-sans">
          {path.modulesCompleted}/{path.modulesTotal} modules voltooid
        </p>
        <p className="text-xs text-txt-secondary mb-5 font-sans">
          Volgende: <span className="font-semibold">{path.nextLesson}</span>
        </p>
        <Button variant="primary" size="sm" className="w-full">
          Ga verder
        </Button>
      </Card>
    </motion.div>
  );
};

/**
 * Stats KPI card
 */
const StatCard: React.FC<{
  icon: string;
  label: string;
  value: string;
  color: "success" | "warning" | "gold" | "primary";
  index: number;
}> = ({ icon, label, value, color, index }) => {
  const colorMap = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    gold: "bg-gold/10 text-gold",
    primary: "bg-primary/10 text-primary",
  };

  const borderColorMap = {
    success: "border-success/20",
    warning: "border-warning/20",
    gold: "border-gold/20",
    primary: "border-primary/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
    >
      <Card className={cn("p-6 border-2", borderColorMap[color])}>
        <div className="flex items-center gap-4">
          <div className={cn("p-3 rounded-lg", colorMap[color])}>
            <span className="material-symbols-outlined text-2xl fill-1">
              {icon}
            </span>
          </div>
          <div>
            <p className="text-xs font-sans text-txt-secondary uppercase tracking-wider">
              {label}
            </p>
            <p className="text-2xl font-display font-bold text-txt">
              {value}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * Leaderboard entry
 */
const LeaderboardEntry: React.FC<{
  entry: LeaderboardEntry;
  index: number;
}> = ({ entry, index }) => {
  const backgroundColor = entry.isCurrentUser
    ? "bg-primary/5 border-primary/30"
    : "";

  const rankColors = {
    1: "bg-gold/20 text-gold",
    2: "bg-gray-200/20 text-gray-500",
    3: "bg-orange-200/20 text-orange-600",
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return rankColors[1];
    if (rank === 2) return rankColors[2];
    if (rank === 3) return rankColors[3];
    return "bg-gray-100 dark:bg-gray-800 text-gray-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg border border-border-light transition-all",
        backgroundColor
      )}
    >
      <div
        className={cn(
          "size-10 flex items-center justify-center rounded-full font-display font-bold text-sm",
          getRankColor(entry.rank)
        )}
      >
        {entry.rank}
      </div>
      {entry.user.avatar_url && (
        <img
          src={entry.user.avatar_url}
          alt={entry.user.name}
          className="size-12 rounded-full object-cover border-2 border-border-light"
        />
      )}
      <div className="flex-1">
        <p className="font-sans font-semibold text-txt text-sm">
          {entry.user.name}
        </p>
        <p className="text-xs text-txt-secondary uppercase font-bold tracking-widest">
          {formatXP(entry.xp)} XP
        </p>
      </div>
      {entry.isCurrentUser && (
        <span className="text-xs font-bold text-primary uppercase tracking-wider">
          You
        </span>
      )}
    </motion.div>
  );
};

/**
 * Badge item
 */
const BadgeCard: React.FC<{
  badge: BadgeItem;
  index: number;
}> = ({ badge, index }) => {
  const colorMap = {
    success: "text-success",
    "soft-blue": "text-soft-blue",
    primary: "text-primary",
    "soft-orange": "text-warning",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 + index * 0.05 }}
      whileHover={{ scale: 1.05 }}
    >
      <Card
        className={cn(
          "aspect-square flex items-center justify-center relative p-4",
          badge.isLocked && "opacity-40 grayscale"
        )}
      >
        <span
          className={cn(
            "material-symbols-outlined text-5xl fill-1",
            colorMap[badge.color]
          )}
        >
          {badge.icon}
        </span>
        {!badge.isLocked && (
          <div className="absolute -top-2 -right-2 size-4 bg-primary rounded-full border-2 border-white dark:border-surface-light" />
        )}
        {badge.isLocked && (
          <div className="absolute -top-2 -right-2 size-4 bg-gray-400 rounded-full border-2 border-white dark:border-surface-light flex items-center justify-center">
            <span className="material-symbols-outlined text-xs">lock</span>
          </div>
        )}
      </Card>
      <p className="text-xs font-sans font-semibold text-txt mt-2 text-center">
        {badge.name}
      </p>
      {!badge.isLocked && (
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

export default function DashboardPage() {
  const greeting = useMemo(() => getGreeting(), []);
  const { level, progress } = calculateLevel(MOCK_CURRENT_USER.xp);

  return (
    <div className="w-full space-y-8">
      {/* Greeting Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="md:col-span-2">
          <AnimatedHeading
            greeting={greeting}
            name={MOCK_CURRENT_USER.name}
            subtext="Klaar om je carrière een boost te geven vandaag?"
          />
        </div>
        <LevelProgressCard />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Daily Challenge */}
          <DailyChallengeCard />

          {/* Learning Paths */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-display font-bold text-txt">
                Jouw Leerpaden
              </h2>
              <Button variant="ghost" size="sm" className="text-primary">
                Bekijk alles{" "}
                <span className="material-symbols-outlined ml-1">
                  chevron_right
                </span>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_LEARNING_PATHS.map((path, i) => (
                <LearningPathCard key={path.id} path={path} index={i} />
              ))}
            </div>
          </motion.section>

          {/* Stats Row */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-3xl font-display font-bold text-txt mb-6">
              Je Statistieken
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                icon="stars"
                label="Totale XP"
                value={formatXP(MOCK_CURRENT_USER.xp)}
                color="gold"
                index={0}
              />
              <StatCard
                icon="local_fire_department"
                label="Streak Dagen"
                value={MOCK_CURRENT_USER.streak.toString()}
                color="warning"
                index={1}
              />
              <StatCard
                icon="check_circle"
                label="Challenges Voltooid"
                value="12"
                color="success"
                index={2}
              />
              <StatCard
                icon="military_tech"
                label="Badges Verdiend"
                value={MOCK_BADGES.filter((b) => !b.isLocked).length.toString()}
                color="primary"
                index={3}
              />
            </div>
          </motion.section>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          {/* Leaderboard */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="flex items-center gap-2 pb-4">
                <span className="material-symbols-outlined text-warning fill-1">
                  emoji_events
                </span>
                <h2 className="text-xl font-display font-bold text-txt">
                  Leaderboard
                </h2>
              </CardHeader>
              <CardContent className="space-y-3 pb-0">
                {MOCK_LEADERBOARD.map((entry, i) => (
                  <LeaderboardEntry key={entry.user.id} entry={entry} index={i} />
                ))}
              </CardContent>
              <div className="border-t border-border-light mt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-center text-txt-secondary hover:text-primary py-3 rounded-b-2xl"
                >
                  Volledige Ranglijst
                </Button>
              </div>
            </Card>
          </motion.section>

          {/* Recent Badges */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-display font-bold text-txt">
                Nieuwe Badges
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {MOCK_BADGES.map((badge, i) => (
                <BadgeCard key={badge.id} badge={badge} index={i} />
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
