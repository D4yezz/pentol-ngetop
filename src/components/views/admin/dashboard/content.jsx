import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import supabase from "@/lib/db";
import { Inbox, Package, ShoppingBag, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Content() {
  const [stats, setStats] = useState({
    totalSold: 0,
    totalStok: 0,
    totalUser: 0,
    totalKritik: 0,
  });
  const [loading, setLoading] = useState(true);
  const getStats = async () => {
    try {
      const { data: productData, error: errorProduct } = await supabase
        .from("product")
        .select("*");
      if (errorProduct) throw errorProduct;
      const { data: orderData, error: errorOrder } = await supabase
        .from("orders")
        .select("*")
        .eq("status", "done");
      if (errorOrder) throw errorOrder;
      const { data: user, error: errorUser } = await supabase
        .from("profil_pengguna")
        .select("*");
      if (errorUser) throw errorUser;
      const { data: kritik, error: errorKritik } = await supabase
        .from("kritik_saran")
        .select("*");
      if (errorKritik) throw errorKritik;

      setStats({
        totalSold: orderData.length,
        totalStok: productData.reduce(
          (total, product) => total + product.stok,
          0
        ),
        totalUser: user.length,
        totalKritik: kritik.length,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  const data = [
    {
      icon: <Package size={20} />,
      title: "Total produk terjual",
      value: stats.totalSold,
      desc: "Dalam 30 hari terakhir",
    },
    {
      icon: <ShoppingBag size={20} />,
      title: "Stok Produk",
      value: stats.totalStok,
      desc: "Produk tersedia",
    },
    {
      icon: <UsersRound size={20} />,
      title: "Pengguna Terdaftar",
      value: stats.totalUser,
      desc: "Bergabung 30 hari terakhir",
    },
    {
      icon: <Inbox size={20} />,
      title: "Kritik dan saran",
      value: stats.totalKritik,
      desc: "Pesan masuk",
    },
  ];
  return (
    <div className="flex lg:flex-row flex-col items-center gap-4 font-inter">
      {data.map((item, index) => {
        return (
          <Card key={index} className="w-full border-red-800 shadow-md">
            <CardHeader className="justify-center items-center flex w-full gap-2">
              {item.icon}
              <h2 className="text-lg">{item.title}</h2>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
              <span className="text-3xl font-bold">{item.value}</span>
              <CardDescription>{item.desc}</CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
