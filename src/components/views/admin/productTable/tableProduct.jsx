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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EditProduct from "./editProduct";
import { getProfileUser } from "@/service/auth.service";
import { useRouter } from "next/navigation";

export default function TableProduct({
  products,
  refresh,
  currentPage = 1,
  itemsPerPage = 5,
}) {
  const ALLOW_ACC = "9c7bc38f-d880-4aab-8424-4ce0fb93a0f7";
  const NOT_ALLOWED_PRODUCT = [1, 2, 26];
  const [openDialogId, setOpenDialogId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [edit, setEdit] = useState(null);
  const [userLog, setUserLog] = useState(null);
  const [loading, setLoading] = useState(false);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const router = useRouter();

  const getUserLog = async () => {
    try {
      const user = await getProfileUser();
      if (user.status && user.data) {
        setUserLog(user.data.profile.id);
      }
    } catch (error) {
      toast.error("error fetch userLog");
      console.error("Error checking user login:", error);
    }
  };

  useEffect(() => {
    const checkLog = async () => {
      await getUserLog();
    };

    checkLog();
  }, []);

  const handleEdit = (item) => {
    if (NOT_ALLOWED_PRODUCT.includes(item.id) && userLog !== ALLOW_ACC) {
      toast.error("Anda tidak punya akses edit produk ini");
      return;
    }

    setEdit(item);
  };

  const deleteProduct = async (productId) => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (err) {
      console.error("Gagal menghapus produk :", err);
      toast.error("Terjadi kesalahan saat menghapus produk");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDelete = (item) => {
    if (NOT_ALLOWED_PRODUCT.includes(item) && userLog !== ALLOW_ACC) {
      toast.error("Anda tidak punya akses menghapus produk ini");
      return;
    }

    deleteProduct(item);
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
              className="w-full py-4 border-b border-gray-300 h-fit"
            >
              <TableCell className="px-4 font-semibold">
                {startIndex + index + 1}
              </TableCell>
              <TableCell className="p-4">
                <div className="w-24 h-24 overflow-hidden border-2 border-red-800 rounded-lg shadow-md">
                  <img
                    src={item.product_images[0].image_url}
                    alt={item.nama}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
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
                <div className="flex justify-center gap-2">
                  <Button
                    size="sm"
                    className="h-auto px-3 py-2 text-red-800 bg-yellow-300 hover:bg-yellow-400"
                    title="Edit"
                    onClick={() => handleEdit(item)}
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
                          className="px-4 py-2 font-medium text-yellow-300 bg-red-800 rounded-md cursor-pointer hover:bg-red-700"
                          onClick={() => handleDelete(item.id)}
                          disabled={loading}
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
