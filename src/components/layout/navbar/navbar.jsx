import ButtonShine from "@/components/uiVerse/btnShine";
import supabase from "@/lib/db";
import {
  ChefHat,
  LayoutGrid,
  LogIn,
  Menu,
  Phone,
  Settings,
  Store,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    href: "/about",
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
    href: "/contact",
    icon: <Phone size={20} />,
  },
];

export default function Navbar() {
  const [IsLogin, SetIsLogin] = useState(false);
  const [IsLoading, SetIsLoading] = useState(true);
  const [Open, setOpen] = useState(false);
  useEffect(() => {
    if (Open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [Open]);


  // const checkUserLogin = async () => {
  //   try {
  //     const { data, error } = await supabase.auth.getUser();

  //     if (error || !data.id) {
  //       SetIsLogin(false);
  //       return null;
  //     }

  //     SetIsLogin(true);

  //     const { data: UserRole, error: ProfileError } = await supabase
  //       .from("profile_pengguna")
  //       .select("role")
  //       .eq("id", data.id)
  //       .single();

  //     if (ProfileError) throw error;

  //     return UserRole;
  //   } catch (error) {
  //     toast.error(
  //       error?.message || "Terjadi Kesealahan Saat Mendapatakan User"
  //     );
  //   }
  // };

  // useEffect(() => {
  //   const getUser = async () => {
  //     await checkUserLogin();

  //     SetIsLoading(false);
  //   };

  //   getUser();
  // }, []);

  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <header className="flex justify-between items-center w-full h-fit lg:px-16 px-6 mx-auto font-urbanist overflow-x-hidden z-20">
      <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -50 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="z-20 fixed top-0"
      >
        <Link
          href="/"
          className="flex rounded-b-full lg:w-fit lg:h-fit w-14 gradiasi-btn-merah p-1 pt-4"
        >
          <img
            src="/logos.png"
            alt=""
            className="lg:w-14 lg:h-14 w-12 h-12 object-center"
          />
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="flex items-center bg-red-800 shadow-[0px_6px_10px] shadow-yellow-300/20 rounded-full mt-4 lg:visible invisible z-50 fixed right-10 top-0 w-fit h-fit"
      >
        <nav className="w-[650px] h-fit pl-3 pr-6">
          <ul className="flex justify-between w-full h-full items-center py-2">
            {navigasi.map((item) => (
              <li
                key={item.id}
                className="group flex items-center px-2 py-2 rounded-full cursor-pointer hover:scale-105 duration-300 ease-in-out text-yellow-300 hover:bg-yellow-300 hover:text-red-800 h-full"
              >
                <Link
                  href={item.href}
                  className="flex gap-2 items-center text-[1rem] font-semibold "
                >
                  <span className="group-hover:-rotate-6">{item.icon}</span>{" "}
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex justify-around items-center gap-2 px-2 font-semibold rounded-full h-14 w-fit bg-yellow-300">
          {IsLogin ? (
            <Link
              href={"/"}
              className="gradiasi-btn-merah text-yellow-300 p-2 rounded-full"
            >
              <Settings size={24} />
              {/* <CircleUserRound size={24} /> */}
            </Link>
          ) : (
            <Link href={"/"}>
              <ButtonShine />
            </Link>
          )}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className={`fixed right-0 top-0 lg:hidden flex justify-end items-start text-red-800 cursor-pointer z-20 bg-yellow-300 border-[0px_0px_2px_2px] border-red-800 rounded-bl-full pt-2 pr-2 w-16 h-16 ${
          Open ? "invisible" : "visible"
        }`}
        onClick={() => setOpen(!Open)}
      >
        <Menu size={32} />
      </motion.button>

      <AnimatePresence>
        {Open && (
          <>
            <motion.div
              onClick={() => setOpen(Open)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-20"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`fixed top-0 bg-neutral-100/70 backdrop-blur-sm right-0 h-dvh lg:w-[20%] md:w-[40%] w-[60%] z-20 ${
                Open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex justify-end w-full">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ duration: 0.3, ease: "linear" }}
                  onClick={() => setOpen(!Open)}
                  className="flex justify-center items-center cursor-pointer text-red-800 px-4 py-3"
                >
                  <X />
                </motion.button>
              </div>
              <div className="flex justify-center items-center">
                <Avatar className={"w-18 h-18 border-4 border-red-800"}>
                  <AvatarImage src="/logos.png" alt="Pentol Ngetop" />
                  <AvatarFallback>PN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col px-4 py-6 h-[85dvh] justify-between">
                <ul className="flex flex-col gap-4">
                  {navigasi.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={`flex gap-2 items-center text-red-800 font-semibold p-2 rounded hover:outline-2 outline-red-800 ${
                          item.href === window.location.pathname
                            ? " outline-2 outline-red-800"
                            : ""
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {item.icon} {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-center">
                  {IsLogin ? (
                    <Link
                      href="/"
                      className="gradiasi-btn-merah text-yellow-300 p-2 rounded-full"
                      onClick={() => setOpen(false)}
                    >
                      <Settings size={24} />
                    </Link>
                  ) : (
                    <Link
                      href="/"
                      className="flex gap-2 items-center justify-center gradiasi-btn-merah text-yellow-300 w-full px-4 py-2 rounded-full"
                      onClick={() => setOpen(false)}
                    >
                      <LogIn size={18} />
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
