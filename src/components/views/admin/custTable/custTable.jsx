"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import supabase from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import CustDrawer from "./custDrawer";

export default function CustTable({ allUser, loading, onSucces }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenDrawer(true);
  };
  const deleteAkun = async (id) => {
    try {
      const { error: delProfileErr } = await supabase
        .from("profil_pengguna")
        .delete()
        .eq("id", id);
      if (delProfileErr) throw delProfileErr;

      const res = await fetch("/api/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Gagal menghapus dari auth.users");

      toast.success("Akun berhasil dihapus 🚮");
      onSucces();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus akun", { description: err.message });
    }
  };

  if (loading) {
    return <Skeleton className="h-[300px] w-full rounded-xl" />;
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
        <Table>
          <TableHeader className={"gradiasi-btn-merah text-yellow-300"}>
            <TableRow className="hover:bg-red-700 font-semibold">
              <TableHead className={"text-center px-2"}>No</TableHead>
              <TableHead className={"px-2 text-center"}>Akun</TableHead>
              <TableHead className={"px-2"}>Nomor HP</TableHead>
              <TableHead className={"px-2"}>Role</TableHead>
              <TableHead className={"px-2"}>Dibuat Pada</TableHead>
              <TableHead className={"px-2"}>Terakhir Login</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allUser.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 text-gray-500"
                >
                  Tidak ada pengguna.
                </TableCell>
              </TableRow>
            ) : (
              allUser.map((item, index) => (
                <TableRow key={item.id} className="hover:bg-gray-50 transition">
                  <TableCell className={"text-center border-r font-semibold"}>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3 items-center py-2 px-2">
                      <Avatar className="w-12 h-12 border border-yellow-300">
                        <AvatarImage src={item.picture} />
                        <AvatarFallback
                          className={
                            "gradiasi-btn-merah text-yellow-300 text-lg font-semibold"
                          }
                        >
                          {item.username?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold font-instrument text-[1rem]">
                          {item.username}
                        </p>
                        <p className="text-sm text-gray-500">{item.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.handphone || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      className={`text-sm ${
                        item.role === "admin"
                          ? "bg-green-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {item.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString("in-ID", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {item.last_sign_in_at
                      ? new Date(item.last_sign_in_at).toLocaleDateString(
                          "in-ID",
                          {
                            year: "numeric",
                            month: "short",
                            weekday: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        className="bg-yellow-300 hover:bg-yellow-400 text-red-800"
                        title="Edit Pengguna"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-yellow-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Hapus akun {item.username}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Tindakan ini tidak bisa dibatalkan dan akan
                              menghapus akun dari database & auth Supabase.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-700 text-yellow-300"
                              onClick={() => deleteAkun(item.id)}
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <AnimatePresence>
        {openDrawer && selectedUser && (
          <CustDrawer
            user={selectedUser}
            onClose={() => setOpenDrawer(false)}
            onUpdate={onSucces}
          />
        )}
      </AnimatePresence>
    </>
  );
}
