"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// ============================================================================
// TYPES
// ============================================================================

type MoodType = "excellent" | "good" | "neutral" | "sad" | "stressed";

interface WellnessTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  category: "support" | "learning" | "relaxation";
}

interface JournalEntry {
  id: string;
  date: string;
  mood: MoodType;
  entry: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_DAILY_TIP: WellnessTip = {
  id: "tip-1",
  title: "Mindfulness Oefening",
  description:
    "Neem 5 minuten om bewust adem te halen. Dit helpt je je te concentreren en stress af te bouwen. Zoek een rustige plek en focus op je ademhaling.",
  icon: "spa",
  duration: "5 min",
};

const MOCK_RESOURCES: Resource[] = [
  {
    id: "resource-1",
    title: "Mental Health Support",
    description: "Praat met een professionele counselor",
    icon: "psychology",
    link: "#",
    category: "support",
  },
  {
    id: "resource-2",
    title: "Meditatie App",
    description: "Geleide meditaties voor ontspanning",
    icon: "airplanes_mode_on",
    link: "#",
    category: "relaxation",
  },
  {
    id: "resource-3",
    title: "Stress Management Klas",
    description: "Leer technieken om stress beter aan te pakken",
    icon: "school",
    link: "#",
    category: "learning",
  },
  {
    id: "resource-4",
    title: "Fitness & Movement",
    description: "Werk aan je fysieke gezondheid",
    icon: "directions_run",
    link: "#",
    category: "relaxation",
  },
];

const MOCK_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "entry-1",
    date: "Vandaag",
    mood: "good",
    entry: "Fijne dag gehad! Interview met bedrijf X ging beter dan verwacht.",
  },
  {
    id: "entry-2",
    date: "Gisteren",
    mood: "neutral",
    entry: "Normaal dag. Veel geleerd op school.",
  },
  {
    id: "entry-3",
    date: "2 dagen geleden",
    mood: "excellent",
    entry: "Geweldige sessie met mijn mentor. Veel inzicht in mijn carrièrepath.",
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Mood emoji selector
 */
const MoodSelector: React.FC<{
  selectedMood?: MoodType;
  onMoodChange: (mood: MoodType) => void;
}> = ({ selectedMood, onMoodChange }) => {
  const moods: Array<{
    id: MoodType;
    label: string;
    emoji: string;
    color: string;
  }> = [
    { id: "excellent", label: "Fantastisch", emoji: "😄", color: "text-gold" },
    { id: "good", label: "Goed", emoji: "🙂", color: "text-success" },
    { id: "neutral", label: "Neutraal", emoji: "😐", color: "text-txt-secondary" },
    { id: "sad", label: "Verdrietig", emoji: "😢", color: "text-primary" },
    { id: "stressed", label: "Gestrest", emoji: "😰", color: "text-warning" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-display font-bold text-txt mb-6">
          Hoe voel je je vandaag?
        </h2>
        <div className="flex justify-center gap-4 md:gap-6 flex-wrap mb-6">
          {moods.map((mood) => (
            <motion.button
              key={mood.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onMoodChange(mood.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-200",
                selectedMood === mood.id
                  ? "bg-primary/20 border-2 border-primary"
                  : "border-2 border-border-light hover:bg-bg-light"
              )}
            >
              <span className="text-4xl">{mood.emoji}</span>
              <span className="text-xs font-sans font-semibold text-txt">
                {mood.label}
              </span>
            </motion.button>
          ))}
        </div>
        {selectedMood && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-txt-secondary font-sans"
          >
            Je voelt je {selectedMood === "excellent" ? "fantastisch" : selectedMood === "good" ? "goed" : selectedMood === "neutral" ? "neutraal" : selectedMood === "sad" ? "verdrietig" : "gestrest"}. Dat is oké! We zijn hier om je te helpen.
          </motion.p>
        )}
      </Card>
    </motion.div>
  );
};

/**
 * Wellness tip card
 */
const WellnessTipCard: React.FC<{ tip: WellnessTip }> = ({ tip }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="p-6 bg-gradient-to-br from-primary/5 via-soft-blue/5 to-success/5 border border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
            <span className="material-symbols-outlined text-3xl fill-1">
              {tip.icon}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-txt text-lg">
                {tip.title}
              </h3>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {tip.duration}
              </span>
            </div>
            <p className="text-sm text-txt-secondary font-sans mb-4">
              {tip.description}
            </p>
            <Button variant="primary" size="sm">
              Start nu
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * Resource card
 */
const ResourceCard: React.FC<{ resource: Resource; index: number }> = ({
  resource,
  index,
}) => {
  const categoryColors = {
    support: "bg-primary/10 text-primary",
    learning: "bg-soft-blue/10 text-soft-blue",
    relaxation: "bg-success/10 text-success",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-start gap-4 mb-4">
          <div className={cn("p-3 rounded-lg", categoryColors[resource.category])}>
            <span className="material-symbols-outlined text-2xl fill-1">
              {resource.icon}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-txt mb-1">
              {resource.title}
            </h3>
            <p className="text-xs font-semibold uppercase text-txt-secondary">
              {resource.category === "support"
                ? "Ondersteuning"
                : resource.category === "learning"
                ? "Leren"
                : "Ontspanning"}
            </p>
          </div>
        </div>
        <p className="text-sm text-txt-secondary font-sans mb-4">
          {resource.description}
        </p>
        <Button variant="outline" size="sm" className="w-full">
          Bekijk meer
          <span className="material-symbols-outlined ml-1 text-sm">
            arrow_outward
          </span>
        </Button>
      </Card>
    </motion.div>
  );
};

/**
 * Journal entry card
 */
const JournalCard: React.FC<{ entry: JournalEntry; index: number }> = ({
  entry,
  index,
}) => {
  const moodEmojis = {
    excellent: "😄",
    good: "🙂",
    neutral: "😐",
    sad: "😢",
    stressed: "😰",
  };

  const moodColors = {
    excellent: "text-gold",
    good: "text-success",
    neutral: "text-txt-secondary",
    sad: "text-primary",
    stressed: "text-warning",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{moodEmojis[entry.mood]}</span>
          <div className="flex-1">
            <p className="text-sm font-sans font-semibold text-txt">
              {entry.date}
            </p>
            <p className={cn("text-xs font-sans", moodColors[entry.mood])}>
              {entry.mood === "excellent"
                ? "Fantastisch"
                : entry.mood === "good"
                ? "Goed"
                : entry.mood === "neutral"
                ? "Neutraal"
                : entry.mood === "sad"
                ? "Verdrietig"
                : "Gestrest"}
            </p>
          </div>
        </div>
        <p className="text-sm text-txt-secondary font-sans leading-relaxed">
          {entry.entry}
        </p>
      </Card>
    </motion.div>
  );
};

/**
 * Wellness streak tracker
 */
const StreakTracker: React.FC = () => {
  const currentStreak = 7;
  const longestStreak = 14;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6 bg-gradient-to-br from-success/5 to-primary/5 border border-success/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-3xl text-success fill-1">
                local_fire_department
              </span>
              <h3 className="font-display font-bold text-txt text-lg">
                Welzijn Streak
              </h3>
            </div>
            <p className="text-sm text-txt-secondary font-sans mb-4">
              Je bent bezig met het verzorgen van jezelf!
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-display font-bold text-success">
              {currentStreak}
            </p>
            <p className="text-xs text-txt-secondary font-sans">dagen achtereen</p>
            <p className="text-xs text-txt-secondary font-sans mt-2">
              Beste: {longestStreak} dagen
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function WellbeingPage() {
  const [selectedMood, setSelectedMood] = useState<MoodType>();
  const [journalEntries, setJournalEntries] = useState(MOCK_JOURNAL_ENTRIES);

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-txt mb-2">
          Welzijn & Ondersteuning
        </h1>
        <p className="text-txt-secondary font-sans text-lg">
          Zorg goed voor jezelf en ontdek hulpbronnen
        </p>
      </motion.div>

      {/* Mood Selector */}
      <MoodSelector selectedMood={selectedMood} onMoodChange={setSelectedMood} />

      {/* Streak & Daily Tip Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StreakTracker />
        <WellnessTipCard tip={MOCK_DAILY_TIP} />
      </div>

      {/* Resources Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-display font-bold text-txt mb-6">
          Hulpbronnen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_RESOURCES.map((resource, i) => (
            <ResourceCard key={resource.id} resource={resource} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Journal Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-txt">
            Mijn Reflecties
          </h2>
          <Button variant="primary">
            Nieuw bericht
            <span className="material-symbols-outlined ml-2 text-sm">
              add
            </span>
          </Button>
        </div>
        <div className="space-y-4">
          {journalEntries.map((entry, i) => (
            <JournalCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Support CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="p-8 bg-gradient-to-r from-primary/10 to-soft-blue/10 border border-primary/20 text-center">
          <h3 className="font-display font-bold text-txt text-xl mb-3">
            Heb je ondersteuning nodig?
          </h3>
          <p className="text-txt-secondary font-sans mb-6">
            Onze gekwalificeerde counselors zijn hier om je te helpen met wat je ook nodig hebt.
          </p>
          <Button variant="primary" size="lg">
            Neem contact op met ondersteuning
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
