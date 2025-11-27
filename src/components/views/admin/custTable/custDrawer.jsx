"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "sonner";
import supabase from "@/lib/db";
import { useState } from "react";

export default function CustDrawer({ user, onClose, onUpdate }) {
  const [role, setRole] = useState(user.role || "user");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("profil_pengguna")
        .update({ role })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Data pengguna berhasil diperbarui ✅");
      onUpdate();
      onClose();
    } catch (err) {
      toast.error("Gagal memperbarui pengguna", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/40 z-40"
      />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed bottom-0 left-0 w-full lg:left-1/2 lg:-translate-x-1/2 bg-white rounded-t-2xl shadow-2xl z-50 p-6"
      >
        <div className="w-1/2 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-red-700">
              Edit Role {user.username}
            </h2>
            <Button
              size="icon"
              variant="ghost"
              className="text-red-800 hover:text-red-900"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="gap-2 flex flex-col">
              <Label>Kode ID</Label>
              <Input value={user.id} disabled className="bg-gray-100" />
            </div>
            <div className="gap-2 flex flex-col">
              <Label>Nama Akun</Label>
              <Input value={user.username} disabled className="bg-gray-100" />
            </div>

            <div className="gap-2 flex flex-col">
              <Label>Email</Label>
              <Input
                value={user.email || "-"}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div className="gap-2 flex flex-col">
              <Label>Nomor HP</Label>
              <Input
                value={user.handphone || "-"}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div>
              <Label>Role</Label>
              <div className="flex gap-3 mt-2">
                {["user", "admin"].map((r) => (
                  <Badge
                    key={r}
                    className={`cursor-pointer px-4 py-1 text-sm ${
                      role === r
                        ? r === "admin"
                          ? "bg-green-600 text-white"
                          : "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setRole(r)}
                  >
                    {r}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button
                className="w-full bg-red-700 hover:bg-red-800 text-yellow-300"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
