import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - KlymeUpp",
  description: "Register or login to KlymeUpp",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background-light">
      {children}
    </div>
  );
}
