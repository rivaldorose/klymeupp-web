import PartnerSidebar from "@/components/layout/PartnerSidebar";

export default function PartnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row md:h-screen bg-bg-light dark:bg-[#1a1a1a]">
      {/* Sidebar */}
      <PartnerSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto md:ml-72 pb-20 md:pb-0 pt-6 md:pt-8 px-4 md:px-8">
        {children}
      </main>
    </div>
  );
}
