"use client";

import { Button } from "@/components/ui/button";
import InputFocus from "@/components/uiVerse/inputFocus";
import InputVerse from "@/components/uiVerse/inputVerse";
import supabase from "@/lib/db";
import { Mail, RectangleEllipsis } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };
  return (
    <>
      <section className="flex w-full h-full mt-20 py-12 rounded-2xl bg-neutral-100 shadow-lg border border-red-800">
        <div className="flex flex-col justify-center items-center w-1/2 h-full px-6 py-12 rounded-2xl font-inter">
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-10 w-[80%] items-center"
          >
            <h2 className="text-3xl font-semibold text-left w-full gradiasi-btn-merah text-transparent bg-clip-text">
              Login
            </h2>
            {/* <div className="grid w-full items-center gap-3 text-red-800">
              <InputVerse
                label={"Email"}
                id={"email"}
                name={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={""}
                type={"email"}
                icon={<Mail size={20} />}
                required
              />
            </div> */}
            <InputFocus
              label={"Email"}
              id={"email"}
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={""}
              type={"email"}
              icon={<Mail size={18} />}
              required
            />
            {/* <div className="grid w-full items-center gap-3 text-red-800">
              <InputVerse
                label={"Password"}
                id={"password"}
                name={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={""}
                type={"password"}
                icon={<RectangleEllipsis size={20} />}
                required
              />
            </div> */}
            {error && <p className="text-yellow-300">{error}</p>}
            <p>
              Belum Punya Akun?{" "}
              <Link href={"/auth/register"} className="text-blue-400">
                Register
              </Link>{" "}
            </p>
            <Button
              className={
                "border-2 cursor-pointer gradiasi-btn-merah hover:bg-yellow-300 hover:text-yellow-300 hover:border-yellow-300 px-8"
              }
            >
              Masuk
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
