"use client";

import { motion } from "framer-motion";
import LandingNav from "@/components/layout/LandingNav";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { staggerChildren: 0.1 },
  viewport: { once: true },
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark overflow-x-hidden">
      <LandingNav />

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="flex flex-col gap-6 md:gap-8"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="material-symbols-outlined text-lg text-primary">
                auto_awesome
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Level up je carrière
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-txt dark:text-white"
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              Ontdek je talent.{" "}
              <span className="text-primary">Bouw je toekomst.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl text-txt-secondary dark:text-gray-300 max-w-lg leading-relaxed"
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              Ontwikkel skills, verdien badges en vind de baan die echt bij je
              past. Gamified career development voor de nieuwe generatie.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-2"
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <button className="group relative h-14 px-8 bg-primary text-white font-bold rounded-2xl text-lg overflow-hidden shadow-[0_4px_0_#c21575] active:shadow-none active:translate-y-1 transition-all hover:scale-105">
                <span className="relative z-10">Start nu gratis</span>
                <div className="absolute inset-0 bg-primary-dark opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button className="h-14 px-8 border-2 border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-txt dark:text-white font-bold rounded-2xl text-lg hover:bg-bg-light dark:hover:bg-surface-darker transition-all shadow-[0_4px_0_#e5dce1] dark:shadow-[0_4px_0_#3d2a35] active:shadow-none active:translate-y-1">
                Bekijk hoe het werkt
              </button>
            </motion.div>
          </motion.div>

          {/* Right Visual: Phone Mockup */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-sm">
              {/* Phone mockup frame */}
              <motion.div
                className="relative rounded-[3rem] border-[12px] border-txt bg-white dark:bg-surface-dark p-4 shadow-2xl"
                variants={floatingAnimation}
                animate="animate"
              >
                <div className="flex flex-col gap-6 p-3 bg-bg-light dark:bg-surface-darker rounded-[2.5rem] overflow-hidden">
                  {/* Mockup Header */}
                  <div className="flex items-center justify-between px-4 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-dark" />
                      <div>
                        <div className="text-sm font-bold text-txt dark:text-white">
                          Alex
                        </div>
                        <div className="text-xs font-bold uppercase text-primary">
                          Level 15
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-900">
                      <span className="material-symbols-outlined text-sm filled">
                        bolt
                      </span>
                      450 XP
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="rounded-2xl bg-white dark:bg-surface-dark p-4 mx-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-txt dark:text-white">
                        Critical Thinking
                      </span>
                      <span className="text-xs font-bold text-primary">
                        80%
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full w-4/5 bg-primary" />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="grid grid-cols-3 gap-2 px-4 pb-4">
                    {[
                      { icon: "psychology", label: "Analytisch", color: "bg-blue-100 text-blue-600" },
                      { icon: "groups", label: "Teamwork", color: "bg-green-100 text-green-600" },
                      { icon: "lightbulb", label: "Creatief", color: "bg-purple-100 text-purple-600" },
                    ].map((badge) => (
                      <div
                        key={badge.label}
                        className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-2 bg-white dark:bg-surface-dark dark:border-border-dark"
                      >
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${badge.color}`}
                        >
                          <span className="material-symbols-outlined">
                            {badge.icon}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-txt dark:text-white">
                          {badge.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -right-6 top-12 flex h-20 w-20 items-center justify-center rounded-2xl bg-white dark:bg-surface-dark shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
              >
                <span className="material-symbols-outlined text-4xl text-yellow-500 filled">
                  emoji_events
                </span>
              </motion.div>

              <motion.div
                className="absolute -left-8 bottom-20 flex items-center gap-3 rounded-2xl bg-white dark:bg-surface-dark p-4 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div className="font-bold text-sm text-txt dark:text-white">
                  +150 Skills XP
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-white dark:bg-surface-dark/30">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 md:mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-txt dark:text-white mb-4">
              Waarom KlymeUpp?
            </h2>
            <p className="text-lg md:text-xl text-txt-secondary dark:text-gray-300 max-w-2xl mx-auto">
              De leukste manier om aan je carrière te werken.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              {
                icon: "emoji_events",
                title: "Gamified Leren",
                description:
                  "Interactieve quests in plaats van saaie cursussen. Ontdek je sterke punten terwijl je uitdagingen voltooit.",
                color: "bg-pink-100 text-primary",
              },
              {
                icon: "route",
                title: "Persoonlijke Leerroute",
                description:
                  "AI-gestuurde skill tree aangepast aan jouw doelen. Leer wat écht relevant is voor je toekomst.",
                color: "bg-yellow-100 text-yellow-600",
              },
              {
                icon: "work",
                title: "Digitale Portfolio",
                description:
                  "Showcase je werk en achievements. Zet je beste voet naar voren bij potentiële werkgevers.",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: "handshake",
                title: "Stage Matching",
                description:
                  "AI-powered matching met bedrijven. Geen cv's meer sturen naar een zwart gat.",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: "groups",
                title: "Community",
                description:
                  "Leer samen met peers. Deel ervaringen, tips en motiveer elkaar op het pad naar succes.",
                color: "bg-purple-100 text-purple-600",
              },
              {
                icon: "favorite",
                title: "Welzijn & Support",
                description:
                  "Holistische ondersteuning voor je groei. Mental health resources en mentorship inbegrepen.",
                color: "bg-red-100 text-red-600",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="group flex flex-col gap-6 rounded-3xl border-2 border-border-light dark:border-border-dark bg-white dark:bg-surface-darker p-8 transition-all hover:border-primary hover:shadow-lg"
                variants={fadeInUp}
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color} group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-3xl">
                    {feature.icon}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl md:text-2xl font-bold text-txt dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-txt-secondary dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 md:mb-20"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-txt dark:text-white mb-4">
              Hoe werkt het?
            </h2>
            <p className="text-lg md:text-xl text-txt-secondary dark:text-gray-300 max-w-2xl mx-auto">
              Drie stappen naar je droomcarrière.
            </p>
          </motion.div>

          {/* Steps Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              {
                step: 1,
                icon: "person_add",
                title: "Maak je profiel",
                description:
                  "Beantwoord enkele vragen over jezelf, je interesses en ambities. Geen cv's nodig!",
              },
              {
                step: 2,
                icon: "emoji_events",
                title: "Volg challenges",
                description:
                  "Kies uit honderden interactieve quests en bouw je skills op terwijl je punten verdient.",
              },
              {
                step: 3,
                icon: "rocket_launch",
                title: "Bouw je toekomst",
                description:
                  "Word gematcht met stages en banen die perfect bij jou passen. Tijd voor je volgende avontuur!",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                className="relative flex flex-col items-center text-center"
                variants={fadeInUp}
              >
                {/* Step Number Circle */}
                <motion.div
                  className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-4xl">
                      {item.icon}
                    </span>
                  </div>
                </motion.div>

                {/* Connector Line (hidden on mobile, shown on md+) */}
                {item.step < 3 && (
                  <div className="hidden md:block absolute top-12 -right-full w-full h-1 bg-gradient-to-r from-primary/50 to-transparent" />
                )}

                {/* Content */}
                <h3 className="text-2xl md:text-xl font-bold text-txt dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-txt-secondary dark:text-gray-300 leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-white dark:bg-surface-dark/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              { number: "500+", label: "Jongeren", icon: "groups" },
              { number: "50+", label: "Bedrijven", icon: "business" },
              { number: "1000+", label: "Challenges", icon: "emoji_events" },
              { number: "95%", label: "Tevredenheid", icon: "thumb_up" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center gap-4 text-center"
                variants={fadeInUp}
              >
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="material-symbols-outlined text-4xl">
                    {stat.icon}
                  </span>
                </motion.div>
                <div>
                  <p className="text-3xl md:text-4xl font-black text-primary mb-1">
                    {stat.number}
                  </p>
                  <p className="text-txt-secondary dark:text-gray-300 font-semibold">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-6 lg:px-8 overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto relative z-10 rounded-[3rem] bg-primary px-8 md:px-16 py-16 md:py-24 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Decorative background elements */}
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-xl" />
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-white/10 blur-xl" />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              Klaar om te groeien?
            </motion.h2>

            <motion.p
              className="max-w-2xl text-lg md:text-xl font-medium opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Maak vandaag nog je gratis profiel aan en begin met het bouwen aan
              de carrière van je dromen.
            </motion.p>

            <motion.button
              className="group relative h-16 px-12 bg-white text-primary font-black rounded-2xl text-lg md:text-xl overflow-hidden shadow-[0_4px_0_rgba(255,255,255,0.3)] active:shadow-none active:translate-y-1 transition-all hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Maak gratis account</span>
              <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-light dark:border-border-dark bg-white dark:bg-surface-dark px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Footer Content */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined text-xl">
                  rocket_launch
                </span>
              </div>
              <h2 className="text-xl font-bold text-txt dark:text-white tracking-tight">
                KlymeUpp
              </h2>
            </motion.div>

            {/* Links */}
            <motion.div
              className="flex flex-wrap gap-6 md:gap-8 text-sm font-semibold text-txt-secondary dark:text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <a
                href="#"
                className="hover:text-primary transition-colors"
              >
                Over ons
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors"
              >
                Contact
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors"
              >
                Voorwaarden
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg-light dark:bg-surface-darker text-primary hover:bg-primary/10 transition-colors"
                aria-label="Twitter"
              >
                <span className="material-symbols-outlined">share</span>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg-light dark:bg-surface-darker text-primary hover:bg-primary/10 transition-colors"
                aria-label="Email"
              >
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
              </a>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            className="border-t border-border-light dark:border-border-dark pt-8 text-center text-sm font-medium text-txt-muted dark:text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            © 2026 KlymeUpp. Alle rechten voorbehouden. Gebouwd voor de
            makers van de toekomst.
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
