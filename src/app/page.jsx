"use client";

import Navbar from "@/components/layout/navbar/navbar";
import { Particles } from "@/components/ui/shadcn-io/particles";
import About from "@/components/views/About/about";
import Cta from "@/components/views/Cta/cta";
import CtaMobile from "@/components/views/Cta/ctaMobile";
import Faq from "@/components/views/Faq/faq";
import Footer from "@/components/views/Footer/footer";
import Beranda from "@/components/views/Home/home";
import ProductHome from "@/components/views/ProductHome/ProductHome";
import Testimonial from "@/components/views/Testimonials/testimonials";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function Home() {
  const isDekstop = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      <main className="bg-neutral-100 relative">
        <div className="relative overflow-hidden">
          <Particles
            className="absolute inset-0"
            quantity={100}
            size={1.1}
            ease={80}
            color="#9f0712"
            refresh="true"
            staticity={20}
            vx={0.2}
            vy={0.2}
          />
          <Navbar />
          <Beranda />
        </div>
        <About />
        <ProductHome />
        <Testimonial />
        <Faq />
        {isDekstop ? <Cta /> : <CtaMobile />}
        <Footer />
      </main>
    </>
  );
}
