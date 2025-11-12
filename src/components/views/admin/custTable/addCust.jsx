"use client";

import { useState } from "react";
import { toast } from "sonner";
import supabase from "@/lib/db";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddCust({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    try {
      setLoading(true);
      // 1️⃣ Buat user di Authentication via API
      const res = await fetch("/api/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal membuat user.");

      // 2️⃣ Masukkan ke tabel profil_pengguna
      const { data, error } = await supabase.from("profil_pengguna").insert([
        {
          username: formData.name,
          auth_id: result.user.id,
          role: "customer", // default role
        },
      ]);

      if (error) throw error;

      toast.success("Berhasil menambahkan pengguna baru ✅");
      onSuccess?.(); // refresh table user di parent
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      toast.error("Gagal menambahkan pengguna", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger className="gradiasi-btn-merah rounded-full flex items-center gap-2 py-2 px-4 text-white cursor-pointer hover:text-yellow-300 duration-200 ease-in-out">
        <CirclePlus size={20} />
        Tambah Pengguna
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Tambah Pengguna Baru</DrawerTitle>
          <DrawerDescription>Menambahkan akun pelanggan baru</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 px-6 py-4">
          <div>
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              name="name"
              placeholder="Masukkan nama pengguna"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Masukkan email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <DrawerFooter>
          <Button
            className="gradiasi-btn-merah text-white hover:text-yellow-300"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Menambahkan..." : "Tambah"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Batal</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
