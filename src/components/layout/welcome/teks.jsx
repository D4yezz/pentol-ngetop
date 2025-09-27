  import BtnGeserAtas from "@/components/uiVerse/btnGeserAtas";
import ButtonMengkilap from "@/components/uiVerse/btnMengkilap";
import { Link2, Phone, Send, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function TeksWelcome() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <>
      <motion.section
        ref={ref}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="flex flex-col lg:w-[65%] w-full lg:h-full h-fit lg:justify-center justify-start"
      >
        <h1 className="w-full font-semibold gradiasi-btn-merah text-transparent bg-clip-text flex flex-col font-poppins text-6xl lg:pb-8 pb-4 lg:pt-0 pt-4">
          <Link
            href={"/"}
            className="group flex items-center gap-1 w-fit h-fit hover:text-red-600"
          >
            <p className="pb-2">Pentol Ngetop,</p>
            <Link2
              size={28}
              className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 duration-200 ease-in-out"
            />
          </Link>
          <span className="lg:flex hidden">Pedasnya Nendang,</span>
          <span className="flex lg:hidden">Teman Wajib Saat Lapar.</span>
          <span className="lg:flex hidden">Hangatnya Bikin Kenyang.</span>
        </h1>
        <p className="lg:text-[1.4rem] text-xl lg:font-medium font-normal text-neutral-800 lg:mb-6 mb-4 lg:mt-0 mt-4 font-poppins w-fit">
          Website Pemesanan Pentol Pedas Terpercaya.<br />
          Rasakan sensasi pedas nagih yang siap menggoyang lidahmu.
        </p>
        <div className="flex gap-4">
          <ButtonMengkilap
            text={"Beli Pentol"}
            icon={<ShoppingBasket size={20} />}
            textColor={"yellow-300"}
            className={
              "text-lg gradiasi-btn-merah lg:rounded-full rounded-lg font-semibold w-54 lg:px-4 px-2 py-3 hover:ring-2 hover:ring-red-800 hover:ring-offset-2"
            }
          />
          <BtnGeserAtas
            text={"Hubungi Kami"}
            styleText={
              "gradiasi-btn-merah text-yellow-300 font-semibold text-lg lg:rounded-full rounded-lg w-54 lg:px-4 px-2 py-3"
            }
            iconAtas={<Phone size={20} />}
            iconBawah={<Send size={20} />}
            textPopup={"0812-xxxx-xxxx"}
            stylePopup={
              "text-xs bg-yellow-300 text-red-800 px-2 py-2 rounded-full"
            }
          />
        </div>
      </motion.section>
    </>
  );
}
