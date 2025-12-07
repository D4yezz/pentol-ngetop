"use client";
import HeaderProfile from "@/components/layout/HeaderProfile/headerProfile";
import FormChangePassword from "@/components/views/changePassword/form";
import FormEditProfil from "@/components/views/profileEdit/form";

export default function ChangePasswordPage() {
  return (
    <main className="w-full lg:h-dvh h-fit bg-neutral-50">
      <HeaderProfile text={"Ubah Password"} />
      <FormChangePassword />
    </main>
  );
}
