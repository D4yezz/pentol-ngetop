import { Button } from "@/components/ui/button";
import MenuImage from "./MenuImage";
import { Varian } from "./Varian";
import { ShoppingCart, ThumbsUp } from "lucide-react";
import Magnet from "@/components/ReactBites/Magnet";



export default function ProductContent({
  title,
  price,
  desc,
  img,
  recommendation = true,
  pedas = true,
  itemVarian,
}) {
  return (
    <>
      <div
        className={`w-full h-[100vh] min-w-full flex items-center justify-center  px-18 ${
          pedas ? "bg-transparent" : "bg-transparent"
        }`}
      >
        <div className="grid grid-cols-3 grid-rows-3 gap-6 w-full h-full">
          <div
            key="item-1"
            className="col-start-1 row-start-1 col-span-1 row-span-3 flex flex-col justify-center gap-4 px-4"
          >
            <h2
              className={`text-6xl font-black text-transparent bg-clip-text pb-2 gradiasi-btn-merah`}
            >
              {title}
            </h2>
            <div className="flex items-end gap-2 mb-6">
              <p className="font-semibold text-3xl ">{price[0]}</p>
              <span className={`line-through ${pedas ? "text-red-800" : ""}`}>
                {price[1]}
              </span>
            </div>
            <p className="text-[0.9rem]">{desc}</p>
            <Button
              className={
                "gradiasi-btn-merah text-yellow-300 rounded-full shadow-xl"
              }
            >
              <span>Beli Sekarang</span>
              <ShoppingCart />
            </Button>
          </div>
          <div
            key="item-2"
            className="col-start-2 row-start-1 col-span-1 row-span-3"
          >
            <MenuImage images={img} />
          </div>
          <div
            key="item-3"
            className={`col-start-3 row-start-1 col-span-1 row-span-3 px-4 flex flex-col pb-24 pt-4 ${
              pedas ? "justify-between" : "justify-end"
            }`}
          >
            {recommendation ? (
              <Magnet padding={100} disabled={false} magnetStrength={4}>
                <div className="flex gap-2 items-center bg-gradient-to-br from-yellow-400 to-orange-500 text-white w-fit h-8 pr-4 rounded-full mt-30">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center border-4 border-neutral-100 rounded-full -ml-1">
                    <ThumbsUp size={18} />
                  </div>
                  <p className="text-sm font-bold font-quicksand">
                    Paling Populer
                  </p>
                </div>
              </Magnet>
            ) : (
              <></>
            )}
            <Varian item={itemVarian} />
          </div>
        </div>
      </div>
    </>
  );
}
