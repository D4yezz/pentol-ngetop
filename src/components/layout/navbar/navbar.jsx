"use client";
import ButtonShine from "@/components/uiVerse/btnShine";
import supabase from "@/lib/db";
import {
  LayoutPanelLeft,
  Loader,
  Loader2,
  LogIn,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "../logo/logo";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getProfileUser, logout } from "@/service/auth.service";
import { toast } from "sonner";
import navigasi from "./navigasi";
import Profile, { menuProfile } from "./profile";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState(null);
  const [IsLoading, SetIsLoading] = useState(true);
  const [Open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    userId: "",
    name: "",
    email: "",
    avatar: "",
    role: "",
  });
  useEffect(() => {
    if (Open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [Open]);

  const checkUserLogin = async () => {
    try {
      const user = await getProfileUser();
      if (user.status && user.data) {
        setUserData({
          userId: user.data.profile.id,
          name: user.data.profile.username,
          email: user.data.auth.email,
          avatar: user.data.profile.picture,
          role: user.data.profile.role,
        });
      }

      if (user.status && user.data) {
        setIsLogin(true);
        setRole(userData.role);
      } else {
        setIsLogin(false);
        setRole(null);
      }
    } catch (error) {
      console.error("Error checking user login:", error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      await checkUserLogin();
      SetIsLoading(false);
    };

    getUser();
  }, []);

  const router = useRouter();
  const handleLogout = async () => {
    SetIsLoading(true);
    const res = await logout();

    if (!res.status) {
      toast.error("Gagal untuk Keluar");
      SetIsLoading(false);
      return;
    }

    toast.success("Berhasil Keluar");
    SetIsLoading(false);
    window.location.href = "/auth/login";
  };

  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <header className="flex justify-between items-center w-full h-fit lg:px-16 px-6 mx-auto font-urbanist overflow-x-hidden z-20">
      <Logo />
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="flex items-center bg-red-800 shadow-[0px_6px_10px] shadow-yellow-300/20 rounded-full mt-4 lg:visible invisible z-50 fixed right-10 top-0 w-fit h-14"
      >
        <nav className="w-[650px] h-fit pl-3 pr-6">
          <ul className="flex justify-between w-full h-full items-center py-2">
            {navigasi.map((item) => (
              <li
                key={item.id}
                className="group flex items-center px-4 py-2 rounded-full cursor-pointer hover:scale-105 duration-300 ease-in-out text-yellow-300 hover:bg-yellow-300 hover:text-red-800 h-full"
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
        {IsLoading ? (
          <div className="w-fit h-full rounded-full gradiasi-btn-merah px-4 border-4 border-yellow-300 flex items-center text-yellow-300">
            <Loader2 className="animate-spin" size={20} />
          </div>
        ) : isLogin ? (
          userData.role === "admin" ? (
            <Link
              href={"/admin/dashboard"}
              className="gradiasi-btn-merah text-yellow-300 font-semibold py-2 px-4 rounded-full flex items-center gap-2 h-full border-4 border-yellow-300"
            >
              <LayoutPanelLeft size={20} />
              Dashboard
            </Link>
          ) : (
            <Profile />
          )
        ) : (
          <Link
            href={"/auth/login"}
            className="h-full border-4 border-yellow-300 rounded-full flex items-stretch font-semibold"
          >
            <ButtonShine />
          </Link>
        )}
      </motion.div>

      {/* Navbar Mobile */}
      <motion.button
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className={`fixed right-0 top-0 lg:hidden flex justify-end items-start text-red-800 cursor-pointer z-20 bg-yellow-300 rounded-bl-full pt-2 pr-2 w-16 h-16 shadow-md ${
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
              onClick={() => setOpen(!Open)}
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
              <div className="flex gap-2 justify-start items-center py-4 border-b-2 border-red-800 mb-2 mx-4 font-instrument">
                {isLogin ? (
                  <>
                    <Avatar className={"w-12 h-12 border-4 border-red-800"}>
                      <AvatarImage src={userData.avatar} alt="Pentol Ngetop" />
                      <AvatarFallback className="bg-yellow-300 font-bold text-red-800">
                        {userData.name.split(" ")[0][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h3 className="text-xl text-red-800 font-semibold">
                        {userData.name}
                      </h3>
                      <p className="text-md">{userData.email}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <Avatar className={"w-12 h-12 border-4 border-red-800"}>
                      <AvatarImage src="/logos.png" alt="Pentol Ngetop" />
                      <AvatarFallback>PN</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl text-red-800 font-semibold">
                      Pentol Ngetop
                    </h3>
                  </>
                )}
              </div>
              <div className="flex flex-col px-4 py-6 h-[80dvh] justify-between">
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
                  {isLogin && userData.role === "user" && (
                    <>
                      <DropdownMenuSeparator />
                      {menuProfile.map((item) => (
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
                      {/* <li>
                        <Link
                          href="/order"
                          className={`flex gap-2 items-center text-red-800 font-semibold p-2 rounded hover:outline-2 outline-red-800 ${
                            window.location.pathname === "/order"
                              ? " outline-2 outline-red-800"
                              : ""
                          }`}
                          onClick={() => setOpen(false)}
                        >
                          <ShoppingBasket size={20} /> Pesanan Saya
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/profile/edit"
                          className={`flex gap-2 items-center text-red-800 font-semibold p-2 rounded hover:outline-2 outline-red-800 ${
                            window.location.pathname === "/profile/edit"
                              ? " outline-2 outline-red-800"
                              : ""
                          }`}
                          onClick={() => setOpen(false)}
                        >
                          <UserPen size={20} /> Edit Profil
                        </Link>
                      </li> */}
                    </>
                  )}
                </ul>
                <div className="mt-4 flex gap-2 items-center justify-center">
                  {isLogin ? (
                    role != "admin" ? (
                      <Link
                        href={"/admin/dashboard"}
                        className="flex gap-2 items-center justify-center gradiasi-btn-merah text-yellow-300 font-semibold w-full px-4 py-2 rounded-full"
                      >
                        <LayoutPanelLeft size={20} />
                        Dashboard
                      </Link>
                    ) : (
                      <>
                        <Button
                          className="flex gap-2 items-center justify-center gradiasi-btn-merah text-yellow-300 font-semibold w-full h-full py-2 rounded-full"
                          onClick={handleLogout}
                        >
                          {IsLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <>
                              <LogOut size={18} />
                              Logout
                            </>
                          )}
                        </Button>
                      </>
                    )
                  ) : (
                    <Link
                      href="/auth/login"
                      className="flex gap-2 items-center justify-center gradiasi-btn-merah text-yellow-300 w-full px-4 py-2 rounded-xl"
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
