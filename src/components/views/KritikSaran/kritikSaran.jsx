"use client";

import { useState } from "react";
import supabase from "@/lib/db";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Send } from "lucide-react";

export default function KritikSaranView() {
  const [form, setForm] = useState({ nama: "", pesan: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.pesan) {
      toast.error("Nama dan pesan wajib diisi");
      return;
    }
    try {
      setLoading(true);
      const { error } = await supabase
        .from("kritik_saran")
        .insert([{ nama: form.nama, pesan: form.pesan }]);
      if (error) throw error;
      toast.success("Terima kasih atas kritik & sarannya!");
      setForm({ nama: "", pesan: "" });
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengirim pesan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 h-dvh flex items-center justify-center font-inter">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white rounded-lg shadow-md overflow-hidden h-[60dvh]">
        <div className="w-full p-8 h-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between h-full"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold gradiasi-btn-merah text-transparent bg-clip-text">
                  Kritik & Saran
                </h2>
                <p className="text-muted-foreground">
                  Berikan masukan untuk membantu kami memperbaiki layanan.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama">Nama</Label>
                <Input
                  id="nama"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Nama Anda"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pesan">Pesan</Label>
                <Textarea
                  id="pesan"
                  name="pesan"
                  value={form.pesan}
                  onChange={handleChange}
                  placeholder="Tulis kritik atau saran Anda..."
                  className={"max-h-40"}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 mt-4 w-full">
              <Button
                type="submit"
                className="gradiasi-btn-merah text-white"
                disabled={loading}
              >
                {loading ? (
                  "Mengirim..."
                ) : (
                  <>
                    <Send size={20} />
                    <p>Kirim Pesan</p>
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setForm({ nama: "", pesan: "" })}
              >
                Bersihkan
              </Button>
            </div>
          </form>
        </div>

        <div className="relative h-full w-full">
          <Image
            src="/gabungan/6.jpeg"
            alt="Decor"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
