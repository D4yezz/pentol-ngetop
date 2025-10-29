"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import supabase from "@/lib/db";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function TableProduct() {
  const [product, setProduct] = useState([]);
  const getProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("product")
        .select(
          "nama, deskripsi, varian, harga, stok, product_images (image_url)"
        );
      if (error) {
        setError(error.message);
      } else {
        setProduct(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  console.log(product);

  return (
    <>
      <Table className={"rounded-2xl overflow-hidden shadow-lg"}>
        <TableCaption>Semua produk sudah ditampilkan</TableCaption>
        <TableHeader className={"gradiasi-btn-merah text-yellow-300"}>
          <TableRow className={"hover:bg-red-600 font-semibold"}>
            <TableHead className="px-4">No</TableHead>
            <TableHead className="px-4">Gambar</TableHead>
            <TableHead className="px-4">Nama Produk</TableHead>
            <TableHead className="px-4">Deskripsi</TableHead>
            <TableHead className="px-4">Varian Rasa</TableHead>
            <TableHead className="px-4">Harga</TableHead>
            <TableHead className="px-4">Stok</TableHead>
            <TableHead className="px-4 text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {product.map((item, index) => (
            <TableRow
              key={index}
              className="h-fit w-full py-4 border-b border-gray-300"
            >
              <TableCell className="font-semibold px-4">{index + 1}</TableCell>
              <TableCell className="p-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden shadow-md border-2 border-green-100">
                  <img
                    src={item.product_images[0].image_url}
                    alt={item.nama}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </TableCell>
              <TableCell className="px-4">
                <p className="text-balance">{item.nama}</p>
              </TableCell>
              <TableCell className="px-4 w-[400px]">
                <p className="text-balance line-clamp-2">{item.deskripsi}</p>
              </TableCell>
              <TableCell className="px-4">
                <p className="w-fit h-fit gradiasi-btn-merah rounded-full px-4 py-1.5 text-yellow-300">{item.varian}</p>
              </TableCell>
              <TableCell className="px-4">
                <p className="text-balance">
                  Rp.{" "}
                  {item.harga?.toLocaleString("id-ID", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 3,
                  })}
                </p>
              </TableCell>
              <TableCell className="px-4">
                <p className="text-balance">{item.stok}</p>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 h-auto"
                    title="Detail"
                    //   onClick={() => navigasi("/detail/" + item.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 h-auto"
                    title="Edit"
                    //   onClick={() => navigasi("/edit-wisata/" + item.id)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="px-3 py-2 h-auto"
                    title="Hapus"
                    //   onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
