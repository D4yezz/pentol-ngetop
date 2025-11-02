"use client";
import FormCheckout from "@/components/views/Menu/Checkout";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function OrderPage() {
  return (
    <main className="flex flex-col px-16 py-8 font-inter">
      {/* <Navbar /> */}
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-semibold gradiasi-btn-merah text-transparent bg-clip-text">
          Konfirmasi Pemesanan
        </h1>
        <Link href={"/menu"} className="flex items-center gap-2">
          <X /> Batalkan Pemesanan
        </Link>
      </div>
      <FormCheckout />
    </main>
  );
}
