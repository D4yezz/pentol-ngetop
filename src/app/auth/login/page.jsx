"use client";

import Logo from "@/components/layout/logo/logo";
import LoginView from "@/components/views/auth/Login/login";

export default function RegisterPage() {
  return (
    <>
      <div className=" mx-auto py-8 px-12 gap-14 flex flex-col">
        <Logo/>
        <LoginView />
      </div>
    </>
  );
}
