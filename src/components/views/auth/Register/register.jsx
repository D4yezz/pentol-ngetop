"use client";

import { Button } from "@/components/ui/button";
import supabase from "@/lib/db";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import CarouselFade from "../Login/carouselFade";
import useMediaQuery from "@/hooks/useMediaQuery";
import { motion, useInView } from "framer-motion";

export default function RegisterView() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const isDekstop = useMediaQuery("(min-width: 1024px)");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password minimal 8 karakter.");
      setLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      const userId = authData?.user?.id;
      if (!userId) throw new Error("User tidak ditemukan setelah registrasi.");

      const { error: profileError } = await supabase
        .from("profil_pengguna")
        .insert([
          {
            id: userId,
            username: formData.username,
            role: "user",
          },
        ]);

      if (profileError) throw profileError;

      toast.success("Registrasi berhasil! Silahkan cek email anda.");
      router.push("/auth/login");
    } catch (err) {
      toast.error(err.message || "Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
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
                Username
              </Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="John Doe"
                value={formData.username}
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
                value={formData.email}
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
                value={formData.password}
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
                name="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
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

          <p>
            Sudah Punya Akun?{" "}
            <Link href="/auth/login" className="text-blue-400">
              Login
            </Link>
          </p>

          <Button
            className={
              "w-[70%] h-12 text-md rounded-full cursor-pointer gradiasi-btn-merah hover:bg-yellow-300 hover:text-yellow-300 hover:border-yellow-300 px-8"
            }
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Daftar"}
          </Button>
        </motion.form>
      </div>
    </>
  );
}
