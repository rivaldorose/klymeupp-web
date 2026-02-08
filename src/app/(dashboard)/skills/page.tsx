'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ============================================================================
// TYPES
// ============================================================================

type SkillState = 'completed' | 'active' | 'unlocked' | 'locked';
type TrackType = 'soft-skills' | 'praktijk' | 'arbeidsmarkt';

interface SkillNode {
  id: string;
  name: string;
  icon: string;
  state: SkillState;
  progress?: number;
  maxProgress?: number;
  description?: string;
  positionIndex: number;
}

interface BonusNode {
  id: string;
  name: string;
  icon: string;
  positionIndex: number;
}

interface Track {
  id: TrackType;
  label: string;
  skills: SkillNode[];
  bonus: BonusNode[];
  totalCompleted: number;
  totalSkills: number;
  estimatedTime: string;
  xpEarned: number;
  focusSkills: string[];
  streak: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_TRACKS: Record<TrackType, Track> = {
  'soft-skills': {
    id: 'soft-skills',
    label: 'Soft Skills',
    totalCompleted: 3,
    totalSkills: 8,
    estimatedTime: '~2 uur',
    xpEarned: 1250,
    focusSkills: ['#Zelfvertrouwen', '#Spreken', '#Luisteren', '#Inleving'],
    streak: 5,
    skills: [
      {
        id: 'comm',
        name: 'Communicatie',
        icon: 'forum',
        state: 'completed',
        progress: 5,
        maxProgress: 5,
        positionIndex: 0,
      },
      {
        id: 'collab',
        name: 'Samenwerken',
        icon: 'groups',
        state: 'completed',
        progress: 5,
        maxProgress: 5,
        positionIndex: 1,
      },
      {
        id: 'present',
        name: 'Presenteren',
        icon: 'play_arrow',
        state: 'active',
        progress: 3,
        maxProgress: 5,
        positionIndex: 2,
      },
      {
        id: 'creative',
        name: 'Creativiteit',
        icon: 'lightbulb',
        state: 'unlocked',
        progress: 0,
        maxProgress: 5,
        positionIndex: 3,
      },
      {
        id: 'leadership',
        name: 'Leiderschap',
        icon: 'trending_up',
        state: 'locked',
        positionIndex: 4,
      },
      {
        id: 'problem',
        name: 'Probleemoplossing',
        icon: 'settings_suggest',
        state: 'locked',
        positionIndex: 5,
      },
      {
        id: 'entrepreneur',
        name: 'Ondernemerschap',
        icon: 'rocket_launch',
        state: 'locked',
        positionIndex: 6,
      },
      {
        id: 'resilience',
        name: 'Weerbaarheid',
        icon: 'shield',
        state: 'locked',
        positionIndex: 7,
      },
    ],
    bonus: [
      {
        id: 'bonus1',
        name: 'Mini Challenge',
        icon: 'star',
        positionIndex: 2,
      },
    ],
  },
  'praktijk': {
    id: 'praktijk',
    label: 'Praktijkvaardigheden',
    totalCompleted: 2,
    totalSkills: 7,
    estimatedTime: '~3 uur',
    xpEarned: 850,
    focusSkills: ['#Excel', '#Presentaties', '#Communicatie', '#Teamwork'],
    streak: 3,
    skills: [
      {
        id: 'excel',
        name: 'Excel Basis',
        icon: 'table_chart',
        state: 'completed',
        progress: 5,
        maxProgress: 5,
        positionIndex: 0,
      },
      {
        id: 'word',
        name: 'Word & Documenten',
        icon: 'description',
        state: 'completed',
        progress: 5,
        maxProgress: 5,
        positionIndex: 1,
      },
      {
        id: 'ppt',
        name: 'PowerPoint',
        icon: 'slideshow',
        state: 'active',
        progress: 2,
        maxProgress: 5,
        positionIndex: 2,
      },
      {
        id: 'email',
        name: 'Email & Outlook',
        icon: 'mail',
        state: 'unlocked',
        positionIndex: 3,
      },
      {
        id: 'teams',
        name: 'Teams & Samenwerking',
        icon: 'group_chat',
        state: 'locked',
        positionIndex: 4,
      },
      {
        id: 'basics',
        name: 'IT Basics',
        icon: 'computer',
        state: 'locked',
        positionIndex: 5,
      },
      {
        id: 'security',
        name: 'Cybersecurity',
        icon: 'lock',
        state: 'locked',
        positionIndex: 6,
      },
    ],
    bonus: [
      {
        id: 'bonus2',
        name: 'Speed Challenge',
        icon: 'flash_on',
        positionIndex: 3,
      },
    ],
  },
  'arbeidsmarkt': {
    id: 'arbeidsmarkt',
    label: 'Arbeidsmarkt',
    totalCompleted: 1,
    totalSkills: 6,
    estimatedTime: '~2.5 uur',
    xpEarned: 420,
    focusSkills: ['#CV', '#Solliciteren', '#Interview', '#Netwerken'],
    streak: 2,
    skills: [
      {
        id: 'cv',
        name: 'CV Schrijven',
        icon: 'description',
        state: 'completed',
        progress: 5,
        maxProgress: 5,
        positionIndex: 0,
      },
      {
        id: 'letter',
        name: 'Sollicitatiebrief',
        icon: 'mail_outline',
        state: 'active',
        progress: 1,
        maxProgress: 5,
        positionIndex: 1,
      },
      {
        id: 'interview',
        name: 'Interview Voorbereiding',
        icon: 'record_voice_over',
        state: 'unlocked',
        positionIndex: 2,
      },
      {
        id: 'network',
        name: 'Netwerken',
        icon: 'person_add',
        state: 'locked',
        positionIndex: 3,
      },
      {
        id: 'linkedIn',
        name: 'LinkedIn Profile',
        icon: 'business',
        state: 'locked',
        positionIndex: 4,
      },
      {
        id: 'negotiation',
        name: 'Onderhandelen',
        icon: 'handshake',
        state: 'locked',
        positionIndex: 5,
      },
    ],
    bonus: [
      {
        id: 'bonus3',
        name: 'Networking Event',
        icon: 'celebration',
        positionIndex: 1,
      },
    ],
  },
};

// ============================================================================
// COMPONENTS
// ============================================================================

interface SkillNodeComponentProps {
  node: SkillNode;
  isActive: boolean;
  onContinue: () => void;
}

function SkillNodeComponent({
  node,
  isActive,
  onContinue,
}: SkillNodeComponentProps) {
  const getNodeStyles = () => {
    switch (node.state) {
      case 'completed':
        return 'bg-[#FFD700] border-white dark:border-[#1a0d15]';
      case 'active':
        return 'bg-[#e9208f] border-white dark:border-[#1a0d15] shadow-[0_0_20px_5px_rgba(233,32,143,0.4)]';
      case 'unlocked':
        return 'bg-white dark:bg-[#2d1a26] border-[#e9208f]';
      case 'locked':
        return 'bg-[#e5dce1] dark:bg-[#3d2a36] border-white dark:border-[#1a0d15]';
    }
  };

  const getIconColor = () => {
    if (node.state === 'completed') return 'text-white';
    if (node.state === 'active') return 'text-white';
    if (node.state === 'unlocked') return 'text-[#e9208f]';
    return 'text-[#886377]';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: node.positionIndex * 0.1 }}
      className="relative z-10 flex flex-col items-center group"
    >
      <div
        className={`size-20 rounded-full border-4 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 ${getNodeStyles()}`}
      >
        <span
          className={`material-symbols-outlined text-4xl ${getIconColor()}`}
          style={{
            fontVariationSettings: node.state === 'completed' ? "'FILL' 1" : undefined,
          }}
        >
          {node.state === 'locked' ? 'lock' : node.icon}
        </span>
      </div>

      {isActive && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onContinue}
          className="absolute -bottom-6 flex items-center gap-2 bg-[#e9208f] text-white px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap shadow-xl hover:bg-[#d01c7f] transition-colors"
        >
          <span>Ga verder</span>
          <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
        </motion.button>
      )}

      <div className="mt-4 text-center">
        <h3
          className={`font-bold text-sm ${node.state === 'locked' ? 'opacity-50 text-[#886377]' : ''}`}
        >
          {node.name}
        </h3>
        {node.maxProgress && (
          <p className={`text-xs mt-1 ${node.state === 'completed' ? 'text-[#FFD700]' : 'text-[#886377]'}`}>
            {node.progress}/{node.maxProgress} ringen
          </p>
        )}
      </div>
    </motion.div>
  );
}

interface BonusNodeComponentProps {
  node: BonusNode;
  offset: { top: string; right?: string; left?: string };
}

function BonusNodeComponent({ node, offset }: BonusNodeComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: node.positionIndex * 0.1 + 0.5 }}
      style={offset}
      className="absolute z-10 flex flex-col items-center group"
    >
      <div className="size-14 rotate-12 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] shadow-lg flex items-center justify-center border-4 border-white dark:border-[#1a0d15] cursor-pointer hover:scale-110 transition-transform">
        <span
          className="material-symbols-outlined text-white"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {node.icon}
        </span>
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-xs font-bold text-[#FFD700]">{node.name}</h3>
      </div>
    </motion.div>
  );
}

interface TrackSelectorProps {
  tracks: TrackType[];
  activeTrack: TrackType;
  onTrackChange: (track: TrackType) => void;
  trackLabels: Record<TrackType, string>;
}

function TrackSelector({
  tracks,
  activeTrack,
  onTrackChange,
  trackLabels,
}: TrackSelectorProps) {
  return (
    <div className="flex gap-3 mb-8">
      {tracks.map((track) => (
        <button
          key={track}
          onClick={() => onTrackChange(track)}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
            activeTrack === track
              ? 'bg-[#e9208f] text-white shadow-lg'
              : 'bg-[#f8f6f7] dark:bg-[#2d1a26] text-[#181115] dark:text-white hover:bg-[#f0e8ed]'
          }`}
        >
          {trackLabels[track]}
        </button>
      ))}
    </div>
  );
}

interface SVGPathProps {
  nodeCount: number;
}

function SVGPath({ nodeCount }: SVGPathProps) {
  // Calculate SVG path based on number of nodes
  const height = Math.max(1000, nodeCount * 150);

  return (
    <svg
      className="skill-path-svg absolute top-0 left-1/2 transform -translate-x-1/2 w-full"
      style={{ height: `${height}px` }}
      viewBox={`0 0 600 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Full path (unfilled) */}
      <path
        d={`M 300 0 Q 300 120, 450 150 Q 480 160, 450 220 Q 400 280, 150 350 Q 100 370, 150 450 Q 200 520, 450 600 Q 480 620, 450 680 Q 400 740, 150 800 Q 100 820, 150 900 Q 200 970, 450 1050`}
        stroke="#e5dce1"
        strokeLinecap="round"
        strokeWidth="12"
      />
      {/* Active path (progress) */}
      <path
        d={`M 300 0 Q 300 120, 450 150 Q 480 160, 450 220 Q 400 280, 150 350 Q 100 370, 150 450 Q 200 520, 450 600`}
        stroke="#e9208f"
        strokeLinecap="round"
        strokeWidth="12"
      />
    </svg>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SkillsPage() {
  const [activeTrack, setActiveTrack] = useState<TrackType>('soft-skills');
  const track = MOCK_TRACKS[activeTrack];
  const progressPercentage = (track.totalCompleted / track.totalSkills) * 100;

  const nodePositions = useMemo(() => {
    return track.skills.map((skill, index) => {
      const isLeft = index % 2 === 0;
      return { skill, isLeft };
    });
  }, [track.skills]);

  const handleContinueClick = () => {
    // Navigate to the actual lesson/content page
    console.log('Continue with active skill:', track.skills.find((s) => s.state === 'active')?.name);
  };

  const getBonusOffset = (positionIndex: number) => {
    if (positionIndex === 1) {
      return { top: '250px', right: '50px' };
    }
    if (positionIndex === 2) {
      return { top: '450px', right: '80px' };
    }
    return { top: '650px', right: '20px' };
  };

  return (
    <div className="flex h-screen w-full bg-white dark:bg-[#1a0d15]">
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative overflow-y-auto custom-scrollbar flex flex-col items-center">
        {/* STICKY HEADER */}
        <div className="sticky top-0 w-full bg-white/80 dark:bg-[#1a0d15]/80 backdrop-blur-md z-30 px-8 py-6 border-b border-[#f0e8ed] dark:border-[#2d1a26]">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black tracking-tight">Jouw Leerpad</h1>
              <p className="text-sm text-[#886377] dark:text-[#b391a3]">
                Stippel je eigen pad naar succes uit
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="w-full max-w-6xl px-8 py-8">
          {/* TRACK SELECTOR */}
          <TrackSelector
            tracks={Object.keys(MOCK_TRACKS) as TrackType[]}
            activeTrack={activeTrack}
            onTrackChange={setActiveTrack}
            trackLabels={{
              'soft-skills': 'Soft Skills',
              'praktijk': 'Praktijkvaardigheden',
              'arbeidsmarkt': 'Arbeidsmarkt',
            }}
          />

          {/* SKILL TREE */}
          <div className="relative w-[600px] mx-auto min-h-[1400px] py-20 flex flex-col items-center gap-24">
            {/* SVG PATH BACKGROUND */}
            <SVGPath nodeCount={track.skills.length} />

            {/* DECORATIVE ELEMENTS */}
            <span className="material-symbols-outlined absolute top-40 right-20 text-[#e9208f]/20 scale-150">
              star
            </span>
            <span className="material-symbols-outlined absolute top-[500px] left-10 text-[#e9208f]/20 scale-125">
              eco
            </span>
            <span className="material-symbols-outlined absolute top-[800px] right-10 text-[#e9208f]/20 scale-110">
              cloudy
            </span>

            {/* SKILL NODES */}
            <AnimatePresence mode="wait">
              {nodePositions.map(({ skill, isLeft }, index) => (
                <div
                  key={skill.id}
                  className={isLeft ? '-ml-[300px]' : 'ml-[300px]'}
                >
                  <SkillNodeComponent
                    node={skill}
                    isActive={skill.state === 'active'}
                    onContinue={handleContinueClick}
                  />
                </div>
              ))}
            </AnimatePresence>

            {/* BONUS NODES */}
            <AnimatePresence>
              {track.bonus.map((bonusNode) => (
                <BonusNodeComponent
                  key={bonusNode.id}
                  node={bonusNode}
                  offset={getBonusOffset(bonusNode.positionIndex)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR (DESKTOP ONLY) */}
      <aside className="hidden lg:flex w-[320px] bg-white dark:bg-[#2d1a26] border-l border-[#e5dce1] dark:border-[#3d2a36] flex-col gap-8 p-8 z-20 overflow-y-auto custom-scrollbar">
        {/* TRACK INFO CARD */}
        <section>
          <h2 className="text-lg font-extrabold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e9208f]">info</span>
            Track Info
          </h2>
          <div className="bg-[#f8f6f7] dark:bg-[#3d2a36] p-6 rounded-2xl border border-[#f0e8ed] dark:border-[#4d3a46]">
            <p className="text-sm font-bold mb-3">Voortgang</p>
            <div className="w-full h-3 bg-white dark:bg-[#21111a] rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-[#e9208f] rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-medium text-[#886377]">
              <span>{Math.round(progressPercentage)}% Compleet</span>
              <span>
                {track.totalCompleted}/{track.totalSkills} Nodes
              </span>
            </div>
          </div>
        </section>

        {/* INFO ITEMS */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 bg-[#f8f6f7] dark:bg-[#3d2a36] rounded-xl border border-[#f0e8ed] dark:border-[#4d3a46]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#e9208f]">
                schedule
              </span>
              <span className="text-sm font-medium">Geschatte tijd</span>
            </div>
            <span className="text-sm font-bold">{track.estimatedTime}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-[#f8f6f7] dark:bg-[#3d2a36] rounded-xl border border-[#f0e8ed] dark:border-[#4d3a46]">
            <div className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-[#FFD700]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              <span className="text-sm font-medium">XP verdiend</span>
            </div>
            <span className="text-sm font-bold">{track.xpEarned} XP</span>
          </div>
        </section>

        {/* FOCUS SKILLS */}
        <section>
          <h3 className="text-xs font-black uppercase tracking-wider text-[#886377] mb-4">
            Focus Vaardigheden
          </h3>
          <div className="flex flex-wrap gap-2">
            {track.focusSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-[#e9208f]/10 text-[#e9208f] text-xs font-bold rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* STREAK CARD */}
        <div className="mt-auto p-6 bg-gradient-to-br from-[#e9208f] to-[#ff4e91] rounded-2xl text-white relative overflow-hidden">
          <span
            className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl opacity-20"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            emoji_events
          </span>
          <p className="text-xs font-bold uppercase opacity-80 mb-1">Dagelijkse Streak</p>
          <h4 className="text-3xl font-black mb-3">🔥 {track.streak} Dagen</h4>
          <p className="text-xs opacity-90 leading-relaxed">
            Nog {7 - track.streak} dagen voor je volgende bonus kist!
          </p>
        </div>
      </aside>

      {/* CSS */}
      <style jsx>{`
        .skill-path-svg {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 0;
          pointer-events: none;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5dce1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4cdd1;
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4d3a46;
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #5d4a56;
        }
      `}</style>
    </div>
  );
}
