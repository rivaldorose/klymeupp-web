"use client";

import React, { useState } from "react";

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_OPPORTUNITIES = [
  {
    id: "1",
    company: "Stripe",
    role: "Junior UX Researcher",
    location: "Remote (Global)",
    type: "Full-time",
    salary: "$45k - $60k",
    tags: ["Full-time", "$45k - $60k", "Design Sprint"],
    matchPercentage: 98,
    matchColor: "bg-primary/10 text-primary",
    posted: "Posted 2h ago",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGp34P9tTDq7V6_cRcwV4SqkR5yS-ZumkIY2mjDywAVSgpqXYGx2xUm8LLxE0WFVa-J7pYJ2plU6AB4hDIluw6fSidOWkMYWL-Pez_AWF-Np0nvHGbsSGLiXRTtetPb4Deheh47Zux2Xot9o6ve32aZSiTL6cWzvTyJDdU3E_oGp0FXUStCaQhfx2qFrMtdB1aowAgWCFeu_1cTJPqiDtD7e9Q-9Kq5HXvw5LfRy5ftvLMErELTDuFXtaJ50bzqpIqqQjAsulfC6I",
  },
  {
    id: "2",
    company: "Spotify",
    role: "Growth Marketing Intern",
    location: "New York, NY",
    type: "Internship",
    salary: "Paid",
    tags: ["Internship", "Paid", "Content Creation"],
    matchPercentage: 85,
    matchColor: "bg-emerald-100 text-emerald-600",
    posted: "Hot Pick 🔥",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDj6Ex1HFM5MnmOHgvOEr_rEhMXJge1mWUZELTxN75qXxEUuYvwP45vgpFTyX9x-aBY7c59BwNNx8IMhvhBRRz9SNIVdedRuzLlRrUg98_BAKKaz5PcFmLvQ4X5aeu10P2hCyu4qgPVuy3lekh-Udfjay5yI3rxMDaAqDJx_oUTlftJ8RvFLBaB_r-QazGPDxDrdL4GIMfGcYFA4y4R4XIUD3yRDsVMLitB5j8DPYWtroU-iZ_nT09tyMxR43sLDP3MGY3P0oGGbY",
  },
  {
    id: "3",
    company: "Discord",
    role: "Community Manager",
    location: "San Francisco, CA",
    type: "Contract",
    salary: "$30/hr",
    tags: ["Contract", "$30/hr", "Soft Skills"],
    matchPercentage: 92,
    matchColor: "bg-primary/10 text-primary",
    posted: "New Today",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4fO_gUwSmgv26xYTE-Oj-NJoppDQtke8bGYlKiHVOhW92sR9CRGgwVbIXuY5682IK68foMcSnfBBjznLT224fbyN7_X7rhUgYErw-UOmH2xAw2KgL1WaNDc3Z010QoW-NMppicXEYp1Sd-lQN6CYqCPQA_p76K5lPqoi0ADVD4uyzcbexheJ5FBSqoRdN1qm0qHznFSWRx6233zrzXIM-XEVk1cj-C5pcL-dJeTeatip77Cgpg2h4i5tZwIl0HGKa2qDrG1Oqoew",
  },
  {
    id: "4",
    company: "Patagonia",
    role: "Sustainability Analyst",
    location: "Ventura, CA",
    type: "Entry Level",
    salary: "$50k+",
    tags: ["Entry Level", "$50k+", "Leadership"],
    matchPercentage: 78,
    matchColor: "bg-blue-100 text-blue-600",
    posted: "Ending soon",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpNAGaW-GwyTNuH_lmorak5p5cm1q_MiXxk_4xyzkNqEHLtpIwOKa1UfWt6aNdc-383hTnznwR9eynRLA1E8CMsarVPYHPAYhLYa8EySEsid6fgqebxw4G02kVnnjRGW6b35OsXM07k2IOTUa39vzzQAB72FrLSD_C4bTsSmMnkbYaZ33lSGqgV_fv7urC-8A-iOZ9DWjXi9VSV6zxTKdkuVOYmIpwnYMRfHQGnm-jikVqIpixOmz_hPcrkJD0vl4tAhDKST336KE",
  },
];

const INDUSTRIES = [
  { label: "Tech & AI", checked: true },
  { label: "Creative Design", checked: false },
  { label: "Sustainable Energy", checked: true },
  { label: "Marketing", checked: false },
];

const SKILL_TAGS = ["Technical", "Soft Skills", "Leadership", "Problem Solving"];

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function MatchingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSkill, setActiveSkill] = useState("Technical");
  const [checkedIndustries, setCheckedIndustries] = useState<Record<string, boolean>>(
    Object.fromEntries(INDUSTRIES.map((i) => [i.label, i.checked]))
  );

  const toggleIndustry = (label: string) => {
    setCheckedIndustries((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="w-full flex gap-8">
      {/* Sidebar Filters - Desktop Only */}
      <aside className="w-72 flex-shrink-0 hidden lg:flex flex-col gap-8">
        {/* Filters Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Filters</h3>
            <button className="text-primary text-xs font-bold hover:underline">
              Clear All
            </button>
          </div>

          {/* Industry Filter */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
              Industry
            </h4>
            <div className="flex flex-col gap-3">
              {INDUSTRIES.map((industry) => (
                <label
                  key={industry.label}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={checkedIndustries[industry.label]}
                    onChange={() => toggleIndustry(industry.label)}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                    {industry.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Skill Focus */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
              Skill Focus
            </h4>
            <div className="flex flex-wrap gap-2">
              {SKILL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveSkill(tag)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                    activeSkill === tag
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-gray-50 text-gray-600 border-transparent hover:border-primary/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
              Location
            </h4>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                location_on
              </span>
              <input
                type="text"
                placeholder="City or Remote"
                className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 text-sm focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>

        {/* Gamification Promo Card */}
        <div className="bg-gradient-to-br from-primary to-[#ff6fb1] p-6 rounded-2xl text-white relative overflow-hidden">
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/20 text-8xl rotate-12">
            emoji_events
          </span>
          <h4 className="font-bold text-lg mb-2 relative z-10">
            Level Up Your Profile!
          </h4>
          <p className="text-white/80 text-sm mb-4 relative z-10">
            Complete your skills test to unlock high-match opportunities.
          </p>
          <button className="w-full bg-white text-primary py-2.5 rounded-full font-bold text-sm shadow-lg relative z-10 active:scale-95 transition-transform">
            Start Challenge
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">
                Opportunity Hub
              </h1>
              <p className="text-gray-500 font-medium">
                Discover careers that match your unique talent profile.
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex -space-x-3">
                <div className="size-8 rounded-full bg-primary/20 border-2 border-white" />
                <div className="size-8 rounded-full bg-emerald-200 border-2 border-white" />
                <div className="size-8 rounded-full bg-blue-200 border-2 border-white" />
              </div>
              <span className="text-xs font-bold text-gray-400 ml-2">
                42 friends active
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for internships, junior roles, or side hustles..."
              className="w-full bg-white border-none rounded-full py-5 pl-16 pr-40 text-base shadow-sm focus:ring-4 focus:ring-primary/10 transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white px-8 py-3 rounded-full font-bold text-sm hover:brightness-110 shadow-lg shadow-primary/20 transition-all">
              Find Path
            </button>
          </div>
        </div>

        {/* Opportunity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_OPPORTUNITIES.map((opp) => (
            <div
              key={opp.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-5">
                <div className="size-14 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={opp.logo}
                    alt={opp.company}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 ${opp.matchColor}`}
                  >
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      stars
                    </span>
                    {opp.matchPercentage}% Talent Match
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {opp.posted}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <h3 className="text-xl font-bold mb-1">{opp.role}</h3>
              <p className="text-gray-500 font-semibold mb-4 text-sm">
                {opp.company} • {opp.location}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {opp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button className="flex-1 bg-primary text-white py-3 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                  Quick Apply
                </button>
                <button className="size-11 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">bookmark</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-gray-400 text-sm font-medium">
            Showing 4 of 128 matching adventures
          </p>
          <button className="px-10 py-4 rounded-full bg-white border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">
            Load More Opportunities
          </button>
        </div>
      </section>
    </div>
  );
}
