import { SiteHeader } from "@/components/SiteHeader";
import { SidebarProvider } from "@/components/sidebar/SidebarContext";
import { AppSidebar } from "@/components/sidebar/AppSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SiteHeader />
      <div className="flex flex-1 min-h-0">
        <AppSidebar />
        <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
