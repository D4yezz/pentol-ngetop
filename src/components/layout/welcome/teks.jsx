import TextType from "@/components/ReactBites/TextType";
import BtnGeserAtas from "@/components/uiVerse/btnGeserAtas";
import ButtonMengkilap from "@/components/uiVerse/btnMengkilap";
import { Link2, Phone, Send, ShoppingBasket } from "lucide-react";
import Link from "next/link";

export default function TeksWelcome() {
  return (
    <>
      <section className="flex flex-col w-[55%] h-full justify-center ">
        <h1 className="w-full font-semibold gradiasi-btn-merah text-transparent bg-clip-text flex flex-col font-poppins text-5xl pb-12">
          <Link
            href={"/"}
            className="group flex items-center gap-1 w-fit h-fit hover:text-red-600"
          >
            <p className="text-[3.4rem] pb-2">Pentol Ngetop,</p>
            <Link2
              size={28}
              className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 duration-200 ease-in-out"
            />
          </Link>
          Pedasnya Nendang,
          <span className="">Hangatnya Bikin<br />Kenyang.</span>
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
          className="text-2xl font-medium text-orange-600 mb-6 font-poppins"
        />
        <div className="flex gap-4">
          <ButtonMengkilap
            text={"Beli Pentol"}
            icon={<ShoppingBasket size={20} />}
            textColor={"yellow-300"}
            className={
              "text-[1rem] gradiasi-btn-merah rounded-full font-semibold w-44 py-3 hover:ring-2 hover:ring-red-800 hover:ring-offset-2"
            }
          />
          <BtnGeserAtas
            text={"Hubungi Kami"}
            styleText={"gradiasi-btn-merah text-yellow-300 font-semibold text-[1rem]"}
            iconAtas={<Phone size={20} />}
            iconBawah={<Send size={20} />}
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
