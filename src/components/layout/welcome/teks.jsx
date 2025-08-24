import TextType from "@/components/ReactBites/TextType";
import { Button } from "@/components/ui/button";
import BtnGeserAtas from "@/components/uiVerse/btnGeserAtas";
import ButtonMengkilap from "@/components/uiVerse/btnMengkilap";
import { Link2, Phone, Send, ShoppingBasket } from "lucide-react";
import Link from "next/link";

export default function TeksWelcome() {
  return (
    <>
      <section className="flex flex-col gap-6 w-1/2 h-full justify-center">
        <h1 className="font-semibold text-red-800 flex flex-col font-poppins">
          <Link href={"/"} className="group flex items-center gap-1 w-fit">
            <p>Pentol Ngetop,</p>
            <Link2
              size={28}
              className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 duration-200 ease-in-out"
            />
          </Link>
          Pedasnya nendang,
          <br /> hangatnya bikin kenyang.
        </h1>
        <TextType
          text={[
            "Website Pemesanan Pentol Pedas terpercaya",
            "Pedas, enak, dan bikin nagih!",
          ]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="text-xl font-medium text-orange-700 mb-6 font-poppins"
        />
        <div className="flex gap-4">
          <ButtonMengkilap
            text={"Beli Pentol"}
            icon={<ShoppingBasket size={18} />}
            textColor={"yellow-300"}
            ring={"red-800"}
            className={
              "gradiasi-btn-merah rounded-full font-semibold w-44 py-3"
            }
          />
          <BtnGeserAtas
            text={"Hubungi Kami"}
            styleText={"gradiasi-btn-merah text-yellow-300 font-semibold"}
            iconAtas={<Phone size={18} />}
            iconBawah={<Send size={18} />}
            textPopup={"0812-xxxx-xxxx"}
            stylePopup={
              "text-xs bg-yellow-300 text-red-800 px-2 py-2 rounded-full"
            }
          />
        </div>
      </section>
    </>
  );
}
