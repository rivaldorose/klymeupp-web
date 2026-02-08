'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
  status: 'new' | 'in-progress' | 'completed';
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'User Journey Mapping',
    description: 'Create detailed user journeys for a modern app',
    category: 'UX DESIGN',
    company: 'Google Workshop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
    xp: 120,
    duration: 25,
    rating: 3,
    status: 'new',
  },
  {
    id: '2',
    title: 'Rabobank Digital Wallets',
    description: 'Design a next-gen digital wallet solution',
    category: 'FINANCE',
    company: 'Rabobank NL',
    image: 'https://images.unsplash.com/photo-1579621970563-fbf46ba0ae75?w=500&h=400&fit=crop',
    xp: 180,
    duration: 40,
    rating: 4,
    status: 'in-progress',
  },
  {
    id: '3',
    title: 'Personal Branding 101',
    description: 'Master the art of personal brand development',
    category: 'STRENGTHS',
    company: 'KlymeUpp Team',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
    xp: 50,
    duration: 15,
    rating: 2,
    status: 'completed',
  },
  {
    id: '4',
    title: 'AI in Business Strategy',
    description: 'Learn how to implement AI solutions in business',
    category: 'STRATEGY',
    company: 'McKinsey & Co',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
    xp: 200,
    duration: 50,
    rating: 5,
    status: 'new',
  },
  {
    id: '5',
    title: 'Sustainable Fashion Design',
    description: 'Create eco-friendly fashion concepts',
    category: 'SUSTAINABILITY',
    company: 'Nike Design',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop',
    xp: 150,
    duration: 35,
    rating: 4,
    status: 'new',
  },
  {
    id: '6',
    title: 'Data Analytics Fundamentals',
    description: 'Master data analysis and visualization',
    category: 'ANALYTICS',
    company: 'Google Analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop',
    xp: 160,
    duration: 45,
    rating: 3,
    status: 'in-progress',
  },
];

const filters = ['Alles', 'Case Studies', 'Trainingen', 'Bedrijfs Challenges', 'Dagelijks'];

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

const getStatusBadgeStyles = (status: string) => {
  switch (status) {
    case 'new':
      return 'bg-[#e9208f] text-white';
    case 'in-progress':
      return 'bg-[#ff9f43] text-white';
    case 'completed':
      return 'bg-[#2cc069] text-white';
    default:
      return 'bg-gray-400 text-white';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'new':
      return 'Nieuw';
    case 'in-progress':
      return 'Bezig';
    case 'completed':
      return 'Voltooid';
    default:
      return '';
  }
};

export default function ChallengesPage() {
  const [activeFilter, setActiveFilter] = useState('Alles');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  } as const;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white dark:bg-[#2d1a25] border-b border-[#f4f0f2] dark:border-[#3d2a35] flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">Explore</h2>
            <div className="flex gap-4 ml-8">
              <a className="text-sm font-bold text-[#e9208f] border-b-2 border-[#e9208f] pb-1">
                Ontdekken
              </a>
              <a className="text-sm font-semibold text-[#886377] hover:text-[#e9208f] transition-colors cursor-pointer">
                Mijn Activiteiten
              </a>
              <a className="text-sm font-semibold text-[#886377] hover:text-[#e9208f] transition-colors cursor-pointer">
                Beloningen
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#886377]">
                search
              </span>
              <input
                className="pl-10 pr-4 py-2 bg-[#f4f0f2] dark:bg-white/5 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-[#e9208f]/50"
                placeholder="Zoek challenges..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="size-10 rounded-full bg-[#f4f0f2] dark:bg-white/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">notifications</span>
              </button>
              <div className="size-10 rounded-full bg-cover bg-center border-2 border-[#e9208f]" style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbDGZXjB_hJvwdufVKahhSi9kxpzDkMDgvMeMVeZHUUyJOGVKG7v5qqbeeHyiYSXX0sa1oC-Mi6IcgDPCOJBu6-xAz5NGQoKDubiSjikpcq__B0iTGlf0ICQRSGzjj6mFbAzKlw7lrfVPCvK0ZGPZ8igM0B71Xk3LQY6a5qMxT289lfSeAUtw_iHKf0uEsIxopRDicbOJp-BuKCyGTziry5P6iHZmzfw0SjesTmBATbrGg8TcXSL5-KuVHEnpi7zeSS_Mv4xOg0FM')"
              }}>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Title & Filter Section */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-black tracking-tight mb-2">Challenges</h1>
            <p className="text-[#886377] dark:text-[#a88397] mb-6">
              Verdien XP door challenges te voltooien en ontdek je droombaan.
            </p>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                    activeFilter === filter
                      ? 'bg-[#e9208f] text-white shadow-lg shadow-[#e9208f]/20'
                      : 'bg-white dark:bg-white/5 text-[#181115] dark:text-white border border-[#f4f0f2] dark:border-white/10 hover:border-[#e9208f]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Featured Challenge Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#e9208f] to-[#a11663] text-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
          >
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                Featured Challenge
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">Design the Future with Nike</h2>
              <p className="text-white/80 text-lg max-w-xl">
                Doe mee aan onze grootste case study van de week. Help Nike bij het ontwerpen van de volgende generatie
                duurzame sportkleding.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined fill-icon text-yellow-300">stars</span>
                  <span className="text-xl font-bold">+200 XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">schedule</span>
                  <span className="font-medium text-white/90">45 min</span>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/challenges/featured"
                  className="inline-block mt-6 px-10 py-4 bg-white text-[#e9208f] rounded-full font-black text-lg hover:shadow-xl transition-shadow active:scale-95"
                >
                  Start Challenge
                </Link>
              </motion.div>
            </div>
            <div className="w-72 h-72 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-lg border border-white/20 rotate-3 flex-shrink-0">
              <div
                className="w-48 h-48 bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDsltlOciMonuR_qVchFgk_4fY7ZXHG28DYkR8EHWtv5tkg63Tb98dGxIuO2HtFLNVWNF_-WDbjNJZqt0upfx4uKcckPtkzNU8FLrqKlY2a3iMkSWOJCOlM6pDp98yHrdaqmJAzU8AMJiUUSzN8DjpFULXoQASzAQSdHxh42yuKjcSzOYtEtaG9yG953exMko1N5ZxvnzEAy6vIgHyxD3qHMO_MPUQ5aFpeV1Rd7Df8uYqzwC5jy5jW8ACyGHMwhLFKKcNMYUIWdg')",
                }}
              ></div>
            </div>
          </motion.div>

          {/* Challenge Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {challenges.map((challenge) => (
              <motion.div key={challenge.id} variants={itemVariants}>
                <Link href={`/challenges/${challenge.id}`}>
                  <div className="bg-white dark:bg-[#2d1a25] rounded-xl overflow-hidden border border-[#f4f0f2] dark:border-[#3d2a35] hover:border-[#e9208f]/50 transition-all hover:-translate-y-1 shadow-md hover:shadow-lg group cursor-pointer h-full">
                    {/* Image Section */}
                    <div
                      className="h-48 bg-cover bg-center relative"
                      style={{ backgroundImage: `url('${challenge.image}')` }}
                    >
                      <div className={`absolute top-4 left-4 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${getStatusBadgeStyles(challenge.status)}`}>
                        {getStatusLabel(challenge.status)}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-xs font-bold opacity-80">{challenge.category}</p>
                        <h3 className="text-lg font-bold">{challenge.title}</h3>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-[#886377]">{challenge.company}</p>
                        {renderStars(challenge.rating)}
                      </div>

                      <div className="flex items-center justify-between py-3 border-y border-[#f4f0f2] dark:border-[#3d2a35]">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#886377] font-bold uppercase">Beloning</span>
                          <span className="text-[#e9208f] font-bold">+{challenge.xp} XP</span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[10px] text-[#886377] font-bold uppercase">Tijd</span>
                          <span className="font-bold">{challenge.duration} min</span>
                        </div>
                      </div>

                      <button
                        className={`w-full py-3 rounded-full font-bold text-sm transition-colors group-hover:scale-105 transform ${
                          challenge.status === 'in-progress'
                            ? 'bg-[#e9208f] text-white'
                            : challenge.status === 'completed'
                              ? 'bg-gray-100 dark:bg-white/5 text-[#886377] cursor-not-allowed'
                              : 'bg-[#f4f0f2] dark:bg-white/5 text-[#e9208f] group-hover:bg-[#e9208f] group-hover:text-white'
                        }`}
                      >
                        {challenge.status === 'in-progress' ? 'Ga verder' : challenge.status === 'completed' ? 'Klaar!' : 'Starten'}
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Right Stats Panel - Desktop Only */}
      <aside className="w-80 bg-white dark:bg-[#2d1a25] border-l border-[#f4f0f2] dark:border-[#3d2a35] p-8 hidden xl:flex flex-col overflow-y-auto">
        <h3 className="text-xl font-black mb-6">Jouw Challenge Stats</h3>
        <div className="space-y-6">
          {/* XP Stat Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#e9208f]/10 dark:bg-[#e9208f]/5 p-6 rounded-xl border border-[#e9208f]/20"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-[#e9208f] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                military_tech
              </span>
              <span className="text-xs font-bold text-[#e9208f] px-2 py-1 bg-white dark:bg-[#e9208f]/10 rounded-full">LEVEL 12</span>
            </div>
            <p className="text-sm font-bold text-[#886377] uppercase tracking-wider">Totaal XP</p>
            <h4 className="text-3xl font-black text-[#e9208f]">2,450</h4>
            <div className="w-full bg-white dark:bg-white/10 h-2 rounded-full mt-4 relative">
              <div className="absolute top-0 left-0 h-full bg-[#e9208f] rounded-full w-3/4 shadow-[0_0_10px_rgba(233,32,143,0.5)]"></div>
            </div>
            <p className="text-[10px] font-bold text-[#886377] mt-2 text-right">350 XP TOT LEVEL 13</p>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-orange-50 dark:bg-orange-500/10 p-6 rounded-xl border border-orange-200 dark:border-orange-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="bg-orange-500 text-white size-12 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 rotate-3" style={{ fontVariationSettings: "'FILL' 1" }}>
                <span className="material-symbols-outlined">local_fire_department</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#886377] uppercase tracking-wider leading-none mb-1">Dagen Streak</p>
                <h4 className="text-2xl font-black text-orange-600 dark:text-orange-400">5 Dagen</h4>
              </div>
            </div>
          </motion.div>

          {/* Completed Challenges Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#f4f0f2] dark:bg-white/5 p-6 rounded-xl border border-[#e4e0e2] dark:border-white/10"
          >
            <p className="text-sm font-bold text-[#886377] uppercase tracking-wider mb-2">Challenges Voltooid</p>
            <div className="flex items-baseline gap-2">
              <h4 className="text-3xl font-black">12</h4>
              <span className="text-[#2cc069] text-sm font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                +3 deze week
              </span>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-4"
          >
            <h5 className="text-sm font-black uppercase tracking-widest text-[#886377] mb-4">Laatste Activiteit</h5>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-[#e9208f]"></div>
                <p className="text-xs font-semibold">UX Design Case Study gestart</p>
                <span className="text-[10px] text-[#886377] ml-auto">2u geleden</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-[#2cc069]"></div>
                <p className="text-xs font-semibold">Branding Challenge voltooid</p>
                <span className="text-[10px] text-[#886377] ml-auto">Gisteren</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-[#ff9f43]"></div>
                <p className="text-xs font-semibold">Finance Workshop in progress</p>
                <span className="text-[10px] text-[#886377] ml-auto">2 days ago</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-auto w-full py-4 border-2 border-[#e9208f] text-[#e9208f] hover:bg-[#e9208f] hover:text-white rounded-xl font-black transition-all"
        >
          Leaderboard Bekijken
        </motion.button>
      </aside>
    </div>
  );
}
