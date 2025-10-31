"use client";
import { AppSidebar } from "@/components/views/admin/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import HeaderDashboard from "@/components/layout/adminComponents/headerAdmin";
import TableOrder from "@/components/views/admin/orderTable/tableOrder";

export default function OrderPage() {
  return (
    <SidebarProvider className={"font-instrument"}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Produk</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <HeaderDashboard
          title={"Kelola Pesanan"}
          desc={"Pantau pesanan dari pelanggan dengan praktis"}
        />
        <div className="flex flex-col px-8 mt-8 mb-20 gap-4">
          <TableOrder />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
