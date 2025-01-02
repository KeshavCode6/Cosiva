"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image";
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react'; // Chevron icon
import logo from "../../public/logo.svg"

function Navbar({ children, className }: { children?: React.ReactNode, className?:string}) {
  return (
    <div className={`flex flex-col h-screen`}>
      <header className="fixed top-0 w-full flex justify-between px-4 sm:px-16 py-4 z-50 bg-background/80 backdrop-blur-lg border-b">
        <Link href="/" className='font-bold text-xl sm:text-2xl flex items-center'>
          <Image  src={logo} alt="NSACC Logo" width={30} height={30}  className='pointer-events-none'/>
          <p>osiva</p>
        </Link>
        <div className='hidden sm:flex flex-row gap-4 md:gap-8 items-center'>
          <Link href="/#about" className="text-foreground/60 hover:text-orange-400 transition-all">About Us</Link>
          <Link href="/#programs" className="text-foreground/60 hover:text-orange-400 transition-all">Our Programs</Link>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/#about" className="text-foreground/60 hover:text-foreground">About Us</Link>
              <Link href="/#programs" className="text-foreground/60 hover:text-foreground">Our Programs</Link>
              <Link href="/editor" className="text-foreground/60 hover:text-foreground">Editor</Link>

              <Button asChild>
                <Link target='_blank' href="https://forms.gle/9cAKaWxixZu7WHP5A">Join Waitlist</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      <main className={`z-0 flex-grow ${className}`}>
        {children}
      </main>
    </div>
  );
}

export default Navbar;
