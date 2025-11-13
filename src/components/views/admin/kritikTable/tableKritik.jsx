"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import DialogKritik from "./dialogKritik";

export default function TableKritik() {
  const [pesan, setPesan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPesan = async () => {
    try {
      const { data, error } = await supabase.from("kritik_saran").select("*");
      if (error) {
        setError(error.message);
      } else {
        setPesan(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPesan();
  }, []);

  if (isLoading) {
    return <Skeleton className="h-[250px] w-full rounded-xl" />;
  }

  return (
    <>
      <Table className={"rounded-2xl overflow-hidden shadow-lg mb-8"}>
        <TableHeader className={"gradiasi-btn-merah text-yellow-300"}>
          <TableRow className="hover:bg-red-700 font-semibold">
            <TableHead className={"text-center px-2"}>No</TableHead>
            <TableHead className={"px-2"}>Nama</TableHead>
            <TableHead className={"px-2"}>Pesan</TableHead>
            <TableHead className={"px-2"}>Waktu Dikirim</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pesan.map((item, index) => (
            <TableRow
              key={index}
              className="h-fit w-full py-4 border-b border-gray-300"
            >
              <TableCell className="font-semibold px-2 text-center border-r">
                {index + 1}
              </TableCell>
              <TableCell className="px-2">
                <p className="text-balance">{item.nama}</p>
              </TableCell>
              <TableCell className="px-2">
                <p className="text-balance line-clamp-2">{item.pesan}</p>
              </TableCell>
              <TableCell className="px-2">
                {new Date(item.created_at).toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <div className="flex gap-2 justify-center">
                  <Dialog>
                    <DialogTrigger className="bg-yellow-300 hover:bg-yellow-400 text-red-800 p-2 h-auto rounded-lg">
                      <Eye size={16} />
                    </DialogTrigger>
                    <DialogKritik pesan={item} />
                  </Dialog>
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
