"use client";

import { PaymentChoose } from "@/components/layout/formCheckout/paymentChoose";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Minus, Phone, Plus, User2, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const MapPicker = dynamic(() => import("@/components/mapLocation/mapPicker"), {
  ssr: false,
});

export default function FormCheckout({ selectedProduct, allProducts = [] }) {
  const [location, setLocation] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState(
    selectedProduct ? [{ ...selectedProduct, quantity: 1 }] : []
  );

  const handleAddItem = (product) => {
    const exist = selectedItems.find((item) => item.nama === product.nama);
    if (exist) return; // Biar gak dobel
    setSelectedItems([...selectedItems, { ...product, quantity: 1 }]);
  };

  const handleChangeQuantity = (nama, delta) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.nama === nama
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (nama) => {
    setSelectedItems((prev) => prev.filter((item) => item.nama !== nama));
  };

  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.harga * item.quantity,
    0
  );

  return (
    <section className="flex flex-col w-full">
      <form action="" className="flex justify-between gap-6 w-full p-8">
        <div className="flex flex-col gap-12 w-2/3 rounded-2xl shadow-xl p-8 border border-red-800">
          <div className="flex flex-col w-full gap-4">
            <h3 className="text-2xl font-medium">Informasi Pribadi</h3>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-4 h-fit">
                <span className="border-r-2 border-red-800 text-red-800 p-4">
                  <User2 />
                </span>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input type="text" id="nama" placeholder="John Doe" />
                </div>
              </div>
              <div className="flex w-full gap-4">
                <div className="flex items-center gap-4 h-fit w-full">
                  <span className="border-r-2 border-red-800 text-red-800 p-4">
                    <Phone />
                  </span>
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="telp">No. Handphone</Label>
                    <Input type="number" id="telp" placeholder="0891xxxxx" />
                  </div>
                </div>
                <div className="flex items-center gap-4 h-fit w-full">
                  <span className="border-r-2 border-red-800 text-red-800 p-4">
                    <Mail />
                  </span>
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-4">
            <PaymentChoose onChange={(val) => setPaymentMethod(val)} />
          </div>

          <AnimatePresence mode="wait">
            {paymentMethod === "cod" && (
              <motion.div
                key="cod"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col w-full gap-4"
              >
                <h3 className="text-2xl font-medium">Alamat Pengiriman</h3>
                <MapPicker onLocationSelect={setLocation} />
                {location && (
                  <div className="mt-3 gradiasi-btn-merah text-yellow-300 font-semibold p-4 rounded-lg shadow w-full text-center">
                    <p>Alamat:</p>
                    <p>{location.address}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {paymentMethod === "toko" && (
              <motion.div
                key="toko"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col w-full gap-4"
              >
                <h3 className="text-2xl font-medium">Lokasi Toko</h3>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15806.426095360242!2d112.6616436860382!3d-7.9360980255881834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6299ed2c476ad%3A0xfba1cc2ab944bab!2sSMK%20Negeri%208%20Kota%20Malang!5e0!3m2!1sid!2sid!4v1762056939480!5m2!1sid!2sid"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full rounded-lg"
                ></iframe>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {paymentMethod === "wallet" && (
              <motion.div
                key="wallet"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col w-full gap-4 text-center"
              >
                <h3 className="text-2xl font-medium">
                  Pembayaran via E-Wallet
                </h3>
                <p className="text-neutral-500">
                  Kamu akan dihubungi oleh admin melalui whatsapp untuk
                  melakukan pembayaran
                </p>
                <Button
                  className="gradiasi-btn-merah text-yellow-300 font-semibold px-6 py-3 rounded-lg"
                  onClick={() =>
                    window.open("https://wa.me/6281234567890", "_blank")
                  }
                >
                  Nomor Admin di WhatsApp
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="note" className={"text-2xl"}>
              Catatan Tambahan
            </Label>
            <Textarea
              id="note"
              placeholder="Catatan Tambahan"
              className={"h-20"}
            />
          </div>
        </div>
        <div className="flex flex-col w-1/3 h-fit rounded-2xl px-4 py-6 border border-red-800 gap-12">
          <div className="flex flex-col w-full gap-4">
            <h3 className="text-3xl font-medium gradiasi-btn-merah text-transparent bg-clip-text">
              Rincian Pesanan
            </h3>

            <Select
              onValueChange={(val) => {
                const product = allProducts.find((p) => p.nama === val);
                if (product) handleAddItem(product);
              }}
            >
              <SelectTrigger className="w-full border border-red-800">
                <SelectValue placeholder="Pilih produk tambahan" />
              </SelectTrigger>
              <SelectContent>
                {allProducts.map((p) => (
                  <SelectItem key={p.nama} value={p.nama}>
                    {p.nama}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedItems.length > 0 ? (
              <>
                {selectedItems.map((item) => (
                  <div
                    key={item.nama}
                    className="flex items-center justify-between gap-4 w-full h-26 bg-neutral-100 shadow p-2 rounded relative"
                  >
                    <div className="flex items-center gap-4 h-full">
                      <div className="w-20 h-full rounded overflow-hidden">
                        <img
                          src={item.product_images?.[0]?.image_url}
                          alt={item.nama}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h5 className="text-md">{item.nama}</h5>
                        <p className="text-sm">{item.quantity} porsi</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="text-lg font-semibold text-red-800">
                        Rp.{" "}
                        {(item.harga * item.quantity).toLocaleString("id-ID")}
                      </span>
                      <div className="w-fit h-8 flex items-center justify-between gap-2 rounded-full overflow-hidden border border-red-800">
                        <button
                          type="button"
                          className="gradiasi-btn-merah p-2 text-yellow-300"
                          onClick={() => handleChangeQuantity(item.nama, -1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          type="button"
                          className="gradiasi-btn-merah p-2 text-yellow-300"
                          onClick={() => handleChangeQuantity(item.nama, 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="gradiasi-btn-merah p-0.5 rounded-full text-yellow-300 absolute -top-1.5 -right-1.5 cursor-pointer"
                      onClick={() => handleRemoveItem(item.nama)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                <div className="w-full border-t pt-4 flex justify-between font-semibold text-xl">
                  <p>Total</p>
                  <p>Rp. {totalPrice.toLocaleString("id-ID")}</p>
                </div>
              </>
            ) : (
              <p>Tidak Ada Produk yang Dipilih</p>
            )}
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="flex gap-2 items-center">
              <Checkbox className="data-[state=checked]:border-red-800 data-[state=checked]:bg-red-600 data-[state=checked]:text-white" />
              <p>Menyetujui Syarat dan Ketentuan</p>
            </div>
            <Button
              type="button"
              className={"w-full rounded-xl gradiasi-btn-merah text-yellow-300"}
            >
              Checkout
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
