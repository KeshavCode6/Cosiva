import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import sanjayBandaruImage from "@/../public/landing/team/sanjay-bandaru.png";
import shauryaKumarImage from "@/../public/landing/team/shaurya-kumar.png";
import keshavShahImage from "@/../public/landing/team/keshav-shah.png";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function countCharacterOccurrences(str:string, char:string) {
  return str.split(char).length - 1;
}


export const teamMembers = [
  {
    name: "Sanjay Bandaru",
    role: "Head of Marketing",
    image: sanjayBandaruImage,
    url: "https://github.com/SanjayVBandaru"
  },
  {
    name: "Keshav Shah",
    role: "Head of Operations",
    image: keshavShahImage,
    url: "https://keshav.pro"
  },
  {
    name: "Shaurya Kumar",
    role: "Head of Technology",
    image: shauryaKumarImage,
    url: "https://shaurya.pro"

  },
];