"use client";
import HeaderProfile from "@/components/layout/HeaderProfile/headerProfile";
import FormEditProfil from "@/components/views/profileEdit/form";

export default function EditProfilePage() {
  return (
    <main className="w-full lg:h-dvh h-fit bg-neutral-50">
      <HeaderProfile text={"Edit Profil"} />
      <FormEditProfil />
    </main>
  );
}
