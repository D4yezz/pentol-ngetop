import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function CardProduct({
  img,
  title,
  rasa,
  desc,
  harga,
  coret,
  rate,
}) {
  return (
    <>
      <div className="w-1/2  flex flex-col items-center">
        <Card
          className={
            " w-[85%] h-fit z-0 rounded-3xl gap-0 pt-0 px-0 gradiasi-btn-merah text-white border-0 shadow-xl hover:scale-105 duration-300 ease-in-out"
          }
        >
          <CardHeader className={"gap-0 mb-6 px-0"}>
            <div className="w-full h-78 overflow-hidden z-10 rounded-t-3xl mb-4">
              <img src="/pentol.jpg" alt="" className="object-cover" />
            </div>
            <div className="px-6">
              <h3 className="font-semibold font-quicksand">Pentol Pedas</h3>
              <div className="flex flex-wrap gap-2 text-xs font-medium [&>p]:px-3 [&>p]:py-1 [&>p]:w-fit [&>p]:rounded-full">
                <p className=" bg-red-800 text-yellow-300 shadow-xs shadow-yellow-300/60">
                  Pedas Original
                </p>
                <p className="bg-yellow-300 text-red-800 ">Manis</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className={"flex flex-col"}>
            <p className="text-sm mb-4 font-quicksand font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
            <div className="flex justify-between items-center mb-4 ">
              <div className="flex gap-1 items-center">
                <span className="text-xl text-yellow-300 font-semibold">
                  Rp. 15.000
                </span>
                <span className="text-xs line-through">Rp. 20.000</span>
              </div>
              <div className="flex items-center gap-1 border-yellow-300 border-2 rounded-full px-2 py-0.5">
                <Star fill="yellow" stroke="yellow" size={16} />
                <span className="text-sm">5.0</span>
              </div>
            </div>
            <Button className={"bg-yellow-300 text-red-800 rounded-full"}>
              Beli Sekarang
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
