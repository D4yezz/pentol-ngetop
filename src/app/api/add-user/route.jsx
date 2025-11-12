import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { username: name },
    });

    if (error) throw error;

    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch (error) {
    console.error("Error create user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
