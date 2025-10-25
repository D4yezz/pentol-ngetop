import SqueezeBtn from "@/components/uiVerse/squezeBtn";
import { ShoppingBasket } from "lucide-react";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

export default function CtaMobile() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <>
      <section className="px-4 w-full h-full mb-12 py-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center justify-center px-6 py-3 text-yellow-300 gradiasi-btn-merah rounded-3xl overflow-hidden group inset-shadow-[0px_0px_12px] inset-shadow-black/40 hover:inset-shadow-[0px_0px_20px] hover:inset-shadow-black/60 ease-in-out duration-300">
            <div className="py-5">
              <h1 className="font-semibold font-instrument text-3xl text-center mb-3">
                Siap Panasin Hari Kamu dengan Pentol Ngetop?
              </h1>
              <p className="text-sm text-white font-instrument font-normal text-center">
                Cuma beberapa klik, Pentol Ngetop dengan saus pedas atau manis
                siap mendarat di meja makan kamu. Yuk, jangan tunggu lama!
              </p>
            </div>
            <div className="w-full h-fit rounded-2xl overflow-hidden">
              <img
                src="/gabungan/6.jpeg"
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 duration-300 ease-in-out"
              />
            </div>
            <SqueezeBtn
              text={"Pesan Sekarang"}
              icon={<ShoppingBasket size={20} />}
              className={
                "w-full h-full py-3 my-4 font-bold lg:text-lg text-sm text-red-800 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-lg"
              }
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}
