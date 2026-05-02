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
import { CirclePlus, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function AddCust({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      const res = await fetch("/api/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal membuat user.");

      const { data, error } = await supabase.from("profil_pengguna").insert([
        {
          username: formData.name,
          id: result.user.id,
          role: "user",
        },
      ]);

      if (error) throw error;

      toast.success("Berhasil menambahkan pengguna baru ✅");
      onSuccess?.();
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
          <DrawerDescription>Menambahkan akun pengguna baru</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 px-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              name="name"
              placeholder="Masukkan nama pengguna"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
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
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <InputGroup>
              <InputGroupInput
                placeholder="*****"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <InputGroupAddon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Eye size={20} className="cursor-pointer" />
                ) : (
                  <EyeOff size={20} className="cursor-pointer" />
                )}
              </InputGroupAddon>
            </InputGroup>
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
