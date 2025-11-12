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
import TableProduct from "@/components/views/admin/productTable/tableProduct";
import { CirclePlus } from "lucide-react";
import TableImages from "@/components/views/admin/productTable/tableImages";

export default function ImagesPage() {
  return (
    <>
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
                <BreadcrumbLink href="/admin/products">Produk</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Images</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <HeaderDashboard
        title={"Kelola Gambar Produk"}
        desc={"Tambah atau edit gambar produk dengan mudah"}
        action={
          <button className="gradiasi-btn-merah rounded-full flex items-center gap-2 py-2 px-4 text-white cursor-pointer hover:text-yellow-300 duration-200 ease-in-out">
            <CirclePlus size={20} />
            Tambah Gambar
          </button>
        }
      />
      <div className="flex flex-col px-8 mt-8 mb-20 gap-4">
        <TableImages />
      </div>
    </>
  );
}
