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

import { NavbarUserMenu } from "./navbarUserMenu";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

interface NavbarProps {
  children?: ReactNode;
  className?: string;
  footer?: boolean;
}

function NavLinks() {
  return (
    <>
      <Link href="/#about" className="text-foreground/60 hover:text-primary">
        About Us
      </Link>
      <Link
        href="/#workshops"
        className="text-foreground/60 hover:text-primary"
      >
        Our workshops
      </Link>
      <Link
        href="/authentication?page=login"
        className="text-foreground/60 hover:text-primary"
      >
        Sign in
      </Link>
    </>
  );
}

export default function Navbar({ children, className, footer }: NavbarProps) {
  const { firebaseUser } = useFirebaseAuth();

  return (
    <div className={`flex flex-col h-screen`}>
      <header className="fixed top-0 w-full flex justify-between px-8 py-4 z-50 bg-background/80 backdrop-blur-lg border-b">
        <Logo />
        <div className="hidden sm:flex flex-row gap-4 md:gap-8 items-center">
          <NavLinks />
          {firebaseUser ? (
            <NavbarUserMenu firebaserUser={firebaseUser} />
          ) : (
            <Button asChild>
              <Link href="/authentication?page=signup">Try now!</Link>
            </Button>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetTitle className="mb-4">Menu</SheetTitle>
            <nav className="flex flex-col gap-4">
              <NavLinks />

              <Button asChild>
                <Link
                  target="_blank"
                  href="https://forms.gle/9cAKaWxixZu7WHP5A"
                >
                  Join Waitlist
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      <main className={`z-0 flex-grow ${className}`}>{children}</main>
      {footer && <Footer />}
    </div>
  );
}
