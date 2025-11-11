import { NextResponse } from "next/server";
import supabase from "@/lib/db";
import { getAllUsersWithAuth } from "@/service/allUser.service";

export async function GET() {
  try {
    const authUsers = await getAllUsersWithAuth();

    const { data: profiles, error } = await supabase
      .from("profil_pengguna")
      .select("*");

    if (error) throw error;

    const merged = profiles.map((profile) => {
      const authUser = authUsers.find((u) => u.id === profile.id);
      return {
        ...profile,
        email: authUser?.email || "-",
        last_sign_in_at: authUser?.last_sign_in_at || null,
        created_at_auth: authUser?.created_at || null,
      };
    });

    return NextResponse.json({ users: merged });
  } catch (err) {
    console.error("Error fetching all users:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
