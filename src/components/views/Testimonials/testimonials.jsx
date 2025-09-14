import ContentTester from "@/components/layout/TestimonialContent/content";
import LogoLoop from "@/components/ReactBites/LogoLoop";
import { Particles } from "@/components/ui/shadcn-io/particles";

const konten = [
  {
    node: <ContentTester index={0} />,
    title: "Dayezz",
    href: "",
  },
  {
    node: <ContentTester index={1} />,
    title: "Navanken",
    href: "",
  },
  {
    node: <ContentTester index={2} />,
    title: "Dyou",
    href: "",
  },
  {
    node: <ContentTester index={3} />,
    title: "Lewis Hamilton",
    href: "",
  },
];
export default function Testimonial() {
  return (
    <>
      <div className="relative h-fit overflow-hidden py-16 mb-20">
        <div className="relative z-10 overflow-hidden h-fit font-quicksand bg-transparent flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-4 font-instrument mb-10 w-full">
            <h1 className=" font-semibold gradiasi-btn-merah text-transparent bg-clip-text">
              Apa Kata Penggemar Pentol Pedas?
            </h1>
            <p className="w-1/2 text-center text-gray-600  text-lg ">
              Lihat bagaimana Pentol Ngetop berhasil bikin banyak lidah jatuh
              cinta. Testimoni Panas dari Pecinta Pedas.
            </p>
          </div>
          <LogoLoop
            logos={konten}
            speed={70}
            direction="left"
            logoHeight={50}
            gap={90}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#f5f5f5"
            ariaLabel="Testimonial Users"
          />
        </div>
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          staticity={100}
          color="#9f0712"
          size={2}
          vx={0.5}
          vy={0.2}
        />
      </div>
    </>
  );
}
