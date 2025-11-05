"use client";

import { PaymentChoose } from "@/components/layout/formCheckout/paymentChoose";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, Minus, Phone, Plus, User2, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getProfileUser } from "@/service/auth.service";
import { toast } from "sonner";
import supabase from "@/lib/db";

const MapPicker = dynamic(() => import("@/components/mapLocation/mapPicker"), {
  ssr: false,
});

export default function FormCheckout({ selectedProduct, allProducts = [] }) {
  const [location, setLocation] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [selectedItems, setSelectedItems] = useState(
    selectedProduct ? [{ ...selectedProduct, quantity: 1 }] : []
  );
  const [IsLoading, SetIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    userId: "",
    name: "",
    email: "",
    phone: "",
  });

  const [checkout, setCheckout] = useState({
    informasiPribadi: userData,
    paymentMethod: paymentMethod,
    location: location,
    note: "",
    products: selectedItems,
  });

  const checkUser = async () => {
    try {
      const user = await getProfileUser();
      if (user.status && user.data) {
        setUserData({
          userId: user.data.profile.id,
          name: user.data.profile.username,
          email: user.data.auth.email,
          phone: user.data.profile.handphone,
        });
      }
      SetIsLoading(false);
    } catch (error) {
      SetIsLoading(false);
      console.error("Error fetch user:", error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleAddItem = (product) => {
    const exist = selectedItems.find((item) => item.nama === product.nama);
    if (exist) return;
    setSelectedItems([...selectedItems, { ...product, quantity: 1 }]);
  };

  const handleChangeValue = (val) => {
    const product = allProducts.find((p) => p.nama === val);
    if (product) handleAddItem(product);
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

  const handleSubmit = async () => {
    if (selectedItems.length === 0) {
      toast.error("Kamu belum memilih produk!");
      return;
    }

    if (userData.phone.length < 10 || userData.phone.length > 13) {
      toast.error("Nomor Handphone harus berjumlah 10-14 angka!");
      return;
    }

    if (!userData.userId) {
      toast.error("Data user belum dimuat!");
      return;
    }

    SetIsLoading(true);

    try {
      const { error: handphoneError } = await supabase
        .from("profil_pengguna")
        .update({ handphone: userData.phone })
        .eq("id", userData.userId);

      if (handphoneError) throw handphoneError;

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: userData.userId,
            payment_method: paymentMethod,
            address: location.address ? location.address : null,
            note: checkout.note,
            total_price: totalPrice,
            status: "pending",
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = selectedItems.map((item) => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.harga,
        subtotal: totalPrice,
      }));

      const { error: itemError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemError) throw itemError;

      toast.success("Pesanan kamu berhasil dibuat!");
      setSelectedItems([]);
      setCheckout({
        informasiPribadi: userData,
        paymentMethod: paymentMethod,
        location: null,
        note: "",
        products: [],
      });

      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Error saat membuat pesanan:", error);
      toast.error("Terjadi kesalahan saat membuat pesanan");
    } finally {
      SetIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col w-full">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex justify-between gap-6 w-full p-8"
      >
        <div className="flex flex-col gap-12 w-2/3 rounded-2xl shadow-xl p-8 border border-red-800">
          <div className="flex flex-col w-full gap-4">
            <h3 className="text-2xl font-medium">Informasi Pribadi</h3>
            <div className="flex flex-col gap-4 w-full ">
              <div className="flex items-center gap-4 h-fit">
                <span className="border-r-2 border-red-800 text-red-800 py-4 pr-4">
                  <User2 />
                </span>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    type="text"
                    id="nama"
                    placeholder="John Doe"
                    value={userData.name}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex w-full gap-4">
                <div className="flex items-center gap-4 h-fit w-full">
                  <span className="border-r-2 border-red-800 text-red-800 py-4 pr-4">
                    <Phone />
                  </span>
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="telp">No. Handphone</Label>
                    <Input
                      type="number"
                      id="telp"
                      placeholder="0891xxxxx"
                      value={userData.phone || ""}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 h-fit w-full">
                  <span className="border-r-2 border-red-800 text-red-800 p-4">
                    <Mail />
                  </span>
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={userData.email}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-4">
            <PaymentChoose onChange={(val) => setPaymentMethod(val)} />
          </div>

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
                className="flex flex-col w-full gap-4"
              >
                <h3 className="text-2xl font-medium text-center">
                  Pembayaran via E-Wallet
                </h3>
                <p className="text-neutral-500 text-center">
                  Kamu akan dihubungi oleh admin pentol ngetop melalui whatsapp
                </p>
                <Button
                  className="text-red-800 font-medium px-6 py-3 rounded-lg font-inter bg-transparent border border-red-800 h-fit w-fit mx-auto hover:bg-yellow-300"
                  onClick={() =>
                    window.open(`https://wa.me/098287378`, "_blank")
                  }
                >
                  Nomor Admin di WhatsApp
                </Button>
                <h3 className="text-2xl font-medium">Alamat Pengiriman</h3>
                <MapPicker onLocationSelect={setLocation} />
                {location && (
                  <div className="mt-3 gradiasi-btn-merah text-yellow-300 font-semibold p-4 rounded-lg shadow w-full text-center">
                    <p>Alamat:</p>
                    <Input
                      readOnly
                      value={location.address}
                      className={"ring-0 border-0 w-full text-center"}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="note" className={"text-2xl"}>
              Catatan Tambahan
            </Label>
            <Textarea
              id="note"
              name="note"
              placeholder="Catatan Tambahan"
              className={"h-20"}
              value={checkout.note}
              onChange={(e) =>
                setCheckout({ ...checkout, note: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col w-1/3 h-fit rounded-2xl px-4 py-6 border border-red-800 gap-12">
          <div className="flex flex-col w-full gap-4">
            <h3 className="text-3xl font-medium gradiasi-btn-merah text-transparent bg-clip-text">
              Rincian Pesanan
            </h3>

            <Select onValueChange={handleChangeValue}>
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
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={IsLoading}
            className="w-full rounded-xl gradiasi-btn-merah text-yellow-300 text-xl h-12"
          >
            {IsLoading ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                "Memproses..."
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faBagShopping} className="mr-2" />
                Checkout
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
