"use client"

import Link from 'next/link';
import React, { ReactNode } from 'react'
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { LogOutIcon, Menu } from 'lucide-react';
import Footer from './footer';
import Logo from './logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from './ui/dropdown-menu';

interface NavbarProps { children?: ReactNode, className?: string, footer?: boolean }

export default function Navbar({ children, className, footer }: NavbarProps) {
  return (
    <div className={`flex flex-col h-screen`}>
      <header className="fixed top-0 w-full flex justify-between px-8 py-4 z-50 bg-background/80 backdrop-blur-lg border-b">

        <Logo />

        <div className='hidden sm:flex flex-row gap-4 md:gap-8 items-center'>

          <Link href="/#about" className="text-foreground/60 hover:text-orange-400 transition-all">About us</Link>
          <Link href="/#workshops" className="text-foreground/60 hover:text-foreground">Our workshops</Link>
          <Link href="/learn" className="text-foreground/60 hover:text-foreground">Learn</Link>

          <NavbarUserDropdownMenu/>

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
              <Link href="/#workshops" className="text-foreground/60 hover:text-foreground">Our workshops</Link>
              <Link href="/learn" className="text-foreground/60 hover:text-foreground">Learn</Link>

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

function NavbarUserDropdownMenu() {

  return (
    <DropdownMenu>

      <DropdownMenuTrigger>
        {/* Replace with user avatar */}
        <div className='border border-input rounded-full aspect-square h-10'></div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>

        <DropdownMenuLabel>
          My Account
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>

          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>

        </DropdownMenuGroup>

        <DropdownMenuSeparator/>

        <DropdownMenuGroup>

          <DropdownMenuItem className='text-destructive'>
            <LogOutIcon/>
            Sign out
          </DropdownMenuItem>

        </DropdownMenuGroup>

      </DropdownMenuContent>

    </DropdownMenu>
  )

}