import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { Beef, CookingPot } from "lucide-react";
import { useEffect, useState } from "react";

const loopingGambar = (index, folder) =>
  Array.from({ length: index }, (_, i) => `/${folder}/${i + 1}.jpeg`);

const dataImage = [
  ...loopingGambar(6, "gabungan"),
  ...loopingGambar(9, "pedas_manis"),
  ...loopingGambar(6, "pedas_ori"),
];

export default function CarouselFade() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      watchDrag: false,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnMouseEnter: false,
        stopOnInteraction: false,
      }),
      Fade(),
    ]
  );

  return (
    <>
      <div
        className="overflow-hidden relative rounded-bl-[60px] rounded-xl h-full font-poppins"
        ref={emblaRef}
      >
        <div className="flex gap-16 relative z-0 brightness-[90%]">
          {dataImage.map((item, index) => (
            <div
              className="flex flex-none items-center w-full h-dvh"
              key={index}
            >
              <img src={item} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute z-10 left-0 right-0 bottom-0 mx-auto w-full h-full flex flex-col justify-end p-6">
          <div className="w-[70%] bg-white/35 inset-shadow-[0px_0px_10px] inset-shadow-white text-white rounded-bl-[40px] rounded-3xl backdrop-blur-sm border shadow-xl flex flex-col justify-center py-16 px-8">
            <span className="absolute -top-5 -right-5 rotate-[20deg] gradiasi-btn-merah p-3 rounded-full border-2 border-white shadow-lg hover:scale-105 hover:rotate-0 duration-300 ease-in-out">
              <CookingPot />
            </span>
            <h1 className="text-4xl font-medium mb-2 flex flex-col">
              Selamat Datang di
              <span className="gradiasi-btn-merah text-transparent bg-clip-text pb-2 font-semibold">
                {" "}
                Pentol Ngetop
              </span>
            </h1>
            <p className="text-md">
              Masuk sekarang dan rasakan sensasi pentol pedas paling nagih.
              Sekali coba, kamu bakal balik lagi!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
