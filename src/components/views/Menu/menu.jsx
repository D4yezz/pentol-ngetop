import ThumbCarousel from "@/components/layout/menuPage/thumbCarousel";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/db";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Loader2, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FormCheckout from "@/components/layout/formCheckout/Checkout";
import { useRouter } from "next/navigation";
import { getProfileUser } from "@/service/auth.service";

export default function Menu() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const getProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("product")
        .select(
          "id, nama, deskripsi, varian, harga, stok, product_images (image_url)"
        );
      if (error) {
        setError(error.message);
      } else {
        setProduct(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleOrder = (product) => {
    setSelectedProduct(product);
    setShowCheckout(true);
  };

  if (isLoading)
    return (
      <div className="w-full h-dvh py-20 flex justify-center items-center">
        <p className="text-2xl font-semibold font-gabarito gradiasi-btn-merah text-transparent bg-clip-text">
          Loading...
        </p>
      </div>
    );

  return (
    <div className="w-full flex flex-col items-center lg:pt-28 pt-20 pb-8 lg:px-16 px-6 font-poppins overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="w-full flex flex-col lg:items-start items-center lg:gap-2 gap-1"
      >
        <h1 className="lg:text-6xl text-4xl gradiasi-btn-merah text-transparent bg-clip-text font-semibold py-2">
          Menu Pentol Ngetop
        </h1>
        <p className="lg:text-xl text-lg lg:text-left text-center lg:px-0 px-2">
          Rasakan sensasi pedas nagih dengan menu pentol ngetop
        </p>
      </motion.div>

      {showCheckout ? (
        ""
      ) : (
        <div className="w-full flex flex-col items-center gap-4">
          {product.map((item, index) => (
            <ProductItem
              key={index}
              item={item}
              onOrder={() => handleOrder(item)}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-white overflow-y-auto"
          >
            <div className="flex items-center justify-between p-8 border-b sticky top-0 bg-white z-20">
              <h1 className="text-4xl font-semibold gradiasi-btn-merah text-transparent bg-clip-text">
                Konfirmasi Pemesanan
              </h1>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-600 hover:text-red-800 transition cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>
            <FormCheckout
              selectedProduct={selectedProduct}
              allProducts={product}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductItem({ item, onOrder }) {
  const refRight = useRef(null);
  const isInViewRight = useInView(refRight, { once: false });
  const [isLogin, setIsLogin] = useState(false);
  const [IsLoading, SetIsLoading] = useState(true);
  const router = useRouter();

  const checkUserLogin = async () => {
    try {
      const user = await getProfileUser();

      if (user && user.status && user.data) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      console.error("Error checking user login:", error);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      await checkUserLogin();
      SetIsLoading(false);
    };

    getUser();
  }, []);

  return (
    <div className="w-full flex lg:flex-row flex-col mt-14 lg:pr-16 pr-0 lg:gap-8 gap-8">
      <ThumbCarousel images={item.product_images} varian={item.varian} />

      <motion.div
        ref={refRight}
        initial={{ opacity: 0, x: 50 }}
        animate={{
          opacity: isInViewRight ? 1 : 0,
          x: isInViewRight ? 0 : 50,
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="flex flex-col lg:justify-between justify-start lg:w-1/3 w-full"
      >
        <div className="flex flex-col gap-4">
          <h1 className="lg:text-5xl text-3xl font-semibold">{item.nama}</h1>
          <p>{item.deskripsi}</p>
          <p className="text-lg font-bold font-inter gradiasi-btn-merah text-yellow-300 w-fit py-1 px-4 rounded-full">
            Stok : {item.stok}
          </p>
        </div>

        <div className="flex flex-col gap-6 pb-6">
          <p className="text-3xl mt-4 font-inter gradiasi-btn-merah text-transparent bg-clip-text font-bold">
            Rp. {item.harga.toLocaleString("id-ID")}
          </p>
          <Button
            disabled={IsLoading}
            onClick={isLogin ? onOrder : () => router.push("/auth/login")}
            className="gradiasi-btn-merah rounded-full text-yellow-300 w-full h-fit py-3 text-lg flex gap-2 items-center justify-center"
          >
            {IsLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <ShoppingBag size={20} />
                Pesan Sekarang
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
