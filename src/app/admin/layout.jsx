"use client";

import { AppSidebar } from "@/components/views/admin/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider className="font-instrument">
      <AppSidebar />
      <SidebarInset className="flex flex-col w-full">{children}</SidebarInset>
    </SidebarProvider>
  );
}
