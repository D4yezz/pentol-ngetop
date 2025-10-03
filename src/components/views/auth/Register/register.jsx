"use client";

import Logo from "@/components/layout/logo/logo";
import { Button } from "@/components/ui/button";
import InputVerse from "@/components/uiVerse/inputVerse";
import supabase from "@/lib/db";
import { CircleUserRound, Mail, RectangleEllipsis } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterView() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ SignUp ke Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      const userId = authData?.user?.id;
      if (!userId) throw new Error("User tidak ditemukan setelah registrasi.");

      // 2️⃣ Insert data tambahan ke tabel profil_pengguna
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

      alert("Registrasi berhasil! Silakan login.");
      router.push("/auth/login");
    } catch (err) {
      alert(err.message || "Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Logo />
      <div className="flex flex-col justify-center items-center mt-20 gradiasi-btn-merah text-yellow-300 w-[50vw] mx-auto px-6 py-12 rounded-2xl font-inter">
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-10 w-[80%] items-center"
        >
          <h2 className="text-3xl font-semibold">Daftar</h2>

          {/* Username */}
          <div className="grid w-full items-center gap-3 text-black">
            <InputVerse
              label={"Username"}
              id={"username"}
              name={"username"}
              placeholder={""}
              type={"text"}
              icon={<CircleUserRound size={20}  />}
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full items-center gap-3 text-black">
            <InputVerse
              label={"Email"}
              id={"email"}
              name={"email"}
              placeholder={""}
              type={"email"}
              icon={<Mail size={20}  />}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full items-center gap-3 text-black">
            <InputVerse
              label={"Password"}
              id={"password"}
              name={"password"}
              placeholder={""}
              type={"password"}
              icon={<RectangleEllipsis size={20} />}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <p>
            Sudah Punya Akun?{" "}
            <Link href="/auth/login" className="text-blue-400">
              Login
            </Link>
          </p>

          <Button
            type="submit"
            disabled={loading}
            className="border-2 px-8 cursor-pointer gradiasi-btn-merah hover:text-yellow-300 hover:border-yellow-300"
          >
            {loading ? "Loading..." : "Daftar"}
          </Button>
        </form>
      </div>
    </>
  );
}
