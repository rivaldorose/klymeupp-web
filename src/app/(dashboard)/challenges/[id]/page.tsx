"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// ============================================================================
// TYPES & MOCK DATA
// ============================================================================

interface ChallengeDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  company: string;
  image: string;
  xp: number;
  duration: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  status: "new" | "in-progress" | "completed";
  steps: Array<{
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }>;
  tips: string[];
  relatedChallenges: Array<{
    id: string;
    title: string;
    xp: number;
  }>;
}

const challengeDatabase: Record<string, ChallengeDetail> = {
  "1": {
    id: "1",
    title: "User Journey Mapping",
    description:
      "Create detailed user journeys for a modern app by analyzing user behavior, pain points, and opportunities. This comprehensive case study will teach you industry-standard UX methodologies.",
    category: "UX DESIGN",
    company: "Google Workshop",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    xp: 120,
    duration: 25,
    difficulty: "Intermediate",
    rating: 3,
    status: "new",
    steps: [
      { id: 1, title: "Define User Personas", description: "Create 3-5 detailed user personas based on research data", completed: false },
      { id: 2, title: "Map Current Journey", description: "Document the existing user journey with all touchpoints", completed: false },
      { id: 3, title: "Identify Pain Points", description: "Highlight friction areas and opportunities in the journey", completed: false },
      { id: 4, title: "Design Improved Journey", description: "Create an optimized user journey with solutions", completed: false },
      { id: 5, title: "Present Findings", description: "Prepare a presentation of your journey mapping analysis", completed: false },
    ],
    tips: [
      "Use real user data from interviews and surveys",
      "Consider emotional states at each touchpoint",
      "Include both online and offline interactions",
      "Validate your journeys with actual users",
      "Focus on the biggest pain points first",
    ],
    relatedChallenges: [
      { id: "2", title: "Rabobank Digital Wallets", xp: 180 },
      { id: "4", title: "AI in Business Strategy", xp: 200 },
    ],
  },
  "2": {
    id: "2",
    title: "Rabobank Digital Wallets",
    description:
      "Design a next-generation digital wallet solution for Rabobank. Work with real fintech constraints and create an interface that balances security, usability, and innovation.",
    category: "FINANCE",
    company: "Rabobank NL",
    image:
      "https://images.unsplash.com/photo-1579621970563-fbf46ba0ae75?w=800&h=400&fit=crop",
    xp: 180,
    duration: 40,
    difficulty: "Advanced",
    rating: 4,
    status: "in-progress",
    steps: [
      { id: 1, title: "Research Financial UX", description: "Study current digital wallet solutions and identify gaps", completed: true },
      { id: 2, title: "Define Feature Set", description: "Determine core features based on user research", completed: true },
      { id: 3, title: "Create Wireframes", description: "Design low-fidelity wireframes for key user flows", completed: false },
      { id: 4, title: "Build High-Fidelity Prototype", description: "Create interactive prototypes with visual design", completed: false },
      { id: 5, title: "Conduct User Testing", description: "Test with 5-10 users and document feedback", completed: false },
      { id: 6, title: "Iterate & Refine", description: "Implement feedback and create final design system", completed: false },
    ],
    tips: [
      "Consider regulatory compliance requirements",
      "Prioritize transaction security in your design",
      "Test with diverse user groups",
      "Consider accessibility standards (WCAG 2.1)",
      "Design for both first-time and frequent users",
    ],
    relatedChallenges: [
      { id: "1", title: "User Journey Mapping", xp: 120 },
      { id: "5", title: "Sustainable Fashion Design", xp: 150 },
    ],
  },
  "3": {
    id: "3",
    title: "Personal Branding 101",
    description:
      "Master the art of personal brand development. Learn how to showcase your unique value proposition and build your professional presence online.",
    category: "STRENGTHS",
    company: "KlymeUpp Team",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    xp: 50,
    duration: 15,
    difficulty: "Beginner",
    rating: 2,
    status: "completed",
    steps: [
      { id: 1, title: "Define Your Unique Value", description: "Identify what makes you different and valuable", completed: true },
      { id: 2, title: "Create Brand Statement", description: "Write a compelling elevator pitch about yourself", completed: true },
      { id: 3, title: "Optimize LinkedIn Profile", description: "Update your professional profile with brand messaging", completed: true },
      { id: 4, title: "Build Portfolio Presence", description: "Create or update your portfolio website", completed: true },
    ],
    tips: [
      "Be authentic and genuine in your messaging",
      "Keep your messaging consistent across platforms",
      "Showcase your achievements and results",
      "Engage with your professional community",
    ],
    relatedChallenges: [
      { id: "4", title: "AI in Business Strategy", xp: 200 },
      { id: "6", title: "Data Analytics Fundamentals", xp: 160 },
    ],
  },
  "4": {
    id: "4",
    title: "AI in Business Strategy",
    description:
      "Learn how to implement AI solutions in business strategy. Explore real-world applications, challenges, and opportunities in various industries.",
    category: "STRATEGY",
    company: "McKinsey & Co",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    xp: 200,
    duration: 50,
    difficulty: "Advanced",
    rating: 5,
    status: "new",
    steps: [
      { id: 1, title: "Understand AI Fundamentals", description: "Learn the basics of machine learning and AI technologies", completed: false },
      { id: 2, title: "Analyze Case Studies", description: "Study 5 companies implementing AI successfully", completed: false },
      { id: 3, title: "Identify Business Opportunities", description: "Find AI applications in your chosen industry", completed: false },
      { id: 4, title: "Create Implementation Plan", description: "Develop a roadmap for AI adoption", completed: false },
      { id: 5, title: "Present Strategy", description: "Pitch your AI strategy to stakeholders", completed: false },
    ],
    tips: [
      "Focus on business value, not just technology",
      "Consider data quality and availability",
      "Plan for change management",
      "Start small with pilot projects",
      "Measure ROI continuously",
    ],
    relatedChallenges: [
      { id: "3", title: "Personal Branding 101", xp: 50 },
      { id: "6", title: "Data Analytics Fundamentals", xp: 160 },
    ],
  },
  "5": {
    id: "5",
    title: "Sustainable Fashion Design",
    description:
      "Create eco-friendly fashion concepts that balance style, sustainability, and commercial viability.",
    category: "SUSTAINABILITY",
    company: "Nike Design",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
    xp: 150,
    duration: 35,
    difficulty: "Intermediate",
    rating: 4,
    status: "new",
    steps: [
      { id: 1, title: "Research Sustainable Materials", description: "Explore eco-friendly fabrics and production methods", completed: false },
      { id: 2, title: "Design Collection Concept", description: "Create 3-5 design concepts for sustainable pieces", completed: false },
      { id: 3, title: "Calculate Environmental Impact", description: "Analyze carbon footprint and resource usage", completed: false },
      { id: 4, title: "Create Technical Drawings", description: "Develop detailed design specifications", completed: false },
      { id: 5, title: "Present Collection", description: "Showcase your sustainable fashion line", completed: false },
    ],
    tips: [
      "Research the latest sustainable materials",
      "Consider the entire product lifecycle",
      "Balance sustainability with commercial appeal",
      "Look at successful sustainable brands",
    ],
    relatedChallenges: [
      { id: "2", title: "Rabobank Digital Wallets", xp: 180 },
      { id: "1", title: "User Journey Mapping", xp: 120 },
    ],
  },
  "6": {
    id: "6",
    title: "Data Analytics Fundamentals",
    description:
      "Master data analysis and visualization. Learn to transform raw data into actionable insights.",
    category: "ANALYTICS",
    company: "Google Analytics",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    xp: 160,
    duration: 45,
    difficulty: "Intermediate",
    rating: 3,
    status: "in-progress",
    steps: [
      { id: 1, title: "Data Collection & Cleaning", description: "Gather and prepare data for analysis", completed: true },
      { id: 2, title: "Exploratory Data Analysis", description: "Understand patterns and distributions in your data", completed: false },
      { id: 3, title: "Statistical Analysis", description: "Apply statistical methods to derive insights", completed: false },
      { id: 4, title: "Create Visualizations", description: "Build charts and dashboards to communicate findings", completed: false },
      { id: 5, title: "Present Insights", description: "Create a comprehensive report of your findings", completed: false },
    ],
    tips: [
      "Always start with a clear question",
      "Visualize data in multiple ways",
      "Validate your assumptions with data",
      "Tell a story with your data",
    ],
    relatedChallenges: [
      { id: "4", title: "AI in Business Strategy", xp: 200 },
      { id: "3", title: "Personal Branding 101", xp: 50 },
    ],
  },
  featured: {
    id: "featured",
    title: "Design the Future with Nike",
    description:
      "Doe mee aan onze grootste case study van de week. Help Nike bij het ontwerpen van de volgende generatie duurzame sportkleding.",
    category: "FEATURED",
    company: "Nike Design",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
    xp: 200,
    duration: 45,
    difficulty: "Advanced",
    rating: 5,
    status: "new",
    steps: [
      { id: 1, title: "Analyze Nike Brand & Market", description: "Understand Nike brand values and competitive landscape", completed: false },
      { id: 2, title: "Research Future Trends", description: "Identify emerging trends in sustainable sportswear", completed: false },
      { id: 3, title: "Design Concept Collection", description: "Create innovative designs balancing sustainability and performance", completed: false },
      { id: 4, title: "Develop Technical Specifications", description: "Detail materials, manufacturing, and performance metrics", completed: false },
      { id: 5, title: "Create Marketing Campaign", description: "Design go-to-market strategy and messaging", completed: false },
      { id: 6, title: "Final Presentation", description: "Present your collection to Nike stakeholders", completed: false },
    ],
    tips: [
      "Study Nike history and innovation",
      "Research cutting-edge sustainable materials",
      "Consider performance requirements",
      "Think about the athlete experience",
    ],
    relatedChallenges: [
      { id: "5", title: "Sustainable Fashion Design", xp: 150 },
      { id: "2", title: "Rabobank Digital Wallets", xp: 180 },
    ],
  },
};

// ============================================================================
// HELPERS
// ============================================================================

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-700";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-700";
    case "Advanced":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
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

export default function ChallengeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const challenge = challengeDatabase[id];
  const [completedSteps, setCompletedSteps] = useState<number[]>(
    challenge?.steps.filter((s) => s.completed).map((s) => s.id) || []
  );

  if (!challenge) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-gray-300 mb-4 block">
            search_off
          </span>
          <h1 className="text-2xl font-bold mb-4">Challenge niet gevonden</h1>
          <Link
            href="/challenges"
            className="text-primary font-bold hover:underline"
          >
            Terug naar Challenges
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage =
    (completedSteps.length / challenge.steps.length) * 100;

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  };

  return (
    <div className="w-full space-y-8">
      {/* Back Button + Title */}
      <div className="flex items-center gap-4">
        <Link
          href="/challenges"
          className="size-10 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-500 hover:text-primary hover:border-primary/30 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold">{challenge.title}</h1>
          <p className="text-gray-500 text-sm font-medium">
            {challenge.company}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          {renderStars(challenge.rating)}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image */}
          <div
            className="rounded-2xl h-64 md:h-80 bg-cover bg-center shadow-sm"
            style={{ backgroundImage: `url('${challenge.image}')` }}
          />

          {/* Info Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold">
                {challenge.category}
              </span>
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold ${getDifficultyColor(
                  challenge.difficulty
                )}`}
              >
                {challenge.difficulty}
              </span>
            </div>

            <p className="text-gray-500 leading-relaxed mb-6">
              {challenge.description}
            </p>

            <div className="grid grid-cols-3 gap-4 py-5 border-y border-gray-100">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Beloning
                </p>
                <p className="text-2xl font-extrabold text-primary">
                  +{challenge.xp} XP
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Duur
                </p>
                <p className="text-2xl font-extrabold">
                  {challenge.duration} min
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Niveau
                </p>
                <p className="text-2xl font-extrabold">{challenge.difficulty}</p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-extrabold mb-6">Stappen</h2>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-500">
                  Voortgang
                </span>
                <span className="text-sm font-bold text-primary">
                  {progressPercentage.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Steps List */}
            <div className="space-y-3">
              {challenge.steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors cursor-pointer"
                  onClick={() => toggleStep(step.id)}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                        completedSteps.includes(step.id)
                          ? "bg-success text-white"
                          : "bg-white text-primary border-2 border-primary"
                      }`}
                    >
                      {completedSteps.includes(step.id) ? (
                        <span className="material-symbols-outlined text-lg">
                          check
                        </span>
                      ) : (
                        index + 1
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-bold text-sm ${
                        completedSteps.includes(step.id)
                          ? "line-through text-gray-400"
                          : ""
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-primary/5 rounded-2xl p-6 md:p-8 border border-primary/10">
            <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                lightbulb
              </span>
              Tips & Tricks
            </h2>
            <ul className="space-y-3">
              {challenge.tips.map((tip, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span className="text-gray-600">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Challenges */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-extrabold mb-4">
              Gerelateerde Challenges
            </h2>
            <div className="space-y-3">
              {challenge.relatedChallenges.map((related) => (
                <Link key={related.id} href={`/challenges/${related.id}`}>
                  <div className="p-4 rounded-xl bg-gray-50 hover:bg-primary/5 hover:-translate-y-0.5 transition-all cursor-pointer flex justify-between items-center">
                    <span className="font-bold text-sm">{related.title}</span>
                    <span className="text-primary font-bold text-sm">
                      +{related.xp} XP
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Action Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-28 space-y-4">
            {/* Quick Stats */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Beschikbare Beloning
                </p>
                <p className="text-xl font-extrabold text-primary">
                  +{challenge.xp} XP
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-50">
              <span className="material-symbols-outlined text-orange-500">
                schedule
              </span>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Geschatte tijd
                </p>
                <p className="text-xl font-extrabold">
                  {challenge.duration} min
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50">
              <span className="material-symbols-outlined text-blue-500">
                trending_up
              </span>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Niveau
                </p>
                <p className="text-xl font-extrabold capitalize">
                  {challenge.difficulty}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <button
              className={`w-full py-4 rounded-full font-extrabold text-base transition-all ${
                challenge.status === "completed"
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl active:scale-95"
              }`}
            >
              {challenge.status === "in-progress"
                ? "Ga verder"
                : challenge.status === "completed"
                ? "Voltooid"
                : "Start nu"}
            </button>

            <button className="w-full py-3 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors">
              Delen met vrienden
            </button>

            {/* Company Badge */}
            <div className="mt-4 p-4 rounded-xl bg-gray-50 text-center">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">
                Partner
              </p>
              <p className="font-extrabold">{challenge.company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
