"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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

export default function TableImages() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getImages = async () => {
    try {
      const { data, error } = await supabase.from("product_images").select(`
        id,
        image_url,
        id_product (
          id,
          nama
        )
      `);

      if (error) throw error;

      const grouped = data.reduce((acc, item) => {
        const productId = item.id_product.id;
        if (!acc[productId]) {
          acc[productId] = {
            product: item.id_product,
            images: [],
          };
        }
        acc[productId].images.push(item.image_url);
        return acc;
      }, {});

      setImages(Object.values(grouped));
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  if (isLoading) {
    return (
      <>
        <Skeleton className="h-[250px] w-full rounded-xl" />
      </>
    );
  }

  return (
    <>
      <Table className={"rounded-2xl overflow-hidden shadow-lg"}>
        <TableCaption className={"mt-8"}>
          Semua gambar produk sudah ditampilkan
        </TableCaption>
        <TableHeader className={"gradiasi-btn-merah text-yellow-300"}>
          <TableRow className={"hover:bg-red-600 font-semibold"}>
            <TableHead className="px-4 font-semibold">No</TableHead>
            <TableHead className="px-4 font-semibold">Produk</TableHead>
            <TableHead className="px-4 font-semibold">Gambar</TableHead>
            <TableHead className="px-4 font-semibold text-center">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {images.map((item, index) => (
            <TableRow
              key={index}
              className="h-fit w-full py-4 border-b border-gray-300"
            >
              <TableCell className="font-semibold px-4">{index + 1}</TableCell>
              <TableCell className="px-4">
                <p className="text-balance">{item.product.nama}</p>
              </TableCell>
              <TableCell className="p-4 flex items-center gap-2">
                {item.images.map((url, i) => (
                  <div
                    key={i}
                    className="w-24 h-24 rounded-lg overflow-hidden border-2 border-green-100"
                  >
                    <img
                      src={url}
                      alt={`image-${i}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </TableCell>

              {/* <TableCell className="px-4 w-[400px]">
                <p className="text-balance line-clamp-2">{item.deskripsi}</p>
              </TableCell>
              <TableCell className="px-4">
                <p className="w-fit h-fit gradiasi-btn-merah rounded-full px-4 py-1.5 text-yellow-300">
                  {item.varian}
                </p>
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
              </TableCell> */}
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
