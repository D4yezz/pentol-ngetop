import { ChefHat, LayoutGrid, Phone, Store } from "lucide-react";

export const navigasi = [
  {
    id: 1,
    text: "Beranda",
    href: "/",
    icon: <LayoutGrid size={20} />,
  },
  {
    id: 2,
    text: "Tentang Kami",
    href: "/#tentang-kami",
    icon: <ChefHat size={20} />,
  },
  {
    id: 3,
    text: "Menu",
    href: "/menu",
    icon: <Store size={20} />,
  },
  {
    id: 4,
    text: "Kontak",
    href: "/#kontak",
    icon: <Phone size={20} />,
  },
];

export default navigasi;
