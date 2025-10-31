import { Button } from "@/components/ui/button";
import MenuImage from "./MenuImage";
import { Varian } from "./Varian";
import { ShoppingCart, ThumbsUp } from "lucide-react";
import Magnet from "@/components/ReactBites/Magnet";
import useMediaQuery from "@/hooks/useMediaQuery";
import Link from "next/link";

export default function ProductContent({
  title,
  price,
  desc,
  img,
  recommendation = true,
  pedas = true,
  itemVarian,
}) {
  const isDekstop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <div
        className={`w-full lg:h-[85vh] min-w-full flex items-center justify-center lg:px-18`}
      >
        <div className="flex lg:flex-row flex-col items-center justify-between w-full h-full lg:px-8 px-4">
          <div
            key="item-1"
            className="flex flex-col justify-center lg:items-start items-center lg:gap-4 lg:px-4 lg:mt-0 mt-20 lg:h-[65%] h-fit lg:w-[30%] w-full lg:order-1 order-2"
          >
            <h2
              className={`lg:text-6xl text-5xl lg:text-left text-center font-black text-transparent bg-clip-text pb-4 gradiasi-btn-merah`}
            >
              {title}
            </h2>
            <div className="flex items-end gap-2 mb-6">
              <p className="font-semibold lg:text-4xl text-3xl">{price[0]}</p>
              <span className={`line-through text-red-800`}>{price[1]}</span>
            </div>
            <p className="lg:text-lg lg:mb-0 mb-4 lg:text-left text-center text-balance w-full">
              {desc}
            </p>
            <Link
              href="/menu"
              className={
                "gradiasi-btn-merah text-yellow-300 flex items-center gap-2 justify-center rounded-full shadow-xl lg:text-sm text-lg lg:w-full w-[90%] lg:py-2 py-6"
              }
            >
              <span>Beli Sekarang</span>
              <ShoppingCart size={18} />
            </Link>
          </div>
          <div
            key="item-2"
            className="lg:h-[80%] h-fit lg:w-[30%] w-full lg:py-0 py-8 lg:order-2 order-1"
          >
            <MenuImage images={img} />
          </div>
          <div
            key="item-3"
            className={`px-4 pb-12 flex flex-col lg:h-[75%] h-full lg:w-[30%] lg:py-0 py-12 w-full lg:order-3 order-3 ${
              pedas ? "lg:justify-between" : "lg:justify-end"
            }`}
          >
            {isDekstop ? (
              <Recomendation recommendation={recommendation} />
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

function Recomendation({ recommendation }) {
  const isDekstop = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      {recommendation ? (
        <Magnet
          padding={70}
          disabled={false}
          magnetStrength={4}
          wrapperClassName={`${
            isDekstop
              ? "relative"
              : "absolute -top-10 right-0 z-10 rotate-12 bg-green-300"
          }`}
        >
          <div className="flex gap-2 items-center bg-gradient-to-br from-yellow-400 to-orange-500 text-white w-fit lg:h-8 h-6 lg:pr-4 pr-0 rounded-full mt-12">
            <div className="w-12 h-12 lg:p-0 p-1 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center border-4 border-neutral-100 rounded-full -ml-2">
              <ThumbsUp />
            </div>
            {isDekstop ? (
              <p className="text-sm font-bold font-quicksand">Rekomendasi</p>
            ) : (
              <></>
            )}
          </div>
        </Magnet>
      ) : (
        <></>
      )}
    </>
  );
}
