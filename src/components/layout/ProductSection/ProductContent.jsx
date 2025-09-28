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
        className={`w-full h-[85vh] min-w-full flex items-center justify-center lg:px-18`}
      >
        <div className="flex lg:flex-row flex-col items-center justify-between w-full h-full px-8">
          <div
            key="item-1"
            className="flex flex-col justify-center gap-4 px-4 h-[65%] w-[30%]"
          >
            <h2
              className={`text-6xl font-black text-transparent bg-clip-text pb-4 gradiasi-btn-merah`}
            >
              {title}
            </h2>
            <div className="flex items-end gap-2 mb-6">
              <p className="font-semibold text-4xl ">{price[0]}</p>
              <span className={`line-through text-red-800`}>
                {price[1]}
              </span>
            </div>
            <p className="text-lg">{desc}</p>
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
            className="h-[80%] w-[30%]"
          >
            <MenuImage images={img} />
          </div>
          <div
            key="item-3"
            className={`px-4 pb-12 flex flex-col h-[75%] w-[30%] ${
              pedas ? "justify-between" : "justify-end"
            }`}
          >
            {recommendation ? (
              <Magnet padding={70} disabled={false} magnetStrength={4}>
                <div className="flex gap-2 items-center bg-gradient-to-br from-yellow-400 to-orange-500 text-white w-fit h-8 pr-4 rounded-full mt-12">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center border-4 border-neutral-100 rounded-full -ml-2">
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
