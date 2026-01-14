import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { RoleGuard } from "@/components/auth/RoleGuard";

export const iframeHeight = "800px";

export const description = "Sidebar layout for dashboard pages";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard>
      <div className="min-h-screen bg-background">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="bg-background">
            <main className="flex-1">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </RoleGuard>
  );
}
