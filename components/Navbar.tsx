"use client";

import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  return (
    <nav className="p-4 w-screen md:p-6 shadow-md max-w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a className="text-xl font-bold mb-4 md:mb-0" href="/">
          Luminwell
        </a>
        {session ? (
          <>
            <span>Hi, {user.username || user.email}</span>
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
