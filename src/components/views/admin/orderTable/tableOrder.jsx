import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import supabase from "@/lib/db";
import { motion, AnimatePresence, easeIn } from "framer-motion";
import { Eye, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TableOrder() {
  const [order, setOrder] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const getOrder = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("id,user_id (id,username),created_at,status,payment_method");
      if (error) {
        setError(error.message);
      } else {
        setOrder(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const getOrderDetail = async (orderId) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
            id,
            user_id (id, username, handphone),
            created_at,
            status,
            payment_method,
            note,
            address,
            total_price,
            order_items (
              id,
              product_id (id, nama, harga, product_images(image_url)),
              quantity,
              price
            )
          `
        )
        .eq("id", orderId)
        .single();

      if (error) throw error;

      setSelectedOrder(data);
      setOrderItems(data.order_items || []);
      setShowDetail(true);
    } catch (err) {
      console.error("Error get order detail:", err);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", selectedOrder.id);

      if (error) throw error;

      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      getOrder();
      toast.success("Status pesanan berhasil diperbarui!");
    } catch (err) {
      console.error("Gagal update status:", err);
      toast.error("Terjadi kesalahan saat update status");
    }
  };

  const status = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className={"bg-yellow-300 text-black"}>
            Menunggu Konfirmasi
          </Badge>
        );
      case "proses":
        return (
          <Badge className={"bg-blue-500 text-blue-100"}>
            Sedang di Siapkan
          </Badge>
        );
      case "ready":
        return (
          <Badge className={"bg-green-500 text-white "}>Pentol Siap</Badge>
        );
      case "done":
        return <Badge className={"bg-gray-300 text-gray-700"}>Selesai</Badge>;
      case "cancel":
        return <Badge className={"bg-red-800 text-red-200"}>Dibatalkan</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (isLoading) {
    return <Skeleton className="h-[280px] w-full rounded-xl" />;
  }

  return (
    <>
      <Table className={"rounded-2xl overflow-hidden shadow-lg"}>
        <TableCaption className={"mt-8"}>
          Semua order sudah ditampilkan
        </TableCaption>
        <TableHeader className={"gradiasi-btn-merah text-yellow-300"}>
          <TableRow className={"hover:bg-red-600 font-semibold"}>
            <TableHead className="px-4 font-semibold">No</TableHead>
            <TableHead className="px-4 font-semibold">Kode Order</TableHead>
            <TableHead className="px-4 font-semibold">Nama Pelanggan</TableHead>
            <TableHead className="px-4 font-semibold">Tanggal Order</TableHead>
            <TableHead className="px-4 font-semibold">Status</TableHead>
            <TableHead className="px-4 font-semibold">Jenis Order</TableHead>
            <TableHead className="px-4 font-semibold text-center">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.map((item, index) => (
            <TableRow
              key={index}
              className="h-fit w-full py-4 border-b border-gray-300"
            >
              <TableCell className="font-semibold px-4">{index + 1}</TableCell>
              <TableCell className="font-semibold px-4">
                OID-00{item.id}
              </TableCell>
              <TableCell className="px-4">
                <p className="text-balance">{item.user_id.username}</p>
              </TableCell>
              <TableCell className="px-4 w-[200px]">
                {new Date(item.created_at).toLocaleString("id-ID", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell className="px-4">{status(item.status)}</TableCell>
              <TableCell className="px-4">
                <p className="text-balance">
                  {item.payment_method === "wallet"
                    ? "E-Wallet / Transfer"
                    : "Ambil di Toko"}
                </p>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    className="bg-yellow-300 hover:bg-yellow-400 text-red-800 px-3 py-2 h-auto"
                    title="Edit"
                    onClick={() => getOrderDetail(item.id)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="px-3 py-2 h-auto"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AnimatePresence>
        {showDetail && selectedOrder && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-0 right-0 z-10 flex flex-col bg-white overflow-y-auto w-full h-dvh"
          >
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-yellow-300 z-20">
              <h1 className="text-3xl font-bold gradiasi-btn-merah text-transparent bg-clip-text font-quicksand">
                Detail Pesanan OID-00{selectedOrder.id}
              </h1>
              <button
                onClick={() => {
                  setShowDetail(false);
                  setSelectedOrder(null);
                }}
                className="text-gray-600 hover:text-red-800 transition cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex gap-2 w-full font-inter">
              <div className="p-8 flex flex-col gap-4 w-2/3">
                <h2 className="text-2xl font-semibold">Informasi Pelanggan</h2>
                <Table>
                  <TableBody className={"text-lg font-medium"}>
                    <TableRow>
                      <TableCell>Nama :</TableCell>
                      <TableCell>{selectedOrder.user_id.username}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Nomor HP :</TableCell>
                      <TableCell>{selectedOrder.user_id.handphone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Metode Pembayaran :</TableCell>
                      <TableCell>
                        {selectedOrder.payment_method === "wallet"
                          ? "E-Wallet / Transfer"
                          : "Ambil di Toko"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Status :</TableCell>
                      <TableCell>{status(selectedOrder.status)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col gap-2 w-1/3">
                <div className="p-8 flex flex-col gap-4 border-t">
                  <h2 className="text-2xl font-semibold">Produk Dipesan</h2>
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border p-4 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product_id.product_images?.[0]?.image_url}
                          alt={item.product_id.nama}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-semibold">
                            {item.product_id.nama}
                          </p>
                          <p>Jumlah : {item.quantity} porsi</p>
                        </div>
                      </div>
                      <p className="font-semibold text-red-800">
                        Rp{" "}
                        {(item.price * item.quantity).toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))}

                  <div className="flex justify-between items-center px-4 py-2 font-semibold text-xl gradiasi-btn-merah text-yellow-300 rounded-lg">
                    <p>Total Harga :</p>
                    <p>
                      Rp {selectedOrder.total_price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                <div className="p-8 flex flex-col gap-4">
                  <h2 className="text-2xl font-semibold">
                    Ubah Status Pesanan
                  </h2>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => updateStatus("proses")}
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Proses
                    </Button>
                    <Button
                      onClick={() => updateStatus("ready")}
                      className="bg-green-500 text-white hover:bg-green-600"
                    >
                      Siap Diambil
                    </Button>
                    <Button
                      onClick={() => updateStatus("done")}
                      className="bg-gray-500 text-white hover:bg-gray-600"
                    >
                      Selesai
                    </Button>
                    <Button
                      onClick={() => updateStatus("cancel")}
                      className="bg-red-700 text-white hover:bg-red-800"
                    >
                      Batalkan
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
