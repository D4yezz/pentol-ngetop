import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const supabase = await createClient();

  try {
    const { email, password, confirm_password, username } = await req.json();

    if (password !== confirm_password) {
      return NextResponse.json(
        { status: false, pesan: "Password atau Konfirmasi Password tidak sesuai !" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }, 
      },
    });

    if (error) {
      return NextResponse.json(
        { status: false, pesan: error.message },
        { status: 400 }
      );
    }

    const user = data.user;

    const { error: insertError } = await supabase
      .from("profil_pengguna")
      .insert({
        id: user.id,
        username: username, 
      });

    if (insertError) {
      return NextResponse.json(
        {
          status: false,
          pesan: "Akun berhasil dibuat tapi gagal membuat profil: " + insertError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: true,
      pesan: "Registrasi berhasil",
      data: data,
    });

  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { status: false, pesan: "Internal server error" },
      { status: 500 }
    );
  }
}


