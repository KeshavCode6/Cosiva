"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react';
import Footer from './footer';
import Logo from './logo';

function Navbar({ children, className, footer }: { children?: React.ReactNode, className?: string, footer?: boolean }) {
  return (
    <div className={`flex flex-col h-screen`}>
      <header className="fixed top-0 w-full flex justify-between px-4 sm:px-16 py-4 z-50 bg-background/80 backdrop-blur-lg border-b">
        <Logo />
        <div className='hidden sm:flex flex-row gap-4 md:gap-8 items-center'>
          <Link href="/#about" className="text-foreground/60 hover:text-orange-400 transition-all">About us</Link>
          <Link href="/#workshops" className="text-foreground/60 hover:text-foreground">Our Workshops</Link>
          <Link href="/editor" className="text-foreground/60 hover:text-foreground">Editor</Link>
        </div>

        <Sheet >
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetTitle className='mb-4'>Menu</SheetTitle> 
            <nav className="flex flex-col gap-4">
              <Link href="/#about" className="text-foreground/60 hover:text-foreground">About Us</Link>
              <Link href="/#workshops" className="text-foreground/60 hover:text-foreground">Our Workshops</Link>
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
      {footer && (<Footer />)}
    </div>
  );
}

export default Navbar;
