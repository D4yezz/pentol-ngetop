"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import CarouselFade from "../Login/carouselFade";
import useMediaQuery from "@/hooks/useMediaQuery";
import { motion } from "framer-motion";
import { register } from "@/service/auth.service";

export default function RegisterView() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [credential, setCredential] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const isDekstop = useMediaQuery("(min-width: 1024px)");

  const handleChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !credential.email ||
      !credential.password ||
      !credential.confirm_password
    ) {
      toast.error("Harap isi semua field");
      return;
    }

    if (credential.password !== credential.confirm_password) {
      toast.error("Password dan konfirmasi tidak sesuai");
      return;
    }

    setLoading(true);

    const response = await register({
      email: credential.email,
      password: credential.password,
      confirm_password: credential.confirm_password,
    });

    setLoading(false);

    if (!response.status) {
      toast.error(response.pesan || "Gagal register");
      return;
    }

    router.push("/auth/register/success");
  };

  return (
    <>
      <div className="flex justify-center text-red-800 w-full h-dvh mx-auto p-6 relative font-inter overflow-hidden">
        {isDekstop ? (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="lg:w-1/2 w-full h-full"
          >
            <CarouselFade
              welcome={"Gabung Bersama"}
              merk={true}
              desc={
                "Dengan mendaftar, kamu bisa akses pesanan lebih cepat, dan rekomendasi pentol pedas sesuai seleramu. Gak cuma makan pentol, tapi juga jadi bagian dari komunitas pecinta pedas yang selalu lapar tantangan."
              }
              kanan={false}
            />
          </motion.div>
        ) : null}

        <motion.form
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          onSubmit={handleRegister}
          className="flex flex-col gap-4 justify-center items-center lg:w-1/2 w-full h-fit lg:px-12 px-4 lg:py-0 py-8 mt-8 rounded-2xl font-inter"
        >
          <div className="flex flex-col gap-2 lg:mb-8 mb-2">
            <h2 className="text-4xl font-semibold lg:pr-30">
              Buat Akun dan Rasakan Pedasnya Sekarang!
            </h2>
            <p className="text-lg">
              Daftar cuma butuh satu menit, tapi rasanya bakal kamu inget
              selamanya
            </p>
          </div>
          <div className="w-full h-full flex flex-col gap-5 items-center justify-center rounded-4xl">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="username" className={"text-md font-semibold"}>
                Nama Lengkap
              </Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="John Doe"
                value={credential.username}
                onChange={handleChange}
                className={"placeholder:text-neutral-700 border-red-800"}
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email" className={"text-md font-semibold"}>
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                name="email"
                value={credential.email}
                onChange={handleChange}
                className={"placeholder:text-neutral-700 border-red-800"}
              />
            </div>
            <div className="grid w-full items-center gap-3 relative">
              <Label htmlFor="password" className={"text-md font-semibold"}>
                Password
              </Label>
              <Input
                type={showPw ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Minimal 8 karakter"
                value={credential.password}
                onChange={handleChange}
                className={"placeholder:text-neutral-700 border-red-800"}
              />
              <button
                className="absolute right-2 top-11 text-lg text-neutral-500 hover:cursor-pointer"
                type="button"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="grid w-full items-center gap-3 relative">
              <Label htmlFor="confirm" className={"text-md font-semibold"}>
                Konfirmasi Password
              </Label>
              <Input
                type={showConfirm ? "text" : "password"}
                id="confirm"
                name="confirm_password"
                placeholder="********"
                value={credential.confirm_password}
                onChange={handleChange}
                className={"placeholder:text-neutral-700 border-red-800"}
              />
              <button
                className="absolute right-2 top-11 text-lg text-neutral-500 hover:cursor-pointer"
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <Button
            className={
              "w-[70%] h-12 text-md rounded-full cursor-pointer gradiasi-btn-merah hover:bg-yellow-300 hover:text-yellow-300 hover:border-yellow-300 px-8 mt-8"
            }
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Daftar"}
          </Button>
          <p>
            Sudah Punya Akun?{" "}
            <Link href="/auth/login" className="text-blue-400">
              Login
            </Link>
          </p>
        </motion.form>
      </div>
    </>
  );
}
