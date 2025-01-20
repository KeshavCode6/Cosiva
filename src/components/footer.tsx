import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Facebook, Instagram, Mail, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer>
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Logo />
          <ul className="flex flex-wrap items-center gap-4 my-4 md:my-0">
            <li>
              <Link
                href="/#about"
                className="text-foreground/60 hover:text-foreground"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/#programs"
                className="text-foreground/60 hover:text-foreground"
              >
                Our Programs
              </Link>
            </li>
            <li>
              <Link
                href="/editor"
                className="text-foreground/60 hover:text-foreground"
              >
                Editor
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto" />
        <div className="flex items-center justify-between">
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            2024 Cosiva
          </span>
          <div className="flex mt-4 sm:mt-0 space-x-2 justify-center sm:justify-start">
            <Button variant="outline" size="icon" asChild>
              <Link href="mailto:contact@cosiva.org" aria-label="Instagram">
                <Mail className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link
                href="https://www.youtube.com/@cosivanonprofit"
                aria-label="Twitter"
                target="_blank"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </Button>
            {/* <Button variant="outline" size="icon" asChild>
              <Link
                href="https://www.facebook.com/cosivanonprofit"
                aria-label="Facebook"
                target="_blank"
              >
                <Facebook className="h-4 w-4" />
              </Link>
            </Button> */}
            <Button variant="outline" size="icon" asChild>
              <Link
                href="https://www.instagram.com/cosivanonprofit"
                aria-label="Instagram"
                target="_blank"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
