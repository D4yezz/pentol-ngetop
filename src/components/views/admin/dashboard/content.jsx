import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Inbox, Package, ShoppingBag, UsersRound } from "lucide-react";

export default function Content() {
  const data = [
    {
      icon: <Package size={20} />,
      title: "Total produk terjual",
      value: "100",
      desc: "Dalam 30 hari terakhir",
    },
    {
      icon: <ShoppingBag size={20} />,
      title: "Stok Produk",
      value: "130",
      desc: "Produk tersedia",
    },
    {
      icon: <UsersRound size={20} />,
      title: "Pengguna Terdaftar",
      value: "20",
      desc:"Bergabung 30 hari terakhir",
    },
    {
      icon: <Inbox size={20} />,
      title: "Kritik dan saran",
      value: "14",
      desc:"Pesan masuk",
    },
  ];
  return (
    <div className="flex items-center gap-4 font-inter">
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
