import axios from "axios";
import { v4 } from "uuid";
import { apiHost } from "./Constants";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function uuid() {
  return v4().substring(0, 8);
}

export const apiInstance = axios.create({
  baseURL: apiHost,
  maxRedirects: 1,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    (data, headers) => {
      const token = JSON.parse(localStorage.getItem("user") || "{}").token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return data;
    },
  ],
});
