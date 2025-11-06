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
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function TableOrder() {
  const [order, setOrder] = useState([]);
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
    </>
  );
}
