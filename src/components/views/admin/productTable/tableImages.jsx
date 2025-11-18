"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Eye } from "lucide-react";
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
        ),
        created_at
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
        acc[productId].images.push({
          url: item.image_url,
          created_at: item.created_at,
        });
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
    return <Skeleton className="h-[250px] w-full rounded-xl" />;
  }

  return (
    <>
      <Table className={"rounded-2xl overflow-hidden shadow-lg"}>
        <TableCaption className={"mt-8"}>
          Semua gambar produk sudah ditampilkan
        </TableCaption>
        <TableHeader className={"gradiasi-btn-merah text-yellow-300"}>
          <TableRow className={"hover:bg-red-600 font-semibold"}>
            <TableHead className="px-4">No</TableHead>
            <TableHead className="px-4">Produk</TableHead>
            <TableHead className="px-4">Gambar</TableHead>
            <TableHead className="px-4 text-center">Aksi</TableHead>
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
                      src={url.url}
                      alt={`image-${i}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger className="bg-red-800 hover:bg-yellow-300 text-white hover:text-red-800 w-12 py-2 h-auto flex items-center justify-center rounded-md cursor-pointer">
                    <Eye className="w-4 h-4" />
                  </DialogTrigger>
                  <DetailImages imageData={item} />
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export function DetailImages({ imageData }) {
  return (
    <>
      <DialogContent className={"font-inter"}>
        <DialogHeader>
          <DialogTitle
            className={"text-red-800 pb-4 mb-2 border-b border-red-800"}
          >
            Detail foto produk {imageData.product.nama}
          </DialogTitle>
          <DialogDescription />
          <ul>
            {imageData.images.map((img, i) => (
              <li key={i} className="mb-4 flex gap-3 items-center">
                <div className="size size-28 rounded-lg overflow-hidden shadow">
                  <img
                    src={img.url}
                    alt={`image-${i}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="w-[80%] text-sm text-neutral-800">
                    Foto ke - {i + 1}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-neutral-600">
                    <p className="font-medium text-black">Di unggah pada :</p>
                    {new Date(img.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </DialogHeader>
      </DialogContent>
    </>
  );
}
