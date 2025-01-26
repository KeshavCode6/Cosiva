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

import { Menu } from "lucide-react";
import Footer from "./footer";
import Logo from "./logo";

interface NavbarProps {
  children?: ReactNode;
  className?: string;
  footer?: boolean;
  protectedRoute?: boolean;
}

export function NavbarLinks({ className, register = true }: { className?: string, register?: boolean }) {
  const links = [
    {
      href: "/#about",
      label: "About",
    },
    {
      href: "/#whyus",
      label: "Why Us",
    },
    {
      href: "/#faqs",
      label: "FAQs",
    },
    {
      href: "/#footer",
      label: "Contact",
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

      {register && (
        <Button asChild>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSemQ9RaKmBG_Sa4_cuZHoLmFWtGILqaOeqvJIx5IYCtO-hfLg/viewform?usp=dialog" target="_blank">
            Register Now!
          </Link>
        </Button>
      )}
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
