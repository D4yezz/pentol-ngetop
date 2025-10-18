import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { CookingPot, KeyRound } from "lucide-react";

const loopingGambar = (index, folder) =>
  Array.from({ length: index }, (_, i) => `/${folder}/${i + 1}.jpeg`);

const dataImage = [
  ...loopingGambar(6, "gabungan"),
  ...loopingGambar(9, "pedas_manis"),
  ...loopingGambar(6, "pedas_ori"),
];

export default function CarouselFade({
  welcome,
  merk = true,
  desc,
  kanan = true,
}) {
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
        className={`overflow-hidden relative ${
          kanan ? "lg:rounded-bl-[60px]" : "lg:rounded-br-[60px]"
        } rounded-xl h-full font-poppins`}
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
        <div className="lg:visible invisible absolute z-10 left-0 right-0 bottom-0 mx-auto w-full h-full flex flex-col justify-end lg:p-6 p-4">
          <div className="lg:w-[70%] w-full bg-white/35 inset-shadow-[0px_0px_10px] inset-shadow-white text-white lg:rounded-bl-[40px] lg:rounded-3xl rounded-xl backdrop-blur-sm border shadow-xl flex flex-col justify-center lg:py-12 py-4 lg:px-8 px-4">
            <span className="lg:visible invisible absolute -top-5 -right-5 rotate-0 gradiasi-btn-merah p-3 rounded-full border-2 border-white shadow-lg hover:scale-105 hover:rotate-6 duration-300 ease-in-out">
              <KeyRound />
            </span>
            <h1 className="lg:text-4xl text-2xl font-medium mb-2 flex flex-col">
              {welcome}
              {merk && (
                <span className="gradiasi-btn-merah text-transparent bg-clip-text pb-2 font-semibold">
                  Pentol Ngetop
                </span>
              )}
            </h1>
            <p className="text-md">{desc}</p>
          </div>
        </div>
      </div>
    </>
  );
}
