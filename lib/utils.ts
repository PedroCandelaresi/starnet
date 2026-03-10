import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeSiteUrl(value?: string) {
  try {
    return new URL(value ?? "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
}
