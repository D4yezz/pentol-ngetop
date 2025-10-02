import ProductContent from "@/components/layout/ProductSection/ProductContent";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const productKonten = [
  {
    id: 1,
    title: "Pentol Pedas Original",
    price: ["Rp. 15.000", "Rp. 20.000"],
    desc: "Rasakan sensasi adrenalin dari rasa pedas pentol yang menggigit dan penuh karakter, pilihan sempurna bagi pecinta pedas sejati yang tak mau kompromi!",
    img: [
      "/pedas_ori/1.jpeg",
      "/pedas_ori/5.jpeg",
      "/pedas_ori/3.jpeg",
      "/pedas_ori/6.jpeg",
    ],
    recommendation: true,
    pedas: true,
    itemVarian: [
      {
        itemId: 1,
        judul: "Pedas Original",
        deskripsi: [
          "Saus cabainya dirancang untuk meledakkan rasa pedas yang kuat, langsung terasa begitu mengenai lidah. Rasa pedasnya murni, tajam, dan meninggalkan kesan berani di setiap suapan.",
          "Varian ini cocok untuk mereka yang mencari sensasi pedas sejati yang memacu adrenalin.",
        ],
      },
      {
        itemId: 2,
        judul: "Detail",
        deskripsi: [
          "Pentol Pedas Original adalah varian klasik yang paling dicari pecinta pedas sejati. Dibuat dari daging pilihan berkualitas dengan bumbu pedas khas yang meresap sempurna hingga ke dalam.",
          "Tingkat kepedasannya pas, bikin sensasi makan jadi lebih seru dan menantang. Cocok banget buat kamu yang suka rasa autentik tanpa tambahan rasa lain.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Pentol Pedas Manis",
    price: ["Rp. 17.000", "Rp. 22.000"],
    desc: "Kombinasi unik rasa pedas yang berpadu manis gurih. Pilihan tepat untuk pecinta kuliner yang suka sensasi pedas namun tetap lembut di lidah.",
    img: [
      "/pedas_manis/4.jpeg",
      "/pedas_manis/2.jpeg",
      "/pedas_manis/3.jpeg",
      "/pedas_manis/5.jpeg",
    ],
    recommendation: false,
    pedas: false,
    itemVarian: [
      {
        itemId: 1,
        judul: "Pedas Manis",
        deskripsi: [
          "Saus pedas manis kami dibuat dari perpaduan kecap manis pilihan dan cabai segar yang menghasilkan rasa khas. Manisnya lembut tapi tetap terasa kuat, berpadu dengan pedas yang bikin lidah bergoyang. ",
          "Saus ini diracik dengan takaran pas sehingga menyeimbangkan rasa, tidak terlalu manis dan tidak terlalu pedas. Inilah rahasia kenapa setiap gigitan pentol pedas manis jadi makin nagih.",
        ],
      },
      {
        itemId: 2,
        judul: "Detail",
        deskripsi: [
          "Pentol Pedas Manis adalah kombinasi sempurna antara daging lembut dan saus pedas manis khas kami. Tekstur pentol yang kenyal dipadu dengan siraman saus kental membuat cita rasanya semakin lengkap. ",
          "Pedasnya tetap terasa nendang, tapi manisnya menyeimbangkan sehingga nyaman dinikmati siapa saja. Varian ini pas banget buat kamu yang suka sensasi pedas tapi gak terlalu ekstrem.",
        ],
      },
    ],
  },
];

export default function ProductHome() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      watchDrag: false,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ]
  );

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollTo = (index) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <>
      <section className="w-full h-fit bg-neutral-100 font-poppins flex flex-col justify-start items-center pt-8 lg:px-0 px-4 mb-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -50 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex flex-col items-center mt-8"
        >
          <h1 className="font-semibold text-transparent bg-clip-text gradiasi-btn-merah text-center lg:text-5xl text-3xl py-2 lg:mb-4 mb-0">
            Menu Pentol Ngetop, Siap Bikin Lidah Panas!
          </h1>
          <p className="font-normal text-yellow-300 gradiasi-btn-merah rounded-full px-5 py-1 lg:text-xl text-sm">
            Pesan sekarang, nikmati pedasnya tanpa ribet.
          </p>
        </motion.div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="w-full lg:my-0 my-14"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {productKonten.map((item) => {
                return (
                  <ProductContent
                    key={item.id}
                    title={item.title}
                    price={item.price}
                    desc={item.desc}
                    img={item.img}
                    recommendation={item.recommendation}
                    pedas={item.pedas}
                    itemVarian={item.itemVarian}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex justify-center lg:gap-8 gap-6 lg:mx-30 mx-8 my-6">
            {productKonten.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollTo(index)}
                className={`px-3 lg:py-1.5 py-[7px] w-full rounded-lg text-sm font-medium transition cursor-pointer ${
                  selectedIndex === index
                    ? "gradiasi-btn-merah "
                    : "bg-yellow-300"
                }`}
              ></button>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
