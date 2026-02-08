'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

interface ChallengeDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  company: string;
  image: string;
  xp: number;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  status: 'new' | 'in-progress' | 'completed';
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
  '1': {
    id: '1',
    title: 'User Journey Mapping',
    description:
      'Create detailed user journeys for a modern app by analyzing user behavior, pain points, and opportunities. This comprehensive case study will teach you industry-standard UX methodologies.',
    category: 'UX DESIGN',
    company: 'Google Workshop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    xp: 120,
    duration: 25,
    difficulty: 'Intermediate',
    rating: 3,
    status: 'new',
    steps: [
      {
        id: 1,
        title: 'Define User Personas',
        description: 'Create 3-5 detailed user personas based on research data',
        completed: false,
      },
      {
        id: 2,
        title: 'Map Current Journey',
        description: 'Document the existing user journey with all touchpoints',
        completed: false,
      },
      {
        id: 3,
        title: 'Identify Pain Points',
        description: 'Highlight friction areas and opportunities in the journey',
        completed: false,
      },
      {
        id: 4,
        title: 'Design Improved Journey',
        description: 'Create an optimized user journey with solutions',
        completed: false,
      },
      {
        id: 5,
        title: 'Present Findings',
        description: 'Prepare a presentation of your journey mapping analysis',
        completed: false,
      },
    ],
    tips: [
      'Use real user data from interviews and surveys',
      'Consider emotional states at each touchpoint',
      'Include both online and offline interactions',
      'Validate your journeys with actual users',
      'Focus on the biggest pain points first',
    ],
    relatedChallenges: [
      { id: '2', title: 'Rabobank Digital Wallets', xp: 180 },
      { id: '4', title: 'AI in Business Strategy', xp: 200 },
    ],
  },
  '2': {
    id: '2',
    title: 'Rabobank Digital Wallets',
    description:
      'Design a next-generation digital wallet solution for Rabobank. Work with real fintech constraints and create an interface that balances security, usability, and innovation.',
    category: 'FINANCE',
    company: 'Rabobank NL',
    image: 'https://images.unsplash.com/photo-1579621970563-fbf46ba0ae75?w=800&h=400&fit=crop',
    xp: 180,
    duration: 40,
    difficulty: 'Advanced',
    rating: 4,
    status: 'in-progress',
    steps: [
      {
        id: 1,
        title: 'Research Financial UX',
        description: 'Study current digital wallet solutions and identify gaps',
        completed: true,
      },
      {
        id: 2,
        title: 'Define Feature Set',
        description: 'Determine core features based on user research',
        completed: true,
      },
      {
        id: 3,
        title: 'Create Wireframes',
        description: 'Design low-fidelity wireframes for key user flows',
        completed: false,
      },
      {
        id: 4,
        title: 'Build High-Fidelity Prototype',
        description: 'Create interactive prototypes with visual design',
        completed: false,
      },
      {
        id: 5,
        title: 'Conduct User Testing',
        description: 'Test with 5-10 users and document feedback',
        completed: false,
      },
      {
        id: 6,
        title: 'Iterate & Refine',
        description: 'Implement feedback and create final design system',
        completed: false,
      },
    ],
    tips: [
      'Consider regulatory compliance requirements',
      'Prioritize transaction security in your design',
      'Test with diverse user groups',
      'Consider accessibility standards (WCAG 2.1)',
      'Design for both first-time and frequent users',
    ],
    relatedChallenges: [
      { id: '1', title: 'User Journey Mapping', xp: 120 },
      { id: '5', title: 'Sustainable Fashion Design', xp: 150 },
    ],
  },
  '3': {
    id: '3',
    title: 'Personal Branding 101',
    description:
      'Master the art of personal brand development. Learn how to showcase your unique value proposition and build your professional presence online.',
    category: 'STRENGTHS',
    company: 'KlymeUpp Team',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    xp: 50,
    duration: 15,
    difficulty: 'Beginner',
    rating: 2,
    status: 'completed',
    steps: [
      {
        id: 1,
        title: 'Define Your Unique Value',
        description: 'Identify what makes you different and valuable',
        completed: true,
      },
      {
        id: 2,
        title: 'Create Brand Statement',
        description: 'Write a compelling elevator pitch about yourself',
        completed: true,
      },
      {
        id: 3,
        title: 'Optimize LinkedIn Profile',
        description: 'Update your professional profile with brand messaging',
        completed: true,
      },
      {
        id: 4,
        title: 'Build Portfolio Presence',
        description: 'Create or update your portfolio website',
        completed: true,
      },
    ],
    tips: [
      'Be authentic and genuine in your messaging',
      'Keep your messaging consistent across platforms',
      'Showcase your achievements and results',
      'Engage with your professional community',
      'Update your brand regularly as you grow',
    ],
    relatedChallenges: [
      { id: '4', title: 'AI in Business Strategy', xp: 200 },
      { id: '6', title: 'Data Analytics Fundamentals', xp: 160 },
    ],
  },
  '4': {
    id: '4',
    title: 'AI in Business Strategy',
    description:
      'Learn how to implement AI solutions in business strategy. Explore real-world applications, challenges, and opportunities in various industries.',
    category: 'STRATEGY',
    company: 'McKinsey & Co',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    xp: 200,
    duration: 50,
    difficulty: 'Advanced',
    rating: 5,
    status: 'new',
    steps: [
      {
        id: 1,
        title: 'Understand AI Fundamentals',
        description: 'Learn the basics of machine learning and AI technologies',
        completed: false,
      },
      {
        id: 2,
        title: 'Analyze Case Studies',
        description: 'Study 5 companies implementing AI successfully',
        completed: false,
      },
      {
        id: 3,
        title: 'Identify Business Opportunities',
        description: 'Find AI applications in your chosen industry',
        completed: false,
      },
      {
        id: 4,
        title: 'Create Implementation Plan',
        description: 'Develop a roadmap for AI adoption',
        completed: false,
      },
      {
        id: 5,
        title: 'Present Strategy',
        description: 'Pitch your AI strategy to stakeholders',
        completed: false,
      },
    ],
    tips: [
      'Focus on business value, not just technology',
      'Consider data quality and availability',
      'Plan for change management',
      'Start small with pilot projects',
      'Measure ROI continuously',
    ],
    relatedChallenges: [
      { id: '3', title: 'Personal Branding 101', xp: 50 },
      { id: '6', title: 'Data Analytics Fundamentals', xp: 160 },
    ],
  },
  '5': {
    id: '5',
    title: 'Sustainable Fashion Design',
    description:
      'Create eco-friendly fashion concepts that balance style, sustainability, and commercial viability. Work with real sustainability constraints and innovative materials.',
    category: 'SUSTAINABILITY',
    company: 'Nike Design',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    xp: 150,
    duration: 35,
    difficulty: 'Intermediate',
    rating: 4,
    status: 'new',
    steps: [
      {
        id: 1,
        title: 'Research Sustainable Materials',
        description: 'Explore eco-friendly fabrics and production methods',
        completed: false,
      },
      {
        id: 2,
        title: 'Design Collection Concept',
        description: 'Create 3-5 design concepts for sustainable pieces',
        completed: false,
      },
      {
        id: 3,
        title: 'Calculate Environmental Impact',
        description: 'Analyze carbon footprint and resource usage',
        completed: false,
      },
      {
        id: 4,
        title: 'Create Technical Drawings',
        description: 'Develop detailed design specifications',
        completed: false,
      },
      {
        id: 5,
        title: 'Present Collection',
        description: 'Showcase your sustainable fashion line',
        completed: false,
      },
    ],
    tips: [
      'Research the latest sustainable materials',
      'Consider the entire product lifecycle',
      'Balance sustainability with commercial appeal',
      'Look at successful sustainable brands',
      'Think about circular economy principles',
    ],
    relatedChallenges: [
      { id: '2', title: 'Rabobank Digital Wallets', xp: 180 },
      { id: '1', title: 'User Journey Mapping', xp: 120 },
    ],
  },
  '6': {
    id: '6',
    title: 'Data Analytics Fundamentals',
    description:
      'Master data analysis and visualization. Learn to transform raw data into actionable insights and create compelling data visualizations.',
    category: 'ANALYTICS',
    company: 'Google Analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    xp: 160,
    duration: 45,
    difficulty: 'Intermediate',
    rating: 3,
    status: 'in-progress',
    steps: [
      {
        id: 1,
        title: 'Data Collection & Cleaning',
        description: 'Gather and prepare data for analysis',
        completed: true,
      },
      {
        id: 2,
        title: 'Exploratory Data Analysis',
        description: 'Understand patterns and distributions in your data',
        completed: false,
      },
      {
        id: 3,
        title: 'Statistical Analysis',
        description: 'Apply statistical methods to derive insights',
        completed: false,
      },
      {
        id: 4,
        title: 'Create Visualizations',
        description: 'Build charts and dashboards to communicate findings',
        completed: false,
      },
      {
        id: 5,
        title: 'Present Insights',
        description: 'Create a comprehensive report of your findings',
        completed: false,
      },
    ],
    tips: [
      'Always start with a clear question',
      'Visualize data in multiple ways',
      'Validate your assumptions with data',
      'Tell a story with your data',
      'Consider outliers and anomalies carefully',
    ],
    relatedChallenges: [
      { id: '4', title: 'AI in Business Strategy', xp: 200 },
      { id: '3', title: 'Personal Branding 101', xp: 50 },
    ],
  },
  'featured': {
    id: 'featured',
    title: 'Design the Future with Nike',
    description:
      'Doe mee aan onze grootste case study van de week. Help Nike bij het ontwerpen van de volgende generatie duurzame sportkleding. Dit is een uitgebreide case study die alle aspecten van modern fashion design behandelt.',
    category: 'FEATURED',
    company: 'Nike Design',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    xp: 200,
    duration: 45,
    difficulty: 'Advanced',
    rating: 5,
    status: 'new',
    steps: [
      {
        id: 1,
        title: 'Analyze Nike Brand & Market',
        description: 'Understand Nike brand values and competitive landscape',
        completed: false,
      },
      {
        id: 2,
        title: 'Research Future Trends',
        description: 'Identify emerging trends in sustainable sportswear',
        completed: false,
      },
      {
        id: 3,
        title: 'Design Concept Collection',
        description: 'Create innovative designs balancing sustainability and performance',
        completed: false,
      },
      {
        id: 4,
        title: 'Develop Technical Specifications',
        description: 'Detail materials, manufacturing, and performance metrics',
        completed: false,
      },
      {
        id: 5,
        title: 'Create Marketing Campaign',
        description: 'Design go-to-market strategy and messaging',
        completed: false,
      },
      {
        id: 6,
        title: 'Final Presentation',
        description: 'Present your collection to Nike stakeholders',
        completed: false,
      },
    ],
    tips: [
      'Study Nike history and innovation',
      'Research cutting-edge sustainable materials',
      'Consider performance requirements',
      'Think about the athlete experience',
      'Align design with sustainability goals',
      'Create compelling visual presentations',
    ],
    relatedChallenges: [
      { id: '5', title: 'Sustainable Fashion Design', xp: 150 },
      { id: '2', title: 'Rabobank Digital Wallets', xp: 180 },
    ],
  },
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300';
    case 'Advanced':
      return 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const renderStars = (rating: number) => {
  return (
    <div className="flex gap-1 text-yellow-400">
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
};

export default function ChallengeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const challenge = challengeDatabase[id];
  const [completedSteps, setCompletedSteps] = useState<number[]>(
    challenge?.steps.filter((s) => s.completed).map((s) => s.id) || []
  );

  if (!challenge) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Challenge Not Found</h1>
          <Link href="/challenges" className="text-[#e9208f] font-bold hover:underline">
            Back to Challenges
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage = (completedSteps.length / challenge.steps.length) * 100;

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f6f7] dark:bg-[#181115]">
      {/* Header */}
      <header className="bg-white dark:bg-[#2d1a25] border-b border-[#f4f0f2] dark:border-[#3d2a35] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/challenges" className="text-[#886377] hover:text-[#e9208f] transition-colors">
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </Link>
            <div>
              <h1 className="text-2xl font-black">{challenge.title}</h1>
              <p className="text-[#886377] text-sm">{challenge.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {renderStars(challenge.rating)}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Challenge Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div
                className="rounded-2xl h-80 bg-cover bg-center shadow-lg"
                style={{ backgroundImage: `url('${challenge.image}')` }}
              ></div>
            </motion.div>

            {/* Challenge Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-[#2d1a25] rounded-xl p-8 border border-[#f4f0f2] dark:border-[#3d2a35]"
            >
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 rounded-full bg-[#e9208f] text-white text-sm font-bold">
                  {challenge.category}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
              </div>

              <p className="text-lg text-[#886377] dark:text-[#a88397] leading-relaxed mb-6">{challenge.description}</p>

              <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#f4f0f2] dark:border-[#3d2a35]">
                <div>
                  <p className="text-sm font-bold text-[#886377] uppercase tracking-wider mb-2">Beloning</p>
                  <p className="text-3xl font-black text-[#e9208f]">+{challenge.xp} XP</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#886377] uppercase tracking-wider mb-2">Duur</p>
                  <p className="text-3xl font-black">{challenge.duration} min</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#886377] uppercase tracking-wider mb-2">Niveau</p>
                  <p className="text-3xl font-black capitalize">{challenge.difficulty}</p>
                </div>
              </div>
            </motion.div>

            {/* Steps Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-[#2d1a25] rounded-xl p-8 border border-[#f4f0f2] dark:border-[#3d2a35]"
            >
              <h2 className="text-2xl font-black mb-6">Stappen</h2>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-[#886377]">Voortgang</span>
                  <span className="text-sm font-bold text-[#e9208f]">{progressPercentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-[#f4f0f2] dark:bg-white/5 h-3 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#e9208f] to-[#ff9f43] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  ></motion.div>
                </div>
              </div>

              {/* Steps List */}
              <div className="space-y-3">
                {challenge.steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl bg-[#f4f0f2] dark:bg-white/5 hover:bg-[#e9208f]/10 transition-colors cursor-pointer"
                    onClick={() => toggleStep(step.id)}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                          completedSteps.includes(step.id)
                            ? 'bg-[#2cc069] text-white'
                            : 'bg-white dark:bg-white/10 text-[#e9208f] border-2 border-[#e9208f]'
                        }`}
                      >
                        {completedSteps.includes(step.id) ? (
                          <span className="material-symbols-outlined text-lg">check</span>
                        ) : (
                          index + 1
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold ${completedSteps.includes(step.id) ? 'line-through text-[#886377]' : ''}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-[#886377] mt-1">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#e9208f]/10 dark:bg-[#e9208f]/5 rounded-xl p-8 border border-[#e9208f]/20"
            >
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-[#e9208f]">lightbulb</span>
                Tips & Tricks
              </h2>
              <ul className="space-y-3">
                {challenge.tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex gap-3 text-[#181115] dark:text-white"
                  >
                    <span className="text-[#e9208f] font-bold flex-shrink-0">•</span>
                    <span>{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Related Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-[#2d1a25] rounded-xl p-8 border border-[#f4f0f2] dark:border-[#3d2a35]"
            >
              <h2 className="text-2xl font-black mb-6">Gerelateerde Challenges</h2>
              <div className="space-y-3">
                {challenge.relatedChallenges.map((related, index) => (
                  <Link key={related.id} href={`/challenges/${related.id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="p-4 rounded-lg bg-[#f4f0f2] dark:bg-white/5 hover:bg-[#e9208f]/10 hover:-translate-y-1 transition-all cursor-pointer flex justify-between items-center"
                    >
                      <span className="font-bold">{related.title}</span>
                      <span className="text-[#e9208f] font-bold">+{related.xp} XP</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Action Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-[#2d1a25] rounded-xl p-8 border border-[#f4f0f2] dark:border-[#3d2a35] sticky top-28">
              {/* Quick Stats */}
              <div className="mb-8 space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#e9208f]/10">
                  <span className="material-symbols-outlined text-[#e9208f]">stars</span>
                  <div>
                    <p className="text-xs font-bold text-[#886377] uppercase">Beschikbare Beloning</p>
                    <p className="text-xl font-black text-[#e9208f]">+{challenge.xp} XP</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-500/10">
                  <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">schedule</span>
                  <div>
                    <p className="text-xs font-bold text-[#886377] uppercase">Geschatte tijd</p>
                    <p className="text-xl font-black">{challenge.duration} minuten</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">trending_up</span>
                  <div>
                    <p className="text-xs font-bold text-[#886377] uppercase">Niveau</p>
                    <p className="text-xl font-black capitalize">{challenge.difficulty}</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-xl font-black text-lg transition-all mb-4 ${
                  challenge.status === 'completed'
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#e9208f] to-[#a11663] text-white shadow-lg shadow-[#e9208f]/30 hover:shadow-xl'
                }`}
              >
                {challenge.status === 'in-progress'
                  ? 'Ga verder'
                  : challenge.status === 'completed'
                    ? 'Voltooid'
                    : 'Start nu'}
              </motion.button>

              {/* Share Button */}
              <button className="w-full py-3 rounded-xl border-2 border-[#e9208f] text-[#e9208f] font-bold hover:bg-[#e9208f]/10 transition-colors">
                Delen met vrienden
              </button>

              {/* Company Badge */}
              <div className="mt-8 p-4 rounded-lg bg-[#f4f0f2] dark:bg-white/5 text-center">
                <p className="text-xs text-[#886377] uppercase font-bold mb-2">Partner</p>
                <p className="font-black text-[#181115] dark:text-white">{challenge.company}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
