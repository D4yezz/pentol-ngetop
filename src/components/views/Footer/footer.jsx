import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import WaveComponent from "@/components/layout/FooterChild/svgFooter";
import { Mail, MapPin, Phone } from "lucide-react";
import BottomFooter from "@/components/layout/FooterChild/bottomFooter";

const menu = [
  {
    menuCepat: [
      { id: 1, title: "Beranda", href: "/" },
      { id: 2, title: "Tentang Kami", href: "/" },
      { id: 3, title: "Menu", href: "/" },
      { id: 4, title: "Kontak", href: "/" },
      { id: 5, title: "Pengaturan Akun", href: "/" },
    ],
    lokasi: [
      { id: 1, title: "+62896xxxxxx", href: "/", icon: <Phone size={18} /> },
      {
        id: 2,
        title: "pentolngetop@mail.com",
        href: "/",
        icon: <Mail size={18} />,
      },
      {
        id: 3,
        title: "JL. Jendral Bimantara No. 1",
        href: "/",
        icon: <MapPin size={18} />,
      },
    ],
  },
];

export default function Footer() {
  return (
    <>
      <footer className="flex flex-col gradiasi-btn-merah w-full h-fit px-16 pb-8 text-white font-quicksand relative overflow-hidden">
        <WaveComponent />
        <div className="flex w-full h-fit">
          <div className="w-[60%] h-fit flex flex-col gap-4 mt-28">
            <div className="flex items-center gap-2">
              <Avatar className={"w-12 h-12"}>
                <AvatarImage src="/logos.png" />
                <AvatarFallback>
                  <img src="/ilang.jpg" alt="" />
                </AvatarFallback>
              </Avatar>
              <p className="text-xl font-medium font-poppins">
                Pentol <span className="text-yellow-300">Ngetop</span>
              </p>
            </div>
            <p className="text-balance font-semibold w-[80%]">
              Pentol Ngetop - Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Animi ab commodi magnam.
            </p>
            <div className="w-fit h-fit py-4 flex gap-4 [&>*]:bg-yellow-300 [&>*]:px-1.5 [&>*]:py-1 [&>*]:rounded-full [&>*]:text-[1.4rem] [&>*]:text-red-800 [&>*]:hover:bg-yellow-400 [&>*]:duration-300 [&>*]:ease-in-out">
              <a href="/">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a href="/">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="/">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          </div>
          <div className="w-[40%] flex items-start justify-between font-quicksand mt-32 pr-4">
            <div className="flex flex-col gap-3">
              <h5 className="text-xl font-bold text-yellow-300">Menu Cepat</h5>
              <ul className="flex flex-col gap-2 [&>*]:hover:text-yellow-300 [&>*]:text-[0.95rem]">
                {menu[0].menuCepat.map((item) => (
                  <li key={item.id}>
                    <a href={item.href}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="text-xl font-bold text-yellow-300">
                Hubungi Kami
              </h5>
              <ul className="flex flex-col gap-4">
                {menu[0].lokasi.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 hover:text-yellow-300 text-[0.95rem]"
                  >
                    <span
                      size={18}
                      className="bg-yellow-300 p-1.5 rounded-full text-red-800"
                    >
                      {item.icon}
                    </span>

                    <a href={item.href}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <BottomFooter/>
      </footer>
    </>
  );
}
