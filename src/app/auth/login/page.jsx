"use client";

import Logo from "@/components/layout/logo/logo";
import Navbar from "@/components/layout/navbar/navbar";
import LoginView from "@/components/views/auth/Login/login";

export default function RegisterPage() {
  return (
    <>
      <div className="bg-neutral-100 w-full h-dvh">
        <div className="px-12">
          <Logo />
        </div>
        <div className="mx-auto flex flex-col">
          <LoginView />
        </div>
      </div>
    </>
  );
}
