"use client";

import { Button } from "@/components/ui/button";
import InputVerse from "@/components/uiVerse/inputVerse";
import supabase from "@/lib/db";
import { CircleUserRound, RectangleEllipsis } from "lucide-react";
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
      router.push("/home");
      console.log("berhasil", data);
    }
  };
  return (
    <>
      <div>
        <h1 className="text-2xl">Halaman Login</h1>
      </div>
      <div className="flex flex-col justify-center items-center mt-8 bg-neutral-900 text-white w-[50vw] mx-auto px-6 py-12 rounded-2xl">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-10 w-[80%] items-center"
        >
          <h2 className="text-3xl font-semibold">Login</h2>
          <div className="grid w-full  items-center gap-3">
            <InputVerse
              label={"Email"}
              id={"email"}
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={""}
              type={"email"}
              icon={<CircleUserRound size={20} />}
              required
            />
          </div>
          <div className="grid w-full  items-center gap-3">
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
            {/* <Label htmlFor="password">Password</Label>
            <Input
              type="text"
              id="password"
              placeholder="password"
              data-has-listeners="false"
            /> */}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <p>
            Belum Punya Akun?{" "}
            <Link href={"/auth/register"} className="text-blue-400">
              Register
            </Link>{" "}
          </p>
          <Button
            className={
              "border-2 cursor-pointer hover:bg-neutral-100 hover:text-black"
            }
          >
            Masuk
          </Button>
        </form>
      </div>
    </>
  );
}
