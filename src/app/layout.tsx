"use client";
import "./globals.css";
import type { Metadata } from "next";
import { store } from "./store";
import { Provider } from "react-redux";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JsonPress - JSON powered CMS",
  description: "A JSON powered CMS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SideBar />
        <Provider store={store}>
          <NavBar />
          <div className="h-screen p-3 mt-14 sm:ml-96">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
