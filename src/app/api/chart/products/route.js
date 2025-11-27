import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  try {
    // 1. Ambil semua order_items
    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select("product_id, quantity, created_at")
      .neq("product_id", null);

    if (itemsError) throw itemsError;

    if (!items.length) {
      return Response.json({
        status: false,
        pesan: "Tidak ada data order_items",
      });
    }

    // Hitung frekuensi kemunculan product_id
    const frequency = {};
    items.forEach((item) => {
      frequency[item.product_id] = (frequency[item.product_id] || 0) + 1;
    });

    // Sort berdasarkan frekuensi DESC
    const topTwoIds = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([product_id]) => product_id);

    if (topTwoIds.length < 2) {
      return Response.json({
        status: false,
        pesan: "Data produk tidak cukup untuk grafik",
      });
    }

    // 2. Ambil detail produk
    const { data: products, error: prodError } = await supabase
      .from("product")
      .select("*")
      .in("id", topTwoIds);

    if (prodError) throw prodError;

    // 3. Format data chart berdasarkan quantity
    const chartMap = {};

    items
      .filter((item) => topTwoIds.includes(item.product_id))
      .forEach((item) => {
        const d = new Date(item.created_at).toISOString().split("T")[0];

        if (!chartMap[d]) chartMap[d] = { date: d };

        const key = item.product_id === topTwoIds[0] ? "p1" : "p2";

        chartMap[d][key] = (chartMap[d][key] || 0) + item.quantity;
      });

    const chartData = Object.values(chartMap).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // DONE
    return Response.json({
      status: true,
      products,
      chartData,
    });
  } catch (err) {
    console.log("🔥 API ERROR:", err);
    return Response.json(
      { status: false, pesan: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
