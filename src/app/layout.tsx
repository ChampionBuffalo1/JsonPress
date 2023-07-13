import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import GlobalProvider from "./globalProvider";

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
      <body className={inter.className + "  overflow-hidden"}>
        <SideBar />
        <GlobalProvider>
          {/* NavUser used within NavBar component requires redux-store*/}
          <NavBar />
          <div className="h-screen p-3 mt-14 sm:ml-96">{children}</div>
        </GlobalProvider>
      </body>
    </html>
  );
}
