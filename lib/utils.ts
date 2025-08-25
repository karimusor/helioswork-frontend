import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function formatCHF(value: number) {
  return new Intl.NumberFormat("fr-CH", { style: "currency", currency: "CHF" }).format(value);
}