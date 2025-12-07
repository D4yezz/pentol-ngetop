import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import supabase from "@/lib/db";
import { Eye, EyeOff, Key } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FormChangePassword() {
  const [credential, setCredential] = useState({
    old_password: "",
    password: "",
    confirm_password: "",
  });
  const [visibility, setVisibility] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.substring(1));
    const access_token = hash.get("access_token");
    const refresh_token = hash.get("refresh_token");

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({ access_token, refresh_token })
        .then(({ error }) => {
          if (error) toast.error("Token reset tidak valid");
        });
    }
  }, []);

  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { old_password, password, confirm_password } = credential;

    if (!old_password || !password || !confirm_password) {
      toast.error("Harap isi semua field");
      return;
    }

    if (password !== confirm_password) {
      toast.error("Password atau Konfirmasi Password tidak sama");
      return;
    }

    setLoading(true);

    try {
      const { data: currentData, error: currentErr } =
        await supabase.auth.getUser();
      if (currentErr) throw currentErr;
      const email = currentData?.user?.email;
      if (!email) {
        throw new Error("Tidak dapat menemukan email user");
      }

      const { data: signInData, error: signInErr } =
        await supabase.auth.signInWithPassword({
          email,
          password: old_password,
        });

      if (signInErr) {
        toast.error("Password lama tidak sesuai");
        return;
      }

      const { data: updateData, error: updateErr } =
        await supabase.auth.updateUser({ password });
      if (updateErr) {
        throw updateErr;
      }

      toast.success("Password berhasil diperbarui, silahkan login kembali");
      router.push("/auth/login");
    } catch (err) {
      console.error("Update password error:", err);
      toast.error(err?.message || "Gagal untuk update Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="flex flex-col gap-14 lg:w-1/2 w-full items-end lg:px-30 lg:py-12 py-6 px-6 mx-auto font-instrument"
    >
      <div className="w-full flex flex-col gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Ubah Password</h2>
          <p className="text-slate-500">
            Ubah password akun agar akun kamu lebih aman
          </p>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="passwordLama">Password Lama</Label>
            <InputGroup>
              <InputGroupInput
                type={visibility.old_password ? "text" : "password"}
                placeholder="Masukkan Password Lama"
                id="passwordLama"
                name="old_password"
                value={credential.old_password}
                onChange={(e) =>
                  setCredential({ ...credential, old_password: e.target.value })
                }
              />
              <InputGroupAddon
                onClick={() =>
                  setVisibility({
                    ...visibility,
                    old_password: !visibility.old_password,
                  })
                }
                align="inline-end"
                className={"cursor-pointer"}
              >
                {visibility.old_password ? <Eye /> : <EyeOff />}
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Password Baru</Label>
            <InputGroup>
              <InputGroupInput
                type={visibility.new_password ? "text" : "password"}
                placeholder="Masukkan password baru"
                id="newPassword"
                name="password"
                value={credential.password}
                onChange={(e) =>
                  setCredential({ ...credential, password: e.target.value })
                }
              />
              <InputGroupAddon
                onClick={() =>
                  setVisibility({
                    ...visibility,
                    new_password: !visibility.new_password,
                  })
                }
                align="inline-end"
                className={"cursor-pointer"}
              >
                {visibility.new_password ? <Eye /> : <EyeOff />}
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
            <InputGroup>
              <InputGroupInput
                type={visibility.confirm_password ? "text" : "password"}
                placeholder="Konfirmasi password baru anda"
                id="confirmPassword"
                name="confirm_password"
                value={credential.confirm_password}
                onChange={(e) =>
                  setCredential({
                    ...credential,
                    confirm_password: e.target.value,
                  })
                }
              />
              <InputGroupAddon
                onClick={() =>
                  setVisibility({
                    ...visibility,
                    confirm_password: !visibility.confirm_password,
                  })
                }
                align="inline-end"
                className={"cursor-pointer"}
              >
                {visibility.confirm_password ? <Eye /> : <EyeOff />}
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center font-instrument">
        <Button
          className={"gradiasi-btn-merah"}
          type="submit"
          disabled={loading}
        >
          <Key size={18} /> {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
        <Button type="button" onClick={() => window.history.back()}>
          Batal
        </Button>
      </div>
    </form>
  );
}
