import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function countCharacterOccurrences(str:string, char:string) {
  return str.split(char).length - 1;
}