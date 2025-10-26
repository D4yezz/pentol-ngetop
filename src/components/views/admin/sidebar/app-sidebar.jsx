"use client";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutPanelLeftIcon,
  MessagesSquare,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { getProfileUser } from "@/service/auth.service";
import navigasi from "@/components/layout/navbar/navigasi";

const data = {
  navMain: [
    {
      label: "Beranda",
      data: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: LayoutPanelLeftIcon,
          isActive: true,
          subItem: false,
          items: [
            {
              title: "Penjualan",
              url: "/admin/dashboard",
            },
          ],
        },
        {
          title: "Pesanan",
          url: "/admin/order",
          icon: ShoppingCart,
          subItem: false,
          // items: [
          //   {
          //     title: "Genesis",
          //     url: "#",
          //   },
          //   {
          //     title: "Explorer",
          //     url: "#",
          //   },
          //   {
          //     title: "Quantum",
          //     url: "#",
          //   },
          // ],
        },
        {
          title: "Kritik & Saran",
          url: "/admin/kritik-saran",
          icon: MessagesSquare,
          subItem: false,
        },
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   subItem: true,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   subItem: true,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  navDua: [
    {
      label: "Manajemen Data",
      data: [
        {
          title: "Produk",
          url: "/admin/product",
          icon: Package2,
          isActive: true,
          subItem: false,
          items: [
            {
              title: "Penjualan",
              url: "/admin/dashboard",
            },
          ],
        },
        {
          title: "Pelanggan",
          url: "/admin/order",
          icon: Users,
          subItem: false,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const [userData, setUserData] = useState({
    userId: "",
    name: "",
    email: "",
    avatar: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    };

    getUserData();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navigasi} />
      </SidebarHeader>
      <SidebarContent className={"gradiasi-btn-merah text-white"}>
        <NavMain items={data.navMain} />
        <NavMain items={data.navDua} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
