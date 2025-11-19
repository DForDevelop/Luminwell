import React, { Suspense } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Separator } from "@radix-ui/react-separator";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-16 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <main className="flex flex-col h-screen min-h-screen overflow-x-hidden">
            {children}
          </main>
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
