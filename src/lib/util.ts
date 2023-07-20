import { v4 } from "uuid";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function uuid() {
  return v4().substring(0, 8);
}
