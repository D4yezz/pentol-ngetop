"use client";

import Logo from "@/components/layout/logo/logo";
import RegisterView from "@/components/views/auth/Register/register";
import { CircleChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <>
      <div className="bg-neutral-100 w-full lg:h-dvh h-fit">
        <div className="px-12">
          <Logo />
        </div>
        <div className="mx-auto flex flex-col relative lg:pb-0 pb-20">
          <RegisterView />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <Link
              href={"/"}
              className="absolute bottom-10 right-10 text-red-800 font-instrument font-semibold flex justify-center items-center gap-2 text-lg"
            >
              <p>Beranda</p>
              <CircleChevronRight size={22} />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
