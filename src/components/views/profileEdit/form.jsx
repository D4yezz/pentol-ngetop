"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { AtSign, ImagePlus, MailIcon, Save, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import supabase from "@/lib/db";
import { toast } from "sonner";
import { getProfileUser } from "@/service/auth.service";

export default function FormEditProfil() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    email: "",
    username: "",
    handphone: "",
    picture: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const user = await getProfileUser();
        if (!user || !user.status || !user.data) {
          setProfile(null);
          return;
        }
        const p = user.data.profile;
        setProfile(p);
        setForm((f) => ({
          ...f,
          email: user.data.auth.email,
          username: p.username,
          handphone: p.handphone,
          picture: p.picture,
        }));
      } catch (err) {
        console.error(err);
        toast.error("Gagal memuat profil", { description: err.message });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setAvatarFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile.id) {
      toast.error("Tidak dapat menemukan pengguna");
      return;
    }
    setLoading(true);
    try {
      const { data: currentUser } = await supabase.auth.getUser();
      const currentEmail = currentUser?.user?.email || "";
      if (form.email && form.email !== currentEmail) {
        const { error: emailErr } = await supabase.auth.updateUser({
          email: form.email,
        });
        if (emailErr) throw emailErr;
      }

      let fotoUrl = form.picture || null;
      if (avatarFile) {
        const timestamp = Date.now();
        const filePath = `profile/${profile.id}/${timestamp}_${avatarFile.name}`;
        const { error: uploadErr } = await supabase.storage
          .from("pentol")
          .upload(filePath, avatarFile, { cacheControl: "3600", upsert: true });
        if (uploadErr) throw uploadErr;
        const { data: urlData } = supabase.storage
          .from("pentol")
          .getPublicUrl(filePath);
        fotoUrl = urlData.publicUrl;
      }

      const updatePayload = {
        username: form.username,
        handphone: form.handphone,
      };
      if (fotoUrl) updatePayload.picture = fotoUrl;

      const { error: updateErr } = await supabase
        .from("profil_pengguna")
        .update(updatePayload)
        .eq("id", profile.id);
      if (updateErr) throw updateErr;

      toast.success("Profil berhasil diperbarui");
      if (avatarPreview && avatarFile) URL.revokeObjectURL(avatarPreview);
      setAvatarFile(null);
    } catch (err) {
      console.error("Update profile error:", err);
      toast.error("Gagal memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-14 w-full items-end p-12 font-inter"
      >
        <div className="w-full flex justify-between items-center">
          <div className="w-1/2 flex flex-col gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Informasi Akun</h2>
              <p className="text-slate-500">
                Di halaman ini anda bisa mengedit informasi akun anda
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <InputGroup>
                  <InputGroupInput
                    type="email"
                    placeholder="Masukkan Email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <InputGroupAddon>
                    <AtSign />
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <InputGroup>
                  <InputGroupInput
                    type="text"
                    placeholder="Masukkan nama akun anda"
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                  />
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="handphone">Nomor Handphone</Label>
                <InputGroup>
                  <InputGroupInput
                    type="text"
                    placeholder="Masukkan nomor handphone"
                    id="handphone"
                    name="handphone"
                    value={form.handphone}
                    onChange={handleChange}
                  />
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center gap-6 px-8">
            <Label
              htmlFor="avatar"
              className={
                "size-fit p-0 rounded-full border-2 border-red-800 shadow-md overflow-hidden relative group cursor-pointer"
              }
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="group-hover:blur-[3px] duration-300 ease-in-out size-56 object-cover rounded-full"
                />
              ) : (
                <Avatar
                  className={
                    "group-hover:blur-[3px] duration-300 ease-in-out size-56 object-cover rounded-full"
                  }
                >
                  <AvatarImage src={form.picture || ""} />
                  <AvatarFallback>
                    <img src="/default.jpg" alt="no-profile" />
                  </AvatarFallback>
                </Avatar>
              )}
              <span className="absolute mx-auto left-0 right-0 translate-y-[250%] group-hover:translate-y-0 w-fit p-4 rounded-full gradiasi-btn-merah text-yellow-300 shadow z-10 duration-300 ease-in-out">
                <ImagePlus />
              </span>
            </Label>
            <Input
              type="file"
              id="avatar"
              name="avatar"
              className={"hidden"}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center font-instrument">
          <Button
            className={"gradiasi-btn-merah"}
            type="submit"
            disabled={loading}
          >
            <Save size={20} /> {loading ? "Menyimpan..." : "Simpan"}
          </Button>
          <Button type="button" onClick={() => window.location.reload()}>
            Batal
          </Button>
        </div>
      </form>
    </>
  );
}
