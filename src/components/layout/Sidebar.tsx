"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navigationItems: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: "home" },
  { label: "Leren", href: "/skills", icon: "menu_book" },
  { label: "Stages", href: "/matching", icon: "work" },
  { label: "Challenges", href: "/challenges", icon: "bolt" },
  { label: "Portfolio", href: "/portfolio", icon: "folder_shared" },
  { label: "Profiel", href: "/profile", icon: "person" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Floating Pill Sidebar */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 bg-white p-4 rounded-full shadow-xl border border-[#f4f0f2] z-50">
        {navigationItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`size-12 flex items-center justify-center rounded-full transition-all ${
                active
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-gray-400 hover:text-primary"
              }`}
              title={item.label}
            >
              <span
                className="material-symbols-outlined"
                style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Floating Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[500px] bg-white/90 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl px-6 py-3 flex justify-between items-center z-50 lg:hidden">
        {navigationItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`p-2 flex flex-col items-center ${
                active ? "text-primary" : "text-gray-400"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
