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
import { ArrowLeft, ArrowRight, CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import ProductForm from "@/components/views/admin/productTable/productForm";
import supabase from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  const [openForm, setOpenForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
              <>
                <TableProduct
                  products={products}
                  refresh={getProduct}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                />
                {products.length > 0 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="flex gap-2 items-center px-4 py-2 rounded-md border border-gray-300 text-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                      <ArrowLeft size={18} /> Sebelumnya
                    </button>
                    <div className="flex gap-1">
                      {Array.from(
                        { length: Math.ceil(products.length / itemsPerPage) },
                        (_, i) => i + 1
                      ).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-md font-medium cursor-pointer ${
                            currentPage === page
                              ? "gradiasi-btn-merah text-yellow-300"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        setCurrentPage(
                          Math.min(
                            Math.ceil(products.length / itemsPerPage),
                            currentPage + 1
                          )
                        )
                      }
                      disabled={
                        currentPage ===
                        Math.ceil(products.length / itemsPerPage)
                      }
                      className="flex gap-2 items-center px-4 py-2 rounded-md border border-gray-300 text-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                      Berikutnya <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        <ProductForm
          open={openForm}
          onOpenChange={setOpenForm}
          onSuccess={() => {
            getProduct();
            setOpenForm(false);
            setCurrentPage(1);
          }}
        />
      </div>
    </>
  );
}
