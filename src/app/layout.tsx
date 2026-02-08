import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KlymeUpp - Ontdek je talent, bouw je toekomst",
  description:
    "KlymeUpp is een gamified platform voor jongeren (16-25) om talent te ontdekken, vaardigheden te ontwikkelen en de perfecte stage of baan te vinden.",
  keywords: ["KlymeUpp", "gamification", "carrière", "jongeren", "stages", "vaardigheden"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
