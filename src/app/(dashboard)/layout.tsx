import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayout pageTitle="Dashboard">
      {children}
    </DashboardLayout>
  );
}
