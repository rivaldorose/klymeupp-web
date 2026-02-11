"use client";

import { useState } from "react";
import Link from "next/link";

// ============================================================================
// MOCK DATA
// ============================================================================

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  company: string;
  image: string;
  xp: number;
  duration: number;
  rating: number;
  status: "new" | "in-progress" | "completed";
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "User Journey Mapping",
    description: "Create detailed user journeys for a modern app",
    category: "UX DESIGN",
    company: "Google Workshop",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
    xp: 120,
    duration: 25,
    rating: 3,
    status: "new",
  },
  {
    id: "2",
    title: "Rabobank Digital Wallets",
    description: "Design a next-gen digital wallet solution",
    category: "FINANCE",
    company: "Rabobank NL",
    image:
      "https://images.unsplash.com/photo-1579621970563-fbf46ba0ae75?w=500&h=400&fit=crop",
    xp: 180,
    duration: 40,
    rating: 4,
    status: "in-progress",
  },
  {
    id: "3",
    title: "Personal Branding 101",
    description: "Master the art of personal brand development",
    category: "STRENGTHS",
    company: "KlymeUpp Team",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
    xp: 50,
    duration: 15,
    rating: 2,
    status: "completed",
  },
  {
    id: "4",
    title: "AI in Business Strategy",
    description: "Learn how to implement AI solutions in business",
    category: "STRATEGY",
    company: "McKinsey & Co",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
    xp: 200,
    duration: 50,
    rating: 5,
    status: "new",
  },
  {
    id: "5",
    title: "Sustainable Fashion Design",
    description: "Create eco-friendly fashion concepts",
    category: "SUSTAINABILITY",
    company: "Nike Design",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
    xp: 150,
    duration: 35,
    rating: 4,
    status: "new",
  },
  {
    id: "6",
    title: "Data Analytics Fundamentals",
    description: "Master data analysis and visualization",
    category: "ANALYTICS",
    company: "Google Analytics",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop",
    xp: 160,
    duration: 45,
    rating: 3,
    status: "in-progress",
  },
];

const filters = [
  "Alles",
  "Case Studies",
  "Trainingen",
  "Bedrijfs Challenges",
  "Dagelijks",
];

// ============================================================================
// HELPERS
// ============================================================================

const getStatusBadge = (status: string) => {
  switch (status) {
    case "new":
      return { label: "Nieuw", className: "bg-primary text-white" };
    case "in-progress":
      return { label: "Bezig", className: "bg-warning text-white" };
    case "completed":
      return { label: "Voltooid", className: "bg-success text-white" };
    default:
      return { label: "", className: "" };
  }
};

const renderStars = (rating: number) => (
  <div className="flex gap-0.5 text-yellow-400">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className="material-symbols-outlined text-sm"
        style={{
          fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0",
        }}
      >
        star
      </span>
    ))}
  </div>
);

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function ChallengesPage() {
  const [activeFilter, setActiveFilter] = useState("Alles");

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          Challenges
        </h1>
        <p className="text-gray-500 font-medium">
          Verdien XP door challenges te voltooien en ontdek je droombaan.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
              activeFilter === filter
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-white text-gray-700 border border-gray-100 hover:border-primary/30"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Featured Challenge */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#a11663] text-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            Featured Challenge
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Design the Future with Nike
          </h2>
          <p className="text-white/80 text-base max-w-xl">
            Doe mee aan onze grootste case study van de week. Help Nike bij het
            ontwerpen van de volgende generatie duurzame sportkleding.
          </p>
          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-yellow-300"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <span className="text-xl font-bold">+200 XP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">schedule</span>
              <span className="font-medium text-white/90">45 min</span>
            </div>
          </div>
          <Link
            href="/challenges/featured"
            className="inline-block mt-4 px-10 py-4 bg-white text-primary rounded-full font-extrabold text-base hover:shadow-xl transition-shadow active:scale-95"
          >
            Start Challenge
          </Link>
        </div>
        <div className="w-60 h-60 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-lg border border-white/20 rotate-3 flex-shrink-0">
          <span
            className="material-symbols-outlined text-white/30 text-8xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            emoji_events
          </span>
        </div>
      </div>

      {/* Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {challenges.map((challenge) => {
          const badge = getStatusBadge(challenge.status);
          return (
            <Link key={challenge.id} href={`/challenges/${challenge.id}`}>
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/30 transition-all hover:-translate-y-1 shadow-sm hover:shadow-lg group cursor-pointer h-full">
                {/* Image */}
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${challenge.image}')` }}
                >
                  <div
                    className={`absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${badge.className}`}
                  >
                    {badge.label}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs font-bold opacity-80">
                      {challenge.category}
                    </p>
                    <h3 className="text-lg font-bold">{challenge.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-500">
                      {challenge.company}
                    </p>
                    {renderStars(challenge.rating)}
                  </div>

                  <div className="flex items-center justify-between py-3 border-y border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">
                        Beloning
                      </span>
                      <span className="text-primary font-bold">
                        +{challenge.xp} XP
                      </span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">
                        Tijd
                      </span>
                      <span className="font-bold">{challenge.duration} min</span>
                    </div>
                  </div>

                  <button
                    className={`w-full py-3 rounded-full font-bold text-sm transition-all ${
                      challenge.status === "in-progress"
                        ? "bg-primary text-white"
                        : challenge.status === "completed"
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-50 text-primary group-hover:bg-primary group-hover:text-white"
                    }`}
                  >
                    {challenge.status === "in-progress"
                      ? "Ga verder"
                      : challenge.status === "completed"
                      ? "Klaar!"
                      : "Starten"}
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
