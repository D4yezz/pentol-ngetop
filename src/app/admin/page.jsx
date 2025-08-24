"use client";

import supabase from "@/lib/db";
import { useEffect, useState } from "react";

export default function DataHome() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const ambilProduk = async () => {
      const res = await fetch("api/product");
      const data = await res.json();
      setProduk(data.product);
      setLoading(false);
      // const { data, error } = await supabase.from("product").select("*");
      // if (error) {
      //   console.log("Error :", error.message);
      // } else {
      //   setProduk(data);
      // }
      // setLoading(false);
    };
    ambilProduk();
  }, []);
  if (loading) return <p>Tunggu yaa...</p>;
  return (
    <>
      <div className="bg-yellow-400">
        <h1>Data Home</h1>
        <ol className="list-decimal">
          {produk.map((item) => (
            <li key={item.id} className="flex justify-between w-90 gap-4">
              <p>{item.nama}</p>
              <p>{item.deskripsi}</p>
              <p>{item.harga}</p>
              <p>{item.stok}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
