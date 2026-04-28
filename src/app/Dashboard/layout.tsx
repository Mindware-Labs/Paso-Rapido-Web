import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
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
        <div className="flex flex-1 flex-col min-w-0 overflow-y-auto">
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </div>
    </SidebarProvider>
  );
}
