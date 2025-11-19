"use client"

import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
            <div className="md:order-1 flex flex-col items-center md:items-start mb-6 md:mb-0">
                <div className="flex items-center space-x-2 mb-4">
                    <Image
                      alt="Luminwell Logo"
                      src="/new_logo.png"
                      className="h-12 w-auto dark:hidden"
                    />
                    {/* <img
                      alt="Luminwell Logo Dark"
                      src="https://placehold.co/32x32/4f46e5/ffffff?text=L"
                      className="h-8 w-auto not-dark:hidden"
                    /> */}
                    <span className="text-xl font-bold text-white">Luminwell</span>
                </div>
                {/* Copyright */}
                <p className="text-center text-sm/6 leading-6 text-gray-400 md:text-left">
                    &copy; {new Date().getFullYear()} Luminwell Company. All rights reserved.
                </p>
            </div>

            {/* Social Media Icons (md:order-2) */}
            <div className="flex justify-center space-x-6 md:order-2">
                <Link href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                    <span className="sr-only">Facebook</span>
                    <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition">
                    <span className="sr-only">Instagram</span>
                    <Instagram className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition">
                    <span className="sr-only">Twitter</span>
                    <Twitter className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-700 dark:hover:text-blue-600 transition">
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-6 w-6" />
                </Link>
            </div>
        </div>
      </>
  )
}

export default Footer
