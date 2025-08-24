"use client";

import Navbar from "@/components/layout/navbar/navbar";
import Beranda from "@/components/views/Home/home";

export default function Home() {
  return (
    <>
      <body className="bg-neutral-100">
        <Navbar />
        <Beranda/>
      </body>
    </>
  );
}
