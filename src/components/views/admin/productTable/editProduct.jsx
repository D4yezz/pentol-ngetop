import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import updateProductImages from "@/hooks/updateProductImages";
import supabase from "@/lib/db";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, PlusCircle, Save, SquarePen, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditProduct({
  open,
  onOpenChange,
  product,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    varian: "",
    harga: "",
    stok: "",
  });
  const getOldImages = async () => {
    const { data } = await supabase
      .from("product_images")
      .select("*")
      .eq("id_product", product.id)
      .order("id");

    if (!data) return;

    setOldImages(data);

    setImages([null, null, null, null]);
  };

  useEffect(() => {
    if (open && product) {
      setFormData({
        nama: product.nama || "",
        deskripsi: product.deskripsi || "",
        varian: product.varian || "",
        harga: product.harga || "",
        stok: product.stok || "",
      });
      getOldImages();
    }
  }, [open, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("product")
        .update({
          nama: formData.nama,
          deskripsi: formData.deskripsi,
          varian: formData.varian,
          harga: Number(formData.harga),
          stok: Number(formData.stok),
        })
        .eq("id", product.id);

      if (error) throw error;
      if (images.length > 0) {
        const gambar = await updateProductImages(product.id, images);

        if (!gambar.success) {
          toast.error("Gagal update gambar!");
          setLoading(false);
          return;
        }
      }
      onSuccess?.();

      toast.success("Produk berhasil diperbarui");

      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);
  console.log(product);
  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              onClick={() => onOpenChange(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-dvh bg-black/30"
            />
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 z-10 flex flex-col lg:w-[60%] w-full h-dvh bg-white"
            >
              <form onSubmit={handleSubmit}>
                <div className="flex justify-between border-b p-4 border-red-800">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-red-800">
                      <SquarePen size={28} />
                      <h1 className="text-3xl font-semibold gradiasi-btn-merah text-transparent bg-clip-text">
                        Edit Produk {product.nama}
                      </h1>
                    </div>
                    <p>Edit produk yang anda jual sesuai kebutuhan anda</p>
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
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Nama produk"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="deskripsi">Deskripsi</Label>
                      <Textarea
                        id="deskripsi"
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        placeholder="Deskripsi singkat"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="varian">Varian</Label>
                      <Input
                        id="varian"
                        name="varian"
                        value={formData.varian}
                        onChange={handleChange}
                        placeholder="Contoh: Pedas, Manis"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="harga">Harga</Label>
                      <Input
                        id="harga"
                        name="harga"
                        value={formData.harga}
                        onChange={handleChange}
                        placeholder="0"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="stok">Stok</Label>
                      <Input
                        id="stok"
                        name="stok"
                        value={formData.stok}
                        onChange={handleChange}
                        placeholder="0"
                      />
                    </div>
                    <div className="flex justify-end gap-4 pb-6 pt-12 ">
                      <Button
                        className="gradiasi-btn-merah text-white hover:text-yellow-300"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Save size={18} />
                        )}
                        {loading ? "Menyimpan..." : "Simpan"}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        variant="outline"
                      >
                        Batal
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-8 px-8 w-[40%]">
                    <Label>Foto Produk (4 gambar wajib)</Label>
                    <div className="flex flex-wrap gap-4 w-70">
                      {images.map((image, i) => (
                        <div className="w-32 h-32" key={i} id="preview">
                          {image ? (
                            <Label htmlFor={`image-${i + 1}`}>
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${i + 1}`}
                                className="w-32 h-32 object-cover rounded-lg border-2 border-red-800 shadow-md"
                              />
                            </Label>
                          ) : (
                            oldImages[i] && (
                              <Label htmlFor={`image-${i + 1}`}>
                                <img
                                  src={oldImages[i].image_url}
                                  alt={`Preview ${i + 1}`}
                                  className="w-32 h-32 object-cover rounded-lg border-2 border-red-800 shadow-md"
                                />
                              </Label>
                            )
                          )}
                        </div>
                      ))}
                    </div>

                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <Input
                          id={`image-${i + 1}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const newFiles = [...images];
                            newFiles[i] = e.target.files[0] || null;
                            setImages(newFiles);
                          }}
                        />

                        {images[i] && (
                          <span className="text-sm text-muted-foreground line-clamp-2">
                            {images[i].name}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
