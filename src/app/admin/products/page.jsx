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
import TableProduct from "@/components/views/admin/productTable/tableProduct";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import ProductForm from "@/components/views/admin/productTable/productForm";
import supabase from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  const [openForm, setOpenForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("product")
        .select(
          "id, nama, deskripsi, varian, harga, stok, product_images (id_product, image_url)"
        );
      if (error) {
        setError(error.message);
      } else {
        setProducts(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
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
                <BreadcrumbPage>Produk</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <HeaderDashboard
        title={"Kelola Produk"}
        desc={"Tambah atau edit produk dari Pentol Ngetop dengan praktis"}
        action={
          <button
            onClick={() => setOpenForm(true)}
            className="gradiasi-btn-merah rounded-full flex items-center gap-2 py-2 px-4 text-white cursor-pointer hover:text-yellow-300 duration-200 ease-in-out"
          >
            <CirclePlus size={20} />
            Tambah Produk
          </button>
        }
      />
      <div className="flex flex-col px-8 mt-8 mb-20 gap-4">
        {openForm ? null : (
          <>
            {isLoading ? (
              <Skeleton className="w-full h-64 rounded-lg" />
            ) : (
              <TableProduct products={products} refresh={getProduct} />
            )}
          </>
        )}

        <ProductForm
          open={openForm}
          onOpenChange={setOpenForm}
          onSuccess={() => {
            getProduct();
            setOpenForm(false);
          }}
        />
      </div>
    </>
  );
}
