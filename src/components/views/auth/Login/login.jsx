"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputFocus from "@/components/uiVerse/inputFocus";
import InputVerse from "@/components/uiVerse/inputVerse";
import supabase from "@/lib/db";
import { Eye, EyeOff, Mail, RectangleEllipsis } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import CarouselFade from "./carouselFade";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";

export default function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
    } else {
      router.push("/");
    }
  };
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <>
      <section className="flex lg:flex-row flex-col justify-center items-center w-full h-dvh bg-neutral-100 overflow-hidden">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="lg:order-1 order-2 lg:static absolute z-10 flex flex-col justify-center items-center lg:w-1/2 w-fit h-fit lg:px-6 px-4 lg:py-0 py-8 rounded-2xl lg:bg-transparent bg-white/75 backdrop-blur-md lg:border-0 border-2 border-white lg:shadow-none shadow-xl inset-shadow-[0px_0px_12px] inset-shadow-white/45 font-inter"
        >
          <form
            onSubmit={handleLogin}
            className="flex flex-col lg:gap-10 gap-6 lg:w-[80%] w-full items-center px-4 lg:px-14"
          >
            <h2 className="text-3xl font-semibold text-left w-full gradiasi-btn-merah text-transparent bg-clip-text">
              Login
            </h2>
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={"lg:border-neutral-300 border-red-800"}
              />
            </div>
            <div className="grid w-full items-center gap-3 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                type={showPw ? "text" : "password"}
                id="password"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={"lg:border-neutral-300 border-red-800"}
              />
              <button
                className="absolute right-2 top-8 text-lg text-neutral-500 hover:cursor-pointer"
                type="button"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <Button
              className={
                "w-full h-12 text-md rounded-full cursor-pointer gradiasi-btn-merah hover:bg-yellow-300 hover:text-yellow-300 hover:border-yellow-300 px-8"
              }
              type="submit"
            >
              Login
            </Button>
            <div className="flex flex-col gap-2 justify-center items-center">
              <p>
                Belum Punya Akun?{" "}
                <Link href={"/auth/register"} className="text-blue-400">
                  Register
                </Link>
              </p>
              <Link
                href={"/"}
                className="gradiasi-btn-merah text-transparent bg-clip-text font-medium"
              >
                Lupa Password?
              </Link>
            </div>
          </form>
        </motion.div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="lg:w-1/2 w-full lg:order-2 order-1 h-dvh p-2"
        >
          <CarouselFade
            welcome={"Selamat Datang di"}
            desc={
              "Masuk sekarang dan rasakan sensasi pentol pedas paling nagih. Sekali coba, kamu bakal balik lagi!"
            }
          />
        </motion.div>
      </section>
    </>
  );
}
