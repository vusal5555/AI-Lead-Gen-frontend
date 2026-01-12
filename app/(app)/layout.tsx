import DashboardLayout from "@/components/layout/DashboardLayout";
import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <div className="flex min-h-screen">
          <Sidebar></Sidebar>
          <main className="flex-1 w-full overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <DashboardLayout>{children}</DashboardLayout>
          </main>
        </div>
      </div>
    </div>
  );
}
