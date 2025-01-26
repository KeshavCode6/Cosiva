"use client";

import Link from "next/link";
import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Facebook, Instagram, Mail, Menu, Youtube } from "lucide-react";
import Footer from "./footer";
import Logo from "./logo";

interface NavbarProps {
  children?: ReactNode;
  className?: string;
  footer?: boolean;
  protectedRoute?: boolean;
}

function NavbarLinks({ className }: { className: string }) {
  const links = [
    {
      href: "/#about",
      label: "About us",
    },
    {
      href: "/#whyus",
      label: "Why us",
    },
    {
      href: "/#faqs",
      label: "FAQs",
    },
  ];

  return (
    <div className={`gap-4 md:gap-8 ${className}`}>
      {links.map((link, index) => (
        <Link
          href={link.href}
          key={index}
          className="text-foreground/60 hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="text-white  transition-colors">
            Contact
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
          <DropdownMenuItem asChild>
            <Link href="mailto:contact@cosiva.org" aria-label="Instagram">
              <Mail className="h-4 w-4" />
              Email
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="https://www.youtube.com/@cosivanonprofit"
              aria-label="Twitter"
              target="_blank"
            >
              <Youtube className="h-4 w-4" />
              Youtube
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="https://www.instagram.com/cosivanonprofit"
              aria-label="Instagram"
              target="_blank"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="https://www.instagram.com/cosivanonprofit"
              aria-label="Instagram"
              target="_blank"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function Navbar({ children, className, footer }: NavbarProps) {
  return (
    <div className={`flex flex-col h-screen`}>
      <header className="fixed top-0 w-full flex justify-between px-8 py-4 z-50 bg-background/80 backdrop-blur-lg border-b">
        <Logo />
        <NavbarLinks className=" hidden sm:flex  flex-row  items-center" />


        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetTitle className="mb-4">Navigation</SheetTitle>
            <NavbarLinks className="flex flex-col" />
          </SheetContent>
        </Sheet>
      </header >

      <main className={`z-0 flex-grow ${className}`}>{children}</main>
      {footer && <Footer />}
    </div >
  );
}
