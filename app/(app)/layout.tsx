import React from "react";
import Navbar from "@/components/Navbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
