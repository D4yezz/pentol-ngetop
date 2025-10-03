"use client"

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";

export default function Logo() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -50 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="z-20 fixed top-0"
      >
        <Link
          href="/"
          className="flex rounded-b-full lg:w-fit lg:h-fit w-14 gradiasi-btn-merah p-1 pt-4"
        >
          <img
            src="/logos.png"
            alt=""
            className="lg:w-14 lg:h-14 w-12 h-12 object-center"
          />
        </Link>
      </motion.div>
    </>
  );
}
