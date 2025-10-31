"use client";

import Navbar from "@/components/layout/navbar/navbar";
import Menu from "@/components/views/Menu/menu";

export default function MenuPage() {
  return (
    <>
      <main className="w-full bg-neutral-100">
        <Navbar />
        <Menu />
      </main>
    </>
  );
}
