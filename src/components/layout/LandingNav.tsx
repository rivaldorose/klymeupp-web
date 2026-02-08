"use client";

import Link from "next/link";
import { useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Hoe het werkt", href: "#how-it-works" },
  { label: "Succesverhalen", href: "#success-stories" },
  { label: "Contact", href: "#contact" },
];

export default function LandingNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background-light bg-opacity-95 backdrop-blur supports-[backdrop-filter]:bg-opacity-80 border-b border-border-light dark:bg-background-dark dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary font-display hover:opacity-90 transition-opacity">
              KlymeUpp
            </h1>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-secondary dark:text-text-muted hover:text-primary dark:hover:text-primary font-medium text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 text-text-primary dark:text-text-inverse font-medium text-sm border border-border-light dark:border-border-dark rounded-lg hover:bg-surface-muted dark:hover:bg-surface-dark transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 bg-primary text-white font-medium text-sm rounded-lg hover:bg-primary-dark transition-colors shadow-duo"
            >
              Start nu gratis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-muted dark:hover:bg-surface-dark transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl text-text-primary dark:text-text-inverse">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border-light dark:border-border-dark">
            <div className="flex flex-col gap-3 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-text-secondary dark:text-text-muted hover:text-primary dark:hover:text-primary font-medium text-sm transition-colors rounded-lg hover:bg-surface-muted dark:hover:bg-surface-dark"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col gap-2 pt-2 px-4">
                <Link
                  href="/login"
                  className="px-4 py-2.5 text-center text-text-primary dark:text-text-inverse font-medium text-sm border border-border-light dark:border-border-dark rounded-lg hover:bg-surface-muted dark:hover:bg-surface-dark transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2.5 text-center bg-primary text-white font-medium text-sm rounded-lg hover:bg-primary-dark transition-colors shadow-duo"
                >
                  Start nu gratis
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
