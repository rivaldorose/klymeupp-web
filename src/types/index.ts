export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: "jongere" | "bedrijf" | "admin";
  xp: number;
  level: number;
  streak: number;
  badges: Badge[];
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "skill" | "challenge" | "streak" | "special";
  earned_at?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: "case-study" | "training" | "bedrijf" | "dagelijks";
  difficulty: "beginner" | "intermediate" | "advanced";
  xp_reward: number;
  duration_minutes: number;
  status: "nieuw" | "bezig" | "voltooid";
  image_url?: string;
  rating?: number;
  steps: ChallengeStep[];
}

export interface ChallengeStep {
  id: string;
  title: string;
  description: string;
  type: "quiz" | "open" | "upload" | "reflection";
  completed: boolean;
}

export interface SkillNode {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: "locked" | "unlocked" | "active" | "completed";
  xp_reward: number;
  category: string;
  position: { x: number; y: number };
  prerequisites: string[];
}

export interface SkillTrack {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  nodes: SkillNode[];
  progress: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: "project" | "badge" | "certificate";
  image_url?: string;
  skills: string[];
  created_at: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  company_logo?: string;
  type: "stage" | "baan" | "freelance";
  location: string;
  match_percentage: number;
  description: string;
  skills_required: string[];
}

export interface CommunityPost {
  id: string;
  author: { name: string; avatar?: string; level: number };
  content: string;
  likes: number;
  comments: number;
  created_at: string;
  tags: string[];
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}
