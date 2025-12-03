"use client";
import Link from "next/link";
import React from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

interface NavbarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navigation = [{ name: "About us", href: "/" }];

const Navbar = ({ open, onOpenChange }: NavbarProps) => {
  const drawerTransformClass = open ? "translate-x-0" : "translate-x-full";
  return (
    <>
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
            <span className="sr-only">Luminwell Company</span>
            <Image
              alt="Luminwell Logo"
              src="/new_logo.png"
              className="h-15 w-auto dark:hidden"
            />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Luminwell
            </span>
           
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => onOpenChange(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200">
            <span className="sr-only">Open main menu</span>
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* --- DESKTOP LINKS & LOGIN --- */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-8">
          {/* "About us" Text Link */}
          {/* Maps over the single item in the navigation array */}
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">
              {item.name}
            </Link>
          ))}
          {/* "Login" Button */}
          <Link
            href="/sign-in"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors block">
            Login
          </Link>
        </div>
      </nav>
      {open && (
        <div className="lg:hidden">
          {/* 1. DrawerOverlay (Scratch Backdrop) */}
          <div
            className="fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm transition-opacity duration-300 ease-out"
            onClick={() => onOpenChange(false)}
          />

          {/* 2. Drawer Content (Scratch Panel) */}
          <div
            className={`fixed inset-y-0 right-0 z-50 w-full overflow-y-auto 
                       bg-white p-6 
                       sm:max-w-sm 
                       sm:ring-1 sm:ring-gray-900/10 
                       dark:bg-gray-900 
                       dark:sm:ring-gray-100/10 
                       shadow-xl 
                       transform transition-transform duration-500 ease-out 
                       ${drawerTransformClass}`}>
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between">
              <Link
                href="#"
                className="-m-1.5 p-1.5 flex items-center space-x-2">
                <Image
                  alt="Luminwell Logo"
                  src="/new_logo.png"
                  className="h-15 w-auto dark:hidden"
                />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  Luminwell
                </span>
                {/* <img
                  alt="Luminwell Logo Dark"
                  src="https://placehold.co/32x32/4f46e5/ffffff?text=L"
                  className="h-8 w-auto not-dark:hidden"
                /> */}
              </Link>
              {/* Close Button - calls onOpenChange(false) */}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Mobile Links Container */}
            <div className="mt-6 flow-root">
              <div className="divide-y divide-gray-500/10 dark:divide-white/10">
                {/* Main Links (now only "About us") */}
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => onOpenChange(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-blue-50 dark:text-white dark:hover:bg-white/5 transition">
                      {item.name}
                    </a>
                  ))}
                </div>

                {/* Mobile Login Link */}
                <div className="py-6">
                  <Link
                    href="/sign-in"
                    onClick={() => onOpenChange(false)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-blue-50 dark:text-white dark:hover:bg-white/5 transition">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
