"use client";

import Logo from "@/components/layout/logo/logo";
import Navbar from "@/components/layout/navbar/navbar";
import LoginView from "@/components/views/auth/Login/login";
import { CircleChevronLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <>
      <div className="bg-neutral-100 w-full h-dvh">
        <div className="px-12">
          <Logo />
        </div>
        <div className="mx-auto flex flex-col relative">
          <Suspense fallback={null}>
            <LoginView />
          </Suspense>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <Link
              href={"/"}
              className="absolute bottom-10 left-10 text-red-800 font-instrument font-semibold flex justify-center items-center gap-2 text-lg"
            >
              <CircleChevronLeft size={22} />
              <p>Beranda</p>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
