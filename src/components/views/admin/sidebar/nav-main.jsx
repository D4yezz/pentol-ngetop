"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({ items }) {
  const pathname = usePathname();
  return (
    <>
      {items.map((all, index) => (
        <SidebarGroup key={index}>
          <SidebarGroupLabel className={"text-yellow-300"}>
            {all.label}
          </SidebarGroupLabel>
          <SidebarMenu>
            {all.data?.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`text-md ${
                        item.url === pathname ? "border border-yellow-300" : ""
                      }`}
                    >
                      {item.icon && <item.icon className="scale-110" />}
                      {item.subItem ? (
                        <span>{item.title}</span>
                      ) : (
                        <Link href={item.url} className="w-full">
                          {item.title}
                        </Link>
                      )}
                      <ChevronRight
                        className={`ml-auto transition-transform duration-200 ${
                          item.subItem
                            ? "group-data-[state=open]/collapsible:rotate-90"
                            : ""
                        }`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.subItem && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.data?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className="hover:bg-yellow-300 text-yellow-300 hover:text-red-800"
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
