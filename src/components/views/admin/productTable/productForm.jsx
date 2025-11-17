"use client";

import { useState } from "react";
import { toast } from "sonner";
import supabase from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, PlusCircle, X } from "lucide-react";

export default function ProductForm({ open, onOpenChange, onSuccess }) {
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    harga: "",
    varian: "",
    stok: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (index, file) => {
    const next = [...images];
    next[index] = file;
    setImages(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.harga || !form.varian) {
      toast.error("Nama produk, varian dan harga produk wajib diisi");
      return;
    }
    if (!images) {
      toast.error("Tolong upload 4 foto produk");
      return;
    }
    if (images.length <= 3) {
      toast.error("Harap upload 4 foto produk");
      return;
    }

    try {
      setLoading(true);

      const { data: prodData, error: prodError } = await supabase
        .from("product")
        .insert([
          {
            nama: form.nama,
            deskripsi: form.deskripsi,
            varian: form.varian || null,
            harga: parseFloat(form.harga) || 0,
            stok: parseInt(form.stok || 0, 10),
          },
        ])
        .select()
        .single();

      if (prodError) throw prodError;
      const productId = prodData.id;

      const uploadedRows = [];

      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        if (!file) continue;

        const timestamp = Date.now();
        const path = `products/${productId}/${timestamp}_${i}_${file.name}`;

        const { error: upErr } = await supabase.storage
          .from("pentol")
          .upload(path, file);

        if (upErr) {
          console.warn("Upload error for", file.name, upErr.message);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("pentol")
          .getPublicUrl(path);
        const publicUrl = urlData.publicUrl;

        const { error: imgErr } = await supabase
          .from("product_images")
          .insert([{ id_product: productId, image_url: publicUrl }]);
        if (imgErr) console.warn("Insert image row failed", imgErr.message);
        else uploadedRows.push(publicUrl);
      }

      toast.success("Produk berhasil ditambahkan");
      onSuccess?.();
      onOpenChange?.(false);
      setForm({ name: "", description: "", price: "" });
      setImages([]);
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan produk", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-0 right-0 z-10 flex flex-col bg-white overflow-y-auto w-full h-dvh"
        >
          <form action="">
            <div className="flex justify-between border-b p-4 border-red-800">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold gradiasi-btn-merah text-transparent bg-clip-text">
                  Tambah Produk
                </h1>
                <p>Isi detail produk dan upload 4 foto produk.</p>
              </div>
              <Button
                type="button"
                size={"icon"}
                onClick={() => onOpenChange(false)}
                className={"bg-red-800 text-yellow-300 hover:bg-red-600"}
              >
                <X />
              </Button>
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-4 w-[60%] p-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nama">Nama Produk</Label>
                  <Input
                    id="nama"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Nama produk"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="deskripsi">Deskripsi</Label>
                  <Textarea
                    id="deskripsi"
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    placeholder="Deskripsi singkat"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="varian">Varian</Label>
                  <Input
                    id="varian"
                    name="varian"
                    value={form.varian}
                    onChange={handleChange}
                    placeholder="Contoh: Pedas, Manis"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="harga">Harga</Label>
                  <Input
                    id="harga"
                    name="harga"
                    value={form.harga}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="stok">Stok</Label>
                  <Input
                    id="stok"
                    name="stok"
                    value={form.stok}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="w-[40%] p-6 flex flex-col gap-4">
                <Label>Foto Produk (maks 4)</Label>
                <div className="flex flex-col gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple={true}
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      if (files.length > 4) {
                        e.target.value = null;
                        setImages([]);
                        toast.error("Maksimal 4 gambar saja");
                        return;
                      } else {
                        setImages(files);
                      }
                    }}
                  />
                  {images && (
                    <div className="flex flex-col gap-1">
                      {images.map((img, idx) => (
                        <span
                          key={idx}
                          className="text-sm text-muted-foreground"
                        >
                          {idx !== images.length - 1
                            ? `${img.name},`
                            : img.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 flex justify-end gap-4 pb-6 pt-12">
              <Button
                className="gradiasi-btn-merah text-white hover:text-yellow-300"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <PlusCircle size={18} />
                )}
                {loading ? "Menyimpan..." : "Tambah Produk"}
              </Button>
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                variant="outline"
              >
                Batal
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
