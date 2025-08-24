import supabase from "@/lib/db";

export async function GET() {
  const { data, error } = await supabase.from("product").select("*");
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ product: data }, { status: 200 });
}
