import { Button } from "@/components/ui/button";
import InputVerse from "@/components/uiVerse/inputVerse";
import { CircleUserRound, Mail, RectangleEllipsis } from "lucide-react";
import Link from "next/link";

export default function RegisterView() {
    return (
        <>
      <div>
        <h1 className="text-2xl">Halaman Daftar</h1>
      </div>
      <div className="flex flex-col justify-center items-center mt-8 bg-neutral-900 text-white w-[50vw] mx-auto px-6 py-12 rounded-2xl">
        <form action="" className="flex flex-col gap-10 w-[80%] items-center">
          <h2 className="text-3xl font-semibold">Daftar</h2>
          <div className="grid w-full  items-center gap-3">
            <InputVerse
              label={"Username"}
              id={"username"}
              name={"username"}
              placeholder={""}
              type={"text"}
              icon={<CircleUserRound size={20}  />}
              required
            />
          </div>
          <div className="grid w-full  items-center gap-3">
            <InputVerse
              label={"Email"}
              id={"email"}
              name={"email"}
              placeholder={""}
              type={"email"}
              icon={<Mail size={20}  />}
              required
            />
          </div>
          <div className="grid w-full  items-center gap-3">
            <InputVerse
              label={"Password"}
              id={"password"}
              name={"password"}
              placeholder={""}
              type={"password"}
              icon={<RectangleEllipsis size={20} />}
              required
            />
          </div>
          <p>Sudah Punya Akun? <Link href={"/auth/login"} className="text-blue-400">Login</Link> </p>
          <Button className={"border-2 cursor-pointer hover:bg-neutral-100 hover:text-black"}>Masuk</Button>
        </form>
      </div>
    </>
    );
}