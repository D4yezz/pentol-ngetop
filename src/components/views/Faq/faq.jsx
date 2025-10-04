import FaqSection from "@/components/layout/faqSection/FaqSection";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

export default function Faq() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <>
      <section className="w-full h-fit gradiasi-btn-merah flex lg:flex-row flex-col items-start lg:gap-10 lg:px-16 px-8 lg:py-36 py-44 lg:mb-20 font-poppins relative overflow-hidden z-10">
        <div className="w-full lg:scale-105 scale-150 h-48 bg-neutral-100 absolute z-10 -top-30 left-0 right-0 mx-auto lg:rounded-[70%] rounded-[50%]"></div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex flex-col gap-2"
        >
          <h4 className="bg-yellow-300 w-fit px-5 py-0.5 text-red-800 font-semibold rounded-full text-lg">
            FAQ
          </h4>
          <h1 className="font-semibold lg:text-4xl text-3xl text-yellow-300 py-2">
            Pertanyaan yang Sering Ditanyakan
          </h1>
          <p className="max-w-4xl text-white lg:pr-0 pr-2">
            Cek pertanyaan populer seputar Pentol Ngetop dan cara pemesanan agar
            kamu tidak ragu beli Pentol Ngetop.
          </p>
        </motion.div>
        <FaqSection />
        <div className="w-full lg:scale-105 scale-150 h-48 bg-neutral-100 absolute z-20 -bottom-30 left-0 right-0 mx-auto lg:rounded-[70%] rounded-[50%]"></div>
      </section>
    </>
  );
}
