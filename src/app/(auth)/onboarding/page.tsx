"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const KlymeUppLogo = () => (
  <svg
    className="w-8 h-8 text-primary"
    fill="currentColor"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" />
  </svg>
);

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: "Ontdek je Talent",
    description:
      "Maak assessment tests om je sterktes, interesses en passies te ontdekken. Gebruik deze inzichten om je perfecte carrièrepad te vinden.",
    icon: "lightbulb",
    color: "from-primary to-pink-400",
  },
  {
    id: 2,
    title: "Gamified Leren",
    description:
      "Verdien XP punten, behaald badges, en claim je plaats in de leaderboards. Leren is leuk, competitief, en beloningend.",
    icon: "emoji_events",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 3,
    title: "Bouw je Toekomst",
    description:
      "Match jezelf met stageplaten en banen van topbedrijven. Begin je carrière met vertrouwen en ondersteunning van mentor.",
    icon: "rocket_launch",
    color: "from-purple-500 to-pink-400",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => prev + 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      // Go to dashboard on final slide
      router.push("/dashboard");
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  const handleDotClick = (index: number) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-white flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="bg-primary/10 p-2 rounded-lg">
          <KlymeUppLogo />
        </div>
        <h2 className="text-lg font-display font-bold text-gray-900 hidden sm:block">
          KlymeUpp
        </h2>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
      >
        Overslaan
      </button>

      {/* Main Content */}
      <div className="w-full max-w-2xl">
        {/* Slide Container */}
        <div className="relative min-h-[500px] flex flex-col items-center justify-center">
          <div
            className={`w-full transition-all duration-300 ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {/* Icon Circle */}
            <div className="flex justify-center mb-8">
              <div
                className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${slide.color} flex items-center justify-center shadow-lg shadow-primary/20 animate-float`}
              >
                <span className="material-symbols-outlined text-6xl text-white">
                  {slide.icon}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="text-center max-w-md">
              <h1 className="text-4xl md:text-5xl font-display font-extrabold text-gray-900 mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 font-sans">
                {slide.description}
              </p>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex gap-3 mt-16 justify-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  index === currentSlide
                    ? "w-8 h-3 bg-primary"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-20 gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="hidden sm:inline">Vorige</span>
          </button>

          {isLastSlide ? (
            <button
              onClick={handleNext}
              className="flex items-center justify-center gap-2 flex-1 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
            >
              <span>Ga naar Dashboard</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center justify-center gap-2 flex-1 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
            >
              <span>Volgende</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          )}
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-6 text-sm text-gray-500 font-semibold">
          <span>{currentSlide + 1}</span>
          <span className="text-gray-300 mx-2">/</span>
          <span>{slides.length}</span>
        </div>
      </div>
    </div>
  );
}
