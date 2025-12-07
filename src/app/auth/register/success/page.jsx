"use client";
import FiberWaves from "@/components/ui/shadcn-io/fiber-waves";
import Link from "next/link";
import React from "react";

export default function SuccessPage() {
  return (
    <>
      <section className="w-full h-dvh lg:px-0 px-12 bg-white flex items-center justify-center font-inter relative">
        <div className="lg:w-1/3 w-full h-fit flex flex-col gap-4 items-center justify-center gradiasi-btn-merah text-white shadow-xl rounded-3xl p-10 relative z-20">
          <div className="flex items-center justify-center mb-4 w-20 h-20 border-2 border-yellow-300 rounded-full overflow-hidden">
            <img
              src="/logos.png"
              alt="logo website"
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="font-semibold text-center text-4xl">
            Registrasi Berhasil
          </h1>
          <p className="text-center px-8">
            Akun Anda telah berhasil didaftarkan. Silakan cek email untuk
            verifikasi akun.
          </p>
          <Link
            href={"/auth/login"}
            className="bg-yellow-300 px-8 py-1.5 rounded-xl mt-6 text-red-800 font-semibold"
          >
            Login
          </Link>
        </div>
        {/* <FiberWaves
          className="absolute z-0"
          color={[100, 0, 0]}
          enableMouseInteraction={true}
          distance={0.1}
          amplitude={1.2}
        /> */}
      </section>
    </>
  );
}
