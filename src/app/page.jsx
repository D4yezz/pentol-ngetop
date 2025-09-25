"use client";

import Navbar from "@/components/layout/navbar/navbar";
import { BackgroundBeams } from "@/components/ui/shadcn-io/background-beams";
import About from "@/components/views/About/about";
import Cta from "@/components/views/Cta/cta";
import Faq from "@/components/views/Faq/faq";
import Footer from "@/components/views/Footer/footer";
import Beranda from "@/components/views/Home/home";
import ProductHome from "@/components/views/ProductHome/ProductHome";
import Testimonial from "@/components/views/Testimonials/testimonials";

export default function Home() {
  return (
    <>
      <div className="bg-neutral-100 [&>*]:selection:bg-yellow-300/50 relative">
        <div className="relative">
          <BackgroundBeams className="scale-[300%] md:scale-100" />
          <Navbar />
          <Beranda />
        </div>
        <About />
        <ProductHome />
        <Testimonial />
        <Faq />
        <Cta />
        <Footer />
      </div>
    </>
  );
}
