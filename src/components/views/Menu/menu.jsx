import ThumbCarousel from "@/components/layout/menuPage/thumbCarousel";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useRef } from "react";

const images = [
  "/pedas_ori/1.jpeg",
  "/pedas_ori/4.jpeg",
  "/pedas_ori/6.jpeg",
  "/pedas_ori/3.jpeg",
];

export default function Menu() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <>
      <div className="w-full flex flex-col items-center lg:pt-28 pt-20 pb-8 lg:px-16 px-6 font-poppins">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -50 }}
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
        <div className="w-full flex lg:flex-row flex-col mt-14 lg:pr-16 pr-0 lg:gap-8 gap-2">
          <ThumbCarousel images={images} />
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="flex flex-col lg:justify-between justify-start lg:w-1/3 w-full py-6"
          >
            <div className="flex flex-col gap-4">
              <h1 className="lg:text-5xl text-3xl font-semibold">
                Pentol Pedas Banget
              </h1>
              <p>
                Varian rasa pentol pedas banget, Pentol pedas kami terbuat dari
                daging Ayam Segar pilihan dengan tekstur kenyal dan rasa gurih
                yang pas di lidah. Ditambah dengan bumbu rempah asli dan sambal
                pedas khas, menciptakan rasa gurih dan pedas yang menggugah
                selera. Setiap bulatan pentol dibalut dengan bumbu pedas khas
                yang meresap sempurna, memberikan sensasi pedas nikmat yang
                bikin nagih. Cocok disantap kapan saja, baik untuk camilan
                santai, teman belajar, maupun pelengkap saat kumpul bersama
                teman dan keluarga.
              </p>
              <p className="text-lg font-bold font-inter gradiasi-btn-merah text-yellow-300 w-fit py-1 px-4 rounded-full">Stok : 202</p>
              <span className="font-semibold font-gabarito text-xl">
                2k++ Terjual
              </span>
            </div>
            <div className="flex flex-col gap-6 pb-6">
              <p className="text-3xl mt-4 font-inter gradiasi-btn-merah text-transparent bg-clip-text font-bold">
                Rp. 20.000
              </p>
              <Button
                className={
                  "gradiasi-btn-merah rounded-full text-yellow-300 w-full py-6 text-lg"
                }
                size={"sm"}
              >
                <ShoppingBag size={20} />
                Pesan Sekarang
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
