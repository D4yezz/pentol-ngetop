import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Beef, Flame, HandCoins, Zap } from "lucide-react";
import React from "react";

const dataCarousel = [
  {
    title: "Pedasnya Nagih",
    description: "Pedas maksimal tetapi masih bisa dinikmati",
    id: 1,
    icon: <Flame size={30} />,
  },
  {
    title: "Bahan Berkualitas",
    description: "Dibuat pakai daging pilihan segar setiap hari.",
    id: 2,
    icon: <Beef size={30} />,
  },
  {
    title: "Pesan Online Praktis",
    description: "Tinggal klik pesan, langsung kami antar cepat.",
    id: 3,
    icon: <Zap size={30} />,
  },
  {
    title: "Harga Bersahabat",
    description: "Kenikmatan enak yang tidak menguras kantong.",
    id: 4,
    icon: <HandCoins size={30} />,
  },
];

export default function CarouselAbout() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
    },
    [
      Autoplay({
        delay: 3000,
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
  return (
    <>
      <div className="lg:w-[80%] w-full h-fit">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-16">
            {dataCarousel.map((item) => (
              <div
                className="flex flex-none items-center gap-4 w-full lg:h-22 h-25 border-4 border-yellow-300 bg-yellow-300 rounded-3xl overflow-hidden cursor-grab"
                key={item.id}
              >
                <span className="flex w-fit h-full lg:px-6 px-4 items-center justify-center gradiasi-btn-merah text-yellow-300">
                  {item.icon}
                </span>
                <div className=" gradiasi-btn-merah text-transparent bg-clip-text">
                  <div className="mb-1 font-semibold text-lg ">
                    {item.title}
                  </div>
                  <p className="lg:text-sm text-xs lg:pr-0 pr-16">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-4 mx-30 my-6">
          {dataCarousel.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollTo(index)}
              className={`p-1.5 w-fit h-fit rounded-full text-sm font-medium transition cursor-pointer ${
                selectedIndex === index
                  ? "bg-yellow-300"
                  : "bg-neutral-100"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
}
