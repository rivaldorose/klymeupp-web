"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// ============================================================================
// TYPES
// ============================================================================

type TabType = "feed" | "evenementen" | "peer-circles";

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
    level: number;
  };
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  icon: string;
  color: string;
}

interface PeerCircle {
  id: string;
  name: string;
  members: number;
  description: string;
  icon: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    author: {
      name: "Sophie van Dijk",
      level: 5,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8CaIHrIeWcjB_oAh12PsRfd8Dns-ABqqFw9xuRzVfZPQSozRLBV_KZTrAn1Cs4lmeeo34tOsIaUr1x-4rnNTVKFRwkax9_beFvIS3bbZ8MzqulaUrU7f_VUTTigK98R7kl8VJhd9H48_JVWg5aWOc03mTjExLStgsOvJn7mKX4SkB3VSYNQI6VGRNtx1tANb-y3YTGsV6yyDfZL2CVaEIf_wNjbD7MwiuCev1kcsi2PeW0cvNrOYwLWB46fIPEMA6437qF_04CZk",
    },
    content:
      "Ja! Ik ben net klaar met mijn stageperiode bij een tech startup. Het was ongelofelijk veel leren! Als iemand vragen heeft over het interviewproces, vraag maar.",
    likes: 24,
    comments: 8,
    timestamp: "2 uur geleden",
    tags: ["stage", "tech", "tips"],
  },
  {
    id: "post-2",
    author: {
      name: "Marco de Silva",
      level: 3,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8CaIHrIeWcjB_oAh12PsRfd8Dns-ABqqFw9xuRzVfZPQSozRLBV_KZTrAn1Cs4lmeeo34tOsIaUr1x-4rnNTVKFRwkax9_beFvIS3bbZ8MzqulaUrU7f_VUTTigK98R7kl8VJhd9H48_JVWg5aWOc03mTjExLStgsOvJn7mKX4SkB3VSYNQI6VGRNtx1tANb-y3YTGsV6yyDfZL2CVaEIf_wNjbD7MwiuCev1kcsi2PeW0cvNrOYwLWB46fIPEMA6437qF_04CZk",
    },
    content:
      "Iemand tips voor het schrijven van een goede CV? Ik vind het moeilijk om mijn ervaringen op een goede manier op papier te zetten.",
    likes: 12,
    comments: 15,
    timestamp: "5 uur geleden",
    tags: ["cv", "beginner", "hulp"],
  },
  {
    id: "post-3",
    author: {
      name: "Emma Konings",
      level: 4,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtesd5U7uTfcTpT0mFBXSocgyAYRRElMZ_BN9h5Q19M7nXZyW0J_M45nzFPn2oxmXqH0YiSaMdhUHAYnwvq5RFOY_xal8Ya2iCp7z3TgjEO16DQR8Lyk1E3grlVNjAdyewLPMEt6F56g3_eqtLizqaI_Z6iHIQs259x-ZfbI4WSTM0kQDQ7eitYiVGQ2MqakdkX3wa1n1oLEebKarMLUxXlClz_Fpnp3jcV8XJSHTTCy6xPI6vAOCw7_QqpP5g4B4kK3S7WBQgYLE",
    },
    content:
      "Volgende week organiseer ik een mock interview sessie! Zou graag 3-4 mensen hebben die hun interviewvaardigheden willen trainen. Geïnteresseerd?",
    likes: 34,
    comments: 12,
    timestamp: "1 dag geleden",
    tags: ["interview", "training", "event"],
  },
];

const MOCK_EVENTS: Event[] = [
  {
    id: "event-1",
    title: "Interview Workshop met Expert",
    date: "15 Feb 2024",
    time: "19:00 - 20:30",
    location: "Online - Zoom",
    attendees: 28,
    icon: "chat_bubble",
    color: "bg-primary/10 text-primary",
  },
  {
    id: "event-2",
    title: "Networking Event: Tech Companies",
    date: "18 Feb 2024",
    time: "17:00 - 19:00",
    location: "Amsterdam, Tech Hub",
    attendees: 45,
    icon: "group",
    color: "bg-success/10 text-success",
  },
  {
    id: "event-3",
    title: "LinkedIn Profile Masterclass",
    date: "20 Feb 2024",
    time: "18:00 - 19:00",
    location: "Online - Zoom",
    attendees: 52,
    icon: "school",
    color: "bg-soft-blue/10 text-soft-blue",
  },
];

const MOCK_PEER_CIRCLES: PeerCircle[] = [
  {
    id: "circle-1",
    name: "Tech Enthusiasts",
    members: 342,
    description: "Voor iedereen geïnteresseerd in technologie en IT",
    icon: "computer",
  },
  {
    id: "circle-2",
    name: "Creative Minds",
    members: 189,
    description: "Een plek voor designers en creatieven",
    icon: "palette",
  },
  {
    id: "circle-3",
    name: "Career Changers",
    members: 256,
    description: "Voor mensen die van carrière willen veranderen",
    icon: "trending_up",
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Post composer
 */
const PostComposer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Schrijf een bericht..."
              onClick={() => setIsExpanded(true)}
              className="w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-[#3d2a35] text-txt placeholder-txt-secondary border border-border-light focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-border-light"
          >
            <textarea
              placeholder="Vertel meer..."
              className="w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-[#3d2a35] text-txt placeholder-txt-secondary border border-border-light focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={4}
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(false)}
              >
                Annuleren
              </Button>
              <Button variant="primary">Publiceer</Button>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

/**
 * Community post card
 */
const PostCard: React.FC<{ post: CommunityPost; index: number }> = ({
  post,
  index,
}) => {
  const getLevelColor = (level: number) => {
    if (level >= 4) return "text-gold";
    if (level >= 3) return "text-primary";
    return "text-txt-secondary";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display font-bold text-txt">
                {post.author.name}
              </h3>
              <span className={cn("material-symbols-outlined text-lg fill-1", getLevelColor(post.author.level))}>
                star
              </span>
              <span className={cn("text-xs font-bold", getLevelColor(post.author.level))}>
                Level {post.author.level}
              </span>
            </div>
            <p className="text-xs text-txt-secondary font-sans">{post.timestamp}</p>
          </div>
        </div>

        <p className="text-txt font-sans mb-4 leading-relaxed">
          {post.content}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-border-light text-txt-secondary text-sm">
          <button className="flex items-center gap-2 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">favorite</span>
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center gap-2 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">chat_bubble</span>
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center gap-2 hover:text-primary transition-colors ml-auto">
            <span className="material-symbols-outlined text-lg">share</span>
          </button>
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * Event card
 */
const EventCard: React.FC<{ event: Event; index: number }> = ({ event, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className={cn("p-3 rounded-lg", event.color)}>
              <span className="material-symbols-outlined text-2xl fill-1">
                {event.icon}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-txt mb-2">
                {event.title}
              </h3>
              <div className="flex flex-wrap gap-3 text-xs text-txt-secondary font-sans">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    event
                  </span>
                  {event.date}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    schedule
                  </span>
                  {event.time}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-0">
          <div className="space-y-3 pt-3 border-t border-border-light">
            <div className="flex items-center gap-2 text-sm text-txt-secondary">
              <span className="material-symbols-outlined text-lg">location_on</span>
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-txt-secondary mb-4">
              <span className="material-symbols-outlined text-lg">group</span>
              <span>{event.attendees} deelnemers</span>
            </div>
            <Button variant="primary" className="w-full">
              Schrijf je in
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/**
 * Peer circle card
 */
const PeerCircleCard: React.FC<{ circle: PeerCircle; index: number }> = ({
  circle,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="p-6 text-center cursor-pointer hover:shadow-lg transition-shadow">
        <div className="w-16 h-16 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-4xl mx-auto mb-4">
          <span className="material-symbols-outlined text-5xl fill-1">
            {circle.icon}
          </span>
        </div>
        <h3 className="font-display font-bold text-txt mb-2 text-lg">
          {circle.name}
        </h3>
        <p className="text-sm text-txt-secondary font-sans mb-4 leading-relaxed">
          {circle.description}
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-txt-secondary mb-4 pb-4 border-b border-border-light">
          <span className="material-symbols-outlined text-lg">group</span>
          <span>{circle.members} leden</span>
        </div>
        <Button variant="outline" className="w-full" size="sm">
          Deelnemen
        </Button>
      </Card>
    </motion.div>
  );
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabType>("feed");

  const tabs: Array<{ id: TabType; label: string; icon: string }> = [
    { id: "feed", label: "Feed", icon: "feed" },
    { id: "evenementen", label: "Evenementen", icon: "event" },
    { id: "peer-circles", label: "Peer Circles", icon: "groups" },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-txt mb-2">
          Community
        </h1>
        <p className="text-txt-secondary font-sans text-lg">
          Verbind je met andere jongeren en deel je ervaringen
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex gap-2 md:gap-4 border-b border-border-light mb-8"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-200 font-sans font-semibold",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-txt-secondary hover:text-txt"
            )}
          >
            <span className="material-symbols-outlined text-xl">
              {tab.icon}
            </span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <div>
        {/* Feed Tab */}
        {activeTab === "feed" && (
          <motion.div
            key="feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <PostComposer />
            {MOCK_POSTS.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </motion.div>
        )}

        {/* Evenementen Tab */}
        {activeTab === "evenementen" && (
          <motion.div
            key="evenementen"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {MOCK_EVENTS.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </motion.div>
        )}

        {/* Peer Circles Tab */}
        {activeTab === "peer-circles" && (
          <motion.div
            key="peer-circles"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {MOCK_PEER_CIRCLES.map((circle, i) => (
              <PeerCircleCard key={circle.id} circle={circle} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
