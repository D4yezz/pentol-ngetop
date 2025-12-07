import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronsRight,
  KeyRound,
  Loader2,
  LogOut,
  MessagesSquare,
  ShoppingBasket,
  UserPen,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProfileUser, logout } from "@/service/auth.service";
import ViewOrder from "../viewOrderUser/viewOrder";

export const menuProfile = [
  {
    id: 1,
    element: Link,
    text: "Edit Profil",
    href: "/profile/edit",
    icon: <UserPen size={20} />,
  },
  {
    id: 2,
    element: Link,
    text: "Ubah Password",
    href: "/profile/change-password",
    icon: <KeyRound size={20} />,
  },
  {
    id: 3,
    element: "button",
    text: "Pesanan Saya",
    href: "",
    icon: <ShoppingBasket size={20} />,
  },
  {
    id: 4,
    element: Link,
    text: "Kritik & Saran",
    href: "/kritik-saran",
    icon: <MessagesSquare size={20} />,
  },
];

export default function Profile() {
  const [Open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [IsLoading, SetIsLoading] = useState(false);
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

  useEffect(() => {
    const getUserData = async () => {
      const res = await getProfileUser();
      if (res.status && res.data) {
        setUserData({
          userId: res.data.profile.id,
          name: res.data.profile.username,
          email: res.data.auth.email,
          avatar: res.data.profile.picture,
          role: res.data.profile.role,
        });
      }
      SetIsLoading(false);
    };
    getUserData();
  }, []);

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
  return (
    <>
      <button
        onClick={() => setOpen(!Open)}
        className="flex items-center gap-2 w-fit h-full rounded-full gradiasi-btn-merah pl-2 border-4 border-yellow-300 cursor-pointer"
      >
        <ChevronLeft className="text-yellow-300" size={20} />
        <Avatar className={"h-12 w-12"}>
          <AvatarImage src={userData.avatar} />
          <AvatarFallback className="bg-yellow-300 font-bold text-red-800">
            {userData.name.split(" ")[0][0]}
          </AvatarFallback>
        </Avatar>
      </button>
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
              </div>
              <div className="flex flex-col px-4 py-6 h-[80dvh] justify-between">
                <ul className="flex flex-col gap-4">
                  {menuProfile.map((item) => (
                    <li key={item.id}>
                      <item.element
                        href={item.element === Link ? item.href : "#"}
                        className={`flex gap-2 items-center text-red-800 font-semibold p-2 rounded hover:outline-2 outline-red-800 bg-transparent w-full cursor-pointer ${
                          item.href === window.location.pathname
                            ? " outline-2 outline-red-800"
                            : ""
                        }`}
                        onClick={
                          item.element === Link
                            ? () => {
                                setOpen(false);
                              }
                            : () => {
                                setOpenModal(true);
                              }
                        }
                      >
                        {item.icon} {item.text}
                      </item.element>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-2 items-center justify-center">
                  <Button
                    className="flex gap-2 items-center justify-center gradiasi-btn-merah text-yellow-300 w-full h-full py-2 rounded-full"
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
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {openModal && (
          <>
            <motion.div
              onClick={() => setOpenModal(!openModal)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-transparent z-20"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`fixed top-0 right-0 h-full bg-neutral-100 lg:w-[55%] md:w-[55%] w-[60%] z-30 shadow-xl flex`}
            >
              <button
                className="gradiasi-btn-merah text-yellow-300 w-10 flex-shrink-0 flex flex-col justify-center items-center cursor-pointer"
                onClick={() => setOpenModal(false)}
              >
                <ChevronsRight size={24} />
              </button>
              <div className="flex-1 overflow-y-auto h-full">
                <ViewOrder />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
