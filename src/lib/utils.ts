import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatXP(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k`;
  return xp.toString();
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Goedemorgen";
  if (hour < 18) return "Goedemiddag";
  return "Goedenavond";
}

export function calculateLevel(xp: number): { level: number; progress: number; nextLevelXP: number } {
  const baseXP = 100;
  const multiplier = 1.5;
  let level = 1;
  let totalXP = 0;
  let nextLevelXP = baseXP;

  while (totalXP + nextLevelXP <= xp) {
    totalXP += nextLevelXP;
    level++;
    nextLevelXP = Math.floor(baseXP * Math.pow(multiplier, level - 1));
  }

  const progress = ((xp - totalXP) / nextLevelXP) * 100;
  return { level, progress, nextLevelXP };
}
