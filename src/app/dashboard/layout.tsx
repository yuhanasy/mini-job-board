import DashboardBreadcrumbs from "@/components/dashboard-breadcrumbs";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[200px_1fr] w-full">
      <Sidebar />

      <div className="py-4 px-8 flex flex-col gap-8">
        <DashboardBreadcrumbs />
        {children}
      </div>
    </div>
  );
}
