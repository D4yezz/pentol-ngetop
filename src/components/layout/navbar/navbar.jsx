import {
  ChefHat,
  CircleUserRound,
  LayoutGrid,
  Phone,
  ShoppingCart,
  Store,
} from "lucide-react";
import Link from "next/link";

const navigasi = [
  {
    id: 1,
    text: "Beranda",
    href: "/",
    icon: <LayoutGrid size={20} />,
  },
  {
    id: 2,
    text: "Tentang Kami",
    href: "/",
    icon: <ChefHat size={20} />,
  },
  {
    id: 3,
    text: "Produk",
    href: "/",
    icon: <Store size={20} />,
  },
  {
    id: 4,
    text: "Kontak",
    href: "/",
    icon: <Phone size={20} />,
  },
];

export default function Navbar() {
  return (
    <>
      <header className="flex gap-8 justify-between items-center w-[90vw]  h-fit mx-auto  rounded-full font-quicksand">
        <Link
          href="/"
          className="flex rounded-b-full w-fit gradiasi-btn-merah p-1 pt-4 "
        >
          <img src="/logos.png" alt="" className="w-14 object-center" />
        </Link>
        <div className="flex items-center bg-red-800 rounded-full mt-4">
          <nav className="w-[650px] h-fit pl-3 pr-6">
            <ul className="flex justify-between w-full h-full items-center py-2">
              {navigasi.map((item) => (
                <li
                  key={item.id}
                  className="group flex items-center px-2 py-2 rounded-full hover:scale-105 duration-300 ease-in-out text-yellow-300 hover:bg-yellow-300 hover:text-red-800 h-full"
                >
                  <Link href={item.href} className="flex gap-2 items-center text-[1rem] font-semibold ">
                    <span className="group-hover:-rotate-6">{item.icon}</span>{" "}
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex justify-around items-center gap-2 px-2 font-semibold rounded-full h-14 w-fit bg-yellow-300  ">
            <Link
              href={"/"}
              className="gradiasi-btn-merah text-yellow-300 p-2 rounded-full"
            >
              <ShoppingCart size={24} />
            </Link>
            <Link
              href={"/"}
              className="gradiasi-btn-merah text-yellow-300 p-2 rounded-full"
            >
              <CircleUserRound size={24} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
