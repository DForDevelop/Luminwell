import React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  CalendarClock,
  ClipboardClock,
  CreditCard,
  MessagesSquare,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

interface NavMainProps {
  title: string;
  urlSegment: string;
  icon: React.ElementType;
}

const userNavigation: NavMainProps[] = [
  {
    title: "Appointments",
    urlSegment: "appointments",
    icon: ClipboardClock,
  },
  {
    title: "Conversations",
    urlSegment: "conversations",
    icon: MessagesSquare,
  },
  {
    title: "Transactions",
    urlSegment: "transactions",
    icon: CreditCard,
  },
];

const ambassadorNavigation: NavMainProps[] = [
  {
    title: "Schedule",
    urlSegment: "scheduler",
    icon: CalendarClock,
  },
  {
    title: "Conversations",
    urlSegment: "conversations",
    icon: MessagesSquare,
  },
];

const NavMain = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?._id;
  const userRole = session?.user?.role;

  let navigationData: NavMainProps[] = [];
  let baseUrl = "";

  if (userRole === "ambassador") {
    navigationData = ambassadorNavigation;
    baseUrl = `/ambassador/${userId}/`;
  } else {
    navigationData = userNavigation;
    baseUrl = `/user/${userId}/`;
  }

  if (status === "loading" && !session) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel className="px-4 py-2">
          <Skeleton className="h-4 w-1/2 mb-3" />
        </SidebarGroupLabel>
        <SidebarGroupContent className="space-y-2 pt-2">
          <SidebarMenu>
            <Skeleton className="h-8 w-full" />
          </SidebarMenu>
          <SidebarMenu>
            <Skeleton className="h-8 w-full" />
          </SidebarMenu>
          <SidebarMenu>
            <Skeleton className="h-8 w-full" />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    ); // or a loading spinner
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navigationData.map((item) => {
            const fullUrl = `${baseUrl}${item.urlSegment}`;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} asChild>
                  <Link href={fullUrl}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavMain;
