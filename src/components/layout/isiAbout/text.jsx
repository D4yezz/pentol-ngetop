import CarouselBites from "@/components/ReactBites/Carousel";
import { Beef, Flame, HandCoins, Zap } from "lucide-react";

const dataCarousel = [
  {
    title: "Pedas Level Sesuai Selera",
    description: "Bisa pilih dari pedas santai sampai pedas sadis.",
    id: 1,
    icon: <Flame size={25} />,
  },
  {
    title: "Bahan Berkualitas",
    description: "Dibuat pakai daging pilihan segar setiap hari.",
    id: 2,
    icon: <Beef size={25} />,
  },
  {
    title: "Pesan Online Praktis",
    description: "Tinggal klik pesan, langsung kami antar cepat.",
    id: 3,
    icon: <Zap size={25} />,
  },
  {
    title: "Harga Bersahabat",
    description: "Kenikmatan enak yang tidak menguras kantong.",
    id: 4,
    icon: <HandCoins size={25} />,
  },
];

export default function TextAbout() {
  return (
    <>
      <div className="flex flex-col w-1/2 justify-start items-start h-[400px]">
        <div className="bg-yellow-300 w-fit px-5 py-1 rounded-r-full">
          <h5 className="font-quicksand font-bold gradiasi-btn-merah text-transparent bg-clip-text ">
            Pentol<span>Ngetop</span>
          </h5>
        </div>
        <h2 className="text-center text-4xl font-medium text-white my-4">
          Kenapa Harus Pentol Ngetop?
        </h2>
        <h3 className="text-2xl text-yellow-300 mb-3">Pedas Juara</h3>
        <p className="text-white text-[0.9rem] font-medium w-[86%] mb-4">
          Kami hadir bukan sekadar jual pentol, tapi pengalaman makan pedas yang
          bikin ketagihan. Setiap pentol dibuat dari bahan segar dengan bumbu
          rahasia yang khas. Tingkat kepedasannya bisa kamu pilih sesuai selera,
          dari pedas santai sampai pedas ekstrem. Rasanya mantap, harganya
          bersahabat, bikin lidah puas dan perut kenyang!
        </p>
        <div className="relative">
          <CarouselBites
            items={dataCarousel}
            baseWidth={450}
            autoplay={true}
            autoplayDelay={4321}
            pauseOnHover={false}
            loop={true}
            round={false}
          />
        </div>
      </div>
    </>
  );
}
