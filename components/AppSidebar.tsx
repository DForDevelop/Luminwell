"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "./ui/sidebar";
import NavUser from "./NavUser";
import { useSession } from "next-auth/react";
import NavMain from "./NavMain";
import Image from "next/image";

const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  const { data: session } = useSession();

  const userData = {
    username: session?.user?.username || "User",
    email: session?.user?.email || "no-email@example.com",
    avatar: session?.user?.avatar || "/assets/default-profile.png",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <div className=" flex aspect-square size-8 items-center justify-center rounded-lg">
            <Image
              src="/file.svg"
              alt="logo"
              width={30}
              height={30}
              
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Luminwell</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser {...userData} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
