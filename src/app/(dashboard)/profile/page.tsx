"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn, calculateLevel, formatXP } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// ============================================================================
// TYPES
// ============================================================================

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  bio: string;
  interests: string[];
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_PROFILE: UserProfile = {
  name: "Alex",
  email: "alex@example.com",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAj439sNQqzT3gMXfgRgAqQX1q7n1VI2BsGuAFtGfI7mVdf-VxWuiWHiajL04RDEea5sQNVIkKhu_d9x-u_n0iROOYYUgYii91KTZR3nTrMiVhfoC-APIddmtFhBi61__qY9CDttc9SuxsJoTYTpKF6of4EznReD1VPiW8KVnAXF_SXhygxuDjdWxEQSpd-7eXJ6mR6uGzJ4vJmulNniR04SmBKZ7C49w9rsJb0vm_lS0jqwLIp1AAbCbxhJeUbRcO1KkjlNkKhkEY",
  level: 3,
  xp: 1250,
  streak: 7,
  bio: "Gepassioneerd over career development en persoonlijke groei",
  interests: ["Tech", "Leadership", "Design", "Communication", "Entrepreneurship"],
};

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Profile header section
 */
const ProfileHeader: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  const { level, progress } = calculateLevel(profile.xp);
  const levelNames = [
    "Ontdekker",
    "Exploreerder",
    "Avonturier",
    "Verkenner",
    "Meester",
  ];
  const levelName = levelNames[level - 1] || "Legenda";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 text-center mb-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-primary mb-4"
          />
          <h1 className="text-3xl font-display font-bold text-txt">
            {profile.name}
          </h1>
          <p className="text-txt-secondary font-sans mt-1 break-all">
            {profile.email}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8 py-6 border-t border-b border-border-light">
          <div>
            <p className="text-3xl font-display font-bold text-primary">
              {profile.level}
            </p>
            <p className="text-xs text-txt-secondary uppercase font-sans font-semibold mt-1">
              Level
            </p>
            <p className="text-xs text-txt-secondary font-sans">{levelName}</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold text-gold">
              {formatXP(profile.xp)}
            </p>
            <p className="text-xs text-txt-secondary uppercase font-sans font-semibold mt-1">
              XP
            </p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold text-warning flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl fill-1">
                local_fire_department
              </span>
            </p>
            <p className="text-xs text-txt-secondary uppercase font-sans font-semibold mt-1">
              Streak
            </p>
            <p className="text-xs text-txt-secondary font-sans">
              {profile.streak} dagen
            </p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-txt-secondary">
              Voortgang naar Level {profile.level + 1}
            </span>
            <span className="text-xs font-bold text-txt-secondary">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-bg-light dark:bg-[#3d2a35] h-3 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-primary to-pink-400 h-full rounded-full"
            />
          </div>
        </div>

        <Button variant="outline">
          <span className="material-symbols-outlined mr-2">edit</span>
          Profiel Bewerken
        </Button>
      </Card>
    </motion.div>
  );
};

/**
 * Edit profile section
 */
const EditProfileSection: React.FC = () => {
  const [bio, setBio] = useState(MOCK_PROFILE.bio);
  const [interests, setInterests] = useState(MOCK_PROFILE.interests);
  const [newInterest, setNewInterest] = useState("");

  const handleAddInterest = () => {
    if (newInterest.trim() && interests.length < 8) {
      setInterests([...interests, newInterest]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="p-6 mb-6">
        <CardHeader className="pb-4">
          <h2 className="text-xl font-display font-bold text-txt flex items-center gap-2">
            <span className="material-symbols-outlined">person</span>
            Profiel Instellingen
          </h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-xs font-sans font-semibold text-txt-secondary uppercase mb-2">
              Voornaam
            </label>
            <input
              type="text"
              defaultValue={MOCK_PROFILE.name}
              className="w-full px-4 py-2 rounded-lg bg-bg-light dark:bg-[#3d2a35] text-txt border border-border-light focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-sans font-semibold text-txt-secondary uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue={MOCK_PROFILE.email}
              className="w-full px-4 py-2 rounded-lg bg-bg-light dark:bg-[#3d2a35] text-txt border border-border-light focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-sans font-semibold text-txt-secondary uppercase mb-2">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Vertel ons meer over jezelf..."
              className="w-full px-4 py-2 rounded-lg bg-bg-light dark:bg-[#3d2a35] text-txt border border-border-light focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={4}
            />
            <p className="text-xs text-txt-secondary mt-1">
              {bio.length}/150 karakters
            </p>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-xs font-sans font-semibold text-txt-secondary uppercase mb-2">
              Interesses
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddInterest()}
                placeholder="Voeg interesse toe..."
                className="flex-1 px-4 py-2 rounded-lg bg-bg-light dark:bg-[#3d2a35] text-txt border border-border-light focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button onClick={handleAddInterest} variant="primary" size="sm">
                <span className="material-symbols-outlined">add</span>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-full text-sm font-sans"
                >
                  {interest}
                  <button
                    onClick={() => handleRemoveInterest(idx)}
                    className="ml-1 hover:opacity-70"
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/**
 * Account settings section
 */
const AccountSettingsSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6 mb-6">
        <CardHeader className="pb-4">
          <h2 className="text-xl font-display font-bold text-txt flex items-center gap-2">
            <span className="material-symbols-outlined">settings</span>
            Account Instellingen
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border-light">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-txt-secondary">
                privacy_tip
              </span>
              <div>
                <p className="font-sans font-semibold text-txt">
                  Twee-Factor Authenticatie
                </p>
                <p className="text-xs text-txt-secondary font-sans">
                  Beveilig je account
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-bg-light dark:bg-[#3d2a35] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border-light">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-txt-secondary">
                mail
              </span>
              <div>
                <p className="font-sans font-semibold text-txt">
                  Email Notificaties
                </p>
                <p className="text-xs text-txt-secondary font-sans">
                  Updates en aankondigingen
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-bg-light dark:bg-[#3d2a35] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border-light">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-txt-secondary">
                visibility
              </span>
              <div>
                <p className="font-sans font-semibold text-txt">
                  Profiel Zichtbaarheid
                </p>
                <p className="text-xs text-txt-secondary font-sans">
                  Zichtbaar voor andere gebruikers
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-bg-light dark:bg-[#3d2a35] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/**
 * Notification preferences section
 */
const NotificationPreferencesSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-6 mb-6">
        <CardHeader className="pb-4">
          <h2 className="text-xl font-display font-bold text-txt flex items-center gap-2">
            <span className="material-symbols-outlined">notifications</span>
            Notificatie Voorkeur
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border-light">
            <div>
              <p className="font-sans font-semibold text-txt">Challenges</p>
              <p className="text-xs text-txt-secondary font-sans">
                Meldingen over nieuwe challenges
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-bg-light dark:bg-[#3d2a35] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border-light">
            <div>
              <p className="font-sans font-semibold text-txt">Community Posts</p>
              <p className="text-xs text-txt-secondary font-sans">
                Reacties op je posts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-bg-light dark:bg-[#3d2a35] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-sans font-semibold text-txt">Matches</p>
              <p className="text-xs text-txt-secondary font-sans">
                Nieuwe opportuniteiten die voor je passen
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-bg-light dark:bg-[#3d2a35] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/**
 * Privacy settings section
 */
const PrivacySettingsSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="p-6 mb-6">
        <CardHeader className="pb-4">
          <h2 className="text-xl font-display font-bold text-txt flex items-center gap-2">
            <span className="material-symbols-outlined">security</span>
            Privacy
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <span className="material-symbols-outlined mr-2">lock</span>
            Wachtwoord Wijzigen
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <span className="material-symbols-outlined mr-2">sync</span>
            Mijn Data Downloaden
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-warning hover:text-warning"
          >
            <span className="material-symbols-outlined mr-2">delete</span>
            Account Verwijderen
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function ProfilePage() {
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
          Mijn Profiel
        </h1>
        <p className="text-txt-secondary font-sans text-lg">
          Beheer je account instellingen en privacyvoorkeuren
        </p>
      </motion.div>

      {/* Profile Header */}
      <ProfileHeader profile={MOCK_PROFILE} />

      {/* Edit Profile Section */}
      <EditProfileSection />

      {/* Account Settings */}
      <AccountSettingsSection />

      {/* Notification Preferences */}
      <NotificationPreferencesSection />

      {/* Privacy Settings */}
      <PrivacySettingsSection />

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button
          variant="outline"
          className="w-full text-warning hover:text-warning border-warning/20"
          size="lg"
        >
          <span className="material-symbols-outlined mr-2">logout</span>
          Uitloggen
        </Button>
      </motion.div>
    </div>
  );
}
