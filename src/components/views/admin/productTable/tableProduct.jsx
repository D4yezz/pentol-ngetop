"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import supabase from "@/lib/db";
import { SlidersVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import EditProduct from "./editProduct";

export default function TableProduct({
  products,
  refresh,
  currentPage = 1,
  itemsPerPage = 5,
}) {
  const [openDialogId, setOpenDialogId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [edit, setEdit] = useState(null);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const deleteProduct = async (productId) => {
    try {
      setDeletingId(productId);

      await supabase
        .from("product_images")
        .delete()
        .eq("id_product", productId);

      const { data: files, error: listError } = await supabase.storage
        .from("pentol")
        .list(`products/${productId}/`);

      if (!listError && files?.length > 0) {
        for (const file of files) {
          await supabase.storage
            .from("pentol")
            .remove([`products/${productId}/${file.name}`]);
        }
      }

      const { error: productError } = await supabase
        .from("product")
        .delete()
        .eq("id", productId);

      if (productError) throw productError;

      toast.success("Produk berhasil dihapus!");
      refresh();
      setOpenDialogId(null);
    } catch (err) {
      console.error("Gagal menghapus produk :", err);
      toast.error("Terjadi kesalahan saat menghapus produk");
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <>
      <Table className={"rounded-2xl overflow-hidden shadow-lg mb-8"}>
        <TableHeader className={"gradiasi-btn-merah text-yellow-300"}>
          <TableRow className={"hover:bg-red-600 font-semibold"}>
            <TableHead className="px-4 font-semibold">No</TableHead>
            <TableHead className="px-4 font-semibold">Gambar</TableHead>
            <TableHead className="px-4 font-semibold">Nama Produk</TableHead>
            <TableHead className="px-4 font-semibold">Deskripsi</TableHead>
            <TableHead className="px-4 font-semibold">Varian Rasa</TableHead>
            <TableHead className="px-4 font-semibold">Harga</TableHead>
            <TableHead className="px-4 font-semibold">Stok</TableHead>
            <TableHead className="px-4 font-semibold text-center">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProducts.map((item, index) => (
            <TableRow
              key={item.id}
              className="h-fit w-full py-4 border-b border-gray-300"
            >
              <TableCell className="font-semibold px-4">
                {startIndex + index + 1}
              </TableCell>
              <TableCell className="p-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden shadow-md border-2 border-red-800">
                  <img
                    src={item.product_images[0].image_url}
                    alt={item.nama}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </TableCell>
              <TableCell className="px-4">
                <p className="text-balance">{item.nama}</p>
              </TableCell>
              <TableCell className="px-4 w-[400px]">
                <p className="text-balance line-clamp-2">
                  {item.deskripsi || "-"}
                </p>
              </TableCell>
              <TableCell className="px-4">
                <p className="w-fit h-fit gradiasi-btn-merah rounded-full px-4 py-1.5 text-yellow-300">
                  {item.varian}
                </p>
              </TableCell>
              <TableCell className="px-4">
                <p className="text-balance">
                  Rp.{" "}
                  {item.harga?.toLocaleString("id-ID", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 3,
                  })}
                </p>
              </TableCell>
              <TableCell className="px-4">
                <p className="text-balance">{item.stok}</p>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    className="bg-yellow-300 hover:bg-yellow-400 text-red-800 px-3 py-2 h-auto"
                    title="Edit"
                    onClick={() => setEdit(item)}
                  >
                    <SlidersVertical className="w-4 h-4" />
                  </Button>
                  <AlertDialog
                    open={openDialogId === item.id}
                    onOpenChange={(open) => {
                      if (!open && deletingId === item.id) return;
                      setOpenDialogId(open ? item.id : null);
                    }}
                  >
                    <AlertDialogTrigger className="bg-red-600 hover:bg-red-800 text-yellow-300 p-2.5 h-auto rounded-md flex items-center justify-center cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="font-inter">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Apakah anda ingin menghapus produk {item.nama}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini tidak dapat dibatalkan. Ini akan
                          menghapus produk dari data di server kami.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={deletingId === item.id}>
                          Batal
                        </AlertDialogCancel>
                        <button
                          className="bg-red-800 text-yellow-300 px-4 py-2 rounded-md cursor-pointer font-medium hover:bg-red-700"
                          onClick={() => deleteProduct(item.id)}
                          disabled={deletingId === item.id}
                        >
                          {deletingId === item.id
                            ? "Menghapus..."
                            : "Hapus produk"}
                        </button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditProduct
        open={edit}
        onOpenChange={setEdit}
        product={edit}
        onSuccess={() => refresh()}
      />
    </>
  );
}
