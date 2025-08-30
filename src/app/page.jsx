"use client";

import Navbar from "@/components/layout/navbar/navbar";
import About from "@/components/views/About/about";
import Beranda from "@/components/views/Home/home";
import ProductHome from "@/components/views/ProductHome/ProductHome";
import Testimonial from "@/components/views/Testimonials/testimonials";

export default function Home() {
  return (
    <>
      <div className="bg-neutral-100">
        <Navbar />
        <Beranda/>
        <About/>
        <Testimonial/>
        <ProductHome/>
      </div>
    </>
  );
}
