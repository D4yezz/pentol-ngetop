"use client";

import Navbar from "@/components/layout/navbar/navbar";
import LoginView from "@/components/views/auth/Login/login";

export default function RegisterPage() {
  return (
    <>
      <div className="bg-neutral-100 w-full h-dvh">
        <Navbar />
        <div className="mx-auto py-8 lg:px-12 gap-14 flex flex-col">
          <LoginView />
        </div>
      </div>
    </>
  );
}
