import ContentTester from "@/components/layout/TestimonialContent/content";
import LogoLoop from "@/components/ReactBites/LogoLoop";

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
      <div className="relative overflow-hidden h-[370px] font-quicksand bg-neutral-100 flex items-center justify-center">
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
    </>
  );
}
