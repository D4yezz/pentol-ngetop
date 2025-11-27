"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import HeaderDashboard from "@/components/layout/adminComponents/headerAdmin";
import CustTable from "@/components/views/admin/custTable/custTable";
import AddCust from "@/components/views/admin/custTable/addCust";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CustomerPage() {
  const [allUser, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getAllUser = async () => {
    try {
      const res = await fetch("/api/all-users");
      if (!res.ok) throw new Error("Gagal memuat data pengguna dari server");

      const result = await res.json();
      setAllUser(result.users);
    } catch (error) {
      toast.error("Gagal memuat data pengguna", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);
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
                <BreadcrumbPage>Pelanggan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <HeaderDashboard
        title={"Kelola Pelanggan"}
        desc={"Atur data pelanggan pentol ngetop dengan mudah"}
        action={<AddCust onSuccess={getAllUser} />}
      />
      <div className="flex flex-col px-8 mt-8 mb-20 gap-4">
        <CustTable
          allUser={allUser}
          loading={isLoading}
          onSucces={getAllUser}
        />
      </div>
    </>
  );
}
