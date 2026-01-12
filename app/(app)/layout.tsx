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
          <main className="flex-1 w-full overflow-y-auto bg-background">
            <DashboardLayout>{children}</DashboardLayout>
          </main>
        </div>
      </div>
    </div>
  );
}
