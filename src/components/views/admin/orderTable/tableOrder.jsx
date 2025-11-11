import IframeMaps from "@/components/mapLocation/IFrameMaps";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/lib/db";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  HandPlatter,
  SendHorizonal,
  SlidersHorizontal,
  Soup,
  Trash2,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TableOrder() {
  const [order, setOrder] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const getTotalOrders = async () => {
    const { count, error } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });
    if (error) {
      console.log("Error fetching total orders:", error);
    } else {
      setTotal(count || 0);
    }
  };
  const getOrder = async (currentPage = 1) => {
    const from = (currentPage - 1) * 10;
    const to = from + 10 - 1;
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("id,user_id (id,username),created_at,status,payment_method")
        .order("created_at", { ascending: false })
        .range(from, to);
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
    getOrder(page);
    getTotalOrders();
  }, [page]);

  const totalPages = Math.ceil(total / 10);

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

  const deleteOrder = async (orderId) => {
    try {
      const { error: itemError } = await supabase
        .from("order_items")
        .delete()
        .eq("order_id", orderId);
      if (itemError) throw error;
      const { error: orderError } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);
      if (orderError) throw error;
      getOrder();
      toast.success("Pesanan berhasil dihapus!");
    } catch (err) {
      console.error("Gagal menghapus pesanan:", err);
      toast.error("Terjadi kesalahan saat menghapus pesanan");
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

  const handleAdminMessage = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("orders")
        .update({ admin_message: message })
        .eq("id", selectedOrder.id);

      if (error) throw error;

      toast.success("Pesan berhasil dikirim ke pelanggan!");
      setMessage("");
      setShowDetail(false);
    } catch (err) {
      console.error("Pesan gagal terkirim:", err);
      toast.error("Terjadi kesalahan saat mengirim pesan");
    }
  };

  if (isLoading) {
    return <Skeleton className="h-[280px] w-full rounded-xl" />;
  }

  return (
    <>
      <Table
        className={`rounded-2xl overflow-hidden shadow-lg mb-8 ${
          showDetail ? "hidden" : ""
        }`}
      >
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
                    title="Manage"
                    onClick={() => getOrderDetail(item.id)}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger className="bg-red-600 hover:bg-red-800 text-yellow-300 p-2.5 h-auto rounded-md flex items-center justify-center cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </AlertDialogTrigger>
                    <AlertDialogContent className={"font-inter"}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Apakah anda ingin menghapus pesanan OID-00{item.id}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini tidak dapat dibatalkan. Ini akan
                          menghapus pesanan dari pelanggan secara permanen dan
                          menghapus data dari server kami.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          className={"bg-red-800 text-yellow-300"}
                          onClick={() => deleteOrder(item.id)}
                        >
                          Hapus Pesanan
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="bg-gray-50 px-6 py-4 mt-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Menampilkan <span className="font-semibold">{order.length}</span> dari{" "}
          <span className="font-semibold">{total}</span> pesanan
        </p>
        <div className="flex items-center gap-4 gradiasi-btn-merah p-1.5 rounded-full">
          <Button
            size="icon"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="bg-yellow-300 text-red-800 rounded-full duration-200 ease-in-out hover:bg-yellow-400 hover:text-red-900"
          >
            <ChevronLeft />
          </Button>
          <span className="text-yellow-300 font-semibold">
            Halaman <b>{page}</b> dari <b>{totalPages || 1}</b>
          </span>
          <Button
            size="icon"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="bg-yellow-300 text-red-800 rounded-full duration-200 ease-in-out hover:bg-yellow-400 hover:text-red-900"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      {/* Detail Order */}
      <AnimatePresence>
        {showDetail && selectedOrder && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-0 right-0 z-10 flex flex-col bg-white overflow-y-auto w-full h-fit"
          >
            <div className="flex items-center justify-between lg:py-6 lg:pl-6 lg:pr-12 py-4 px-3 sticky top-0 bg-white border-b z-20">
              <h1 className="text-3xl font-bold lg:bg-yellow-300 lg:text-red-800 lg:px-6 lg:py-2 text-red-800 rounded-full font-quicksand">
                DETAIL PESANAN OID-00{selectedOrder.id}
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

            <div className="flex lg:flex-row flex-col gap-2 w-full font-inter">
              <div className="flex flex-col justify-between lg:w-2/3 w-full">
                <div className="p-8 flex flex-col gap-4">
                  <h2 className="text-2xl font-bold">Informasi Pelanggan</h2>
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
                  <div className="flex items-center gap-2 p-4 rounded-xl border shadow-md">
                    <h4 className="font-semibold text-[1rem] text-red-800">
                      Catatan Customer :
                    </h4>
                    <p
                      className={`${
                        selectedOrder.note ? "text-black" : "text-gray-400"
                      }`}
                    >
                      {selectedOrder.note || "tidak ada catatan dari customer"}
                    </p>
                  </div>

                  {selectedOrder.address && (
                    <div className="flex flex-col gap-2 border-t pt-4 mx-2">
                      <h3 className="text-xl font-semibold">
                        Lokasi Pengiriman
                      </h3>
                      <div className="text-gray-700">
                        {selectedOrder.address.address}
                      </div>
                      <div className="w-full h-74 rounded-xl overflow-hidden shadow-lg">
                        <IframeMaps
                          customLat={selectedOrder.address.lat}
                          customLng={selectedOrder.address.lng}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <form
                  onSubmit={handleAdminMessage}
                  className="grid w-full gap-3 px-8 mb-8"
                >
                  <Label
                    htmlFor="message"
                    className={
                      "text-xl gradiasi-btn-merah text-transparent bg-clip-text font-semibold"
                    }
                  >
                    Pesan Admin
                  </Label>
                  <Textarea
                    name="message"
                    onChange={(e) => setMessage(e.target.value)}
                    className={"h-30 max-h-42 overflow-y-auto"}
                    placeholder="kirim pesan ke pelanggan..."
                    id="message"
                  />
                  <Button
                    disabled={!message.trim()}
                    type="submit"
                    className="w-fit gradiasi-btn-merah text-yellow-300 px-6 py-2 rounded-md mx-auto"
                  >
                    Kirim Pesan <SendHorizonal size={18} />
                  </Button>
                </form>
              </div>

              <div className="flex flex-col gap-2 lg:w-1/3 w-full">
                <div className="p-8 flex flex-col gap-4">
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
                  <div className="flex flex-col gap-4 w-full pr-4">
                    <div className="flex items-center gap-4 w-full">
                      <Button
                        disabled={selectedOrder.status === "proses"}
                        onClick={() => updateStatus("proses")}
                        className="w-1/2 bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white border-blue-500 border-2 hover:border-transparent"
                      >
                        <HandPlatter size={18} />
                        Proses
                      </Button>
                      <Button
                        disabled={selectedOrder.status === "ready"}
                        onClick={() => updateStatus("ready")}
                        className="w-1/2 bg-transparent text-green-500 hover:bg-green-500 hover:text-white border-green-500 border-2 hover:border-transparent"
                      >
                        <Soup size={18} />
                        Siap Diambil
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        disabled={selectedOrder.status === "done"}
                        onClick={() => updateStatus("done")}
                        className="w-1/2 bg-transparent text-gray-700 hover:bg-gray-700 hover:text-white border-gray-700 border-2 hover:border-transparent"
                      >
                        <CircleCheckBig size={18} />
                        Selesai
                      </Button>
                      <Button
                        disabled={selectedOrder.status === "cancel"}
                        onClick={() => updateStatus("cancel")}
                        className="w-1/2 bg-transparent text-red-800 hover:bg-red-800 hover:text-white border-red-800 border-2 hover:border-transparent"
                      >
                        <FontAwesomeIcon icon={faBan} className="text-lg" />
                        Batalkan
                      </Button>
                    </div>
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
