"use client";

import Link from "next/link";
import { cn } from "@/lib/util";
import { FileJson } from "lucide-react";
import { resetUser } from "@/app/reducer/users";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

export default function NavBar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const isLoggedIn = user.token;

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-gray-800 border-gray-600">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="/" className="flex ml-2 md:mr-24">
              <FileJson className="h-9 mr-3" color="#ffffff" size={28} />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                JsonPress
              </span>
            </Link>
          </div>
          <div className="w-1/6 flex flex-row-reverse">
            {!isLoggedIn && <Button className="mx-2" name="Login" />}
            {isLoggedIn && (
              <button
                className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700 border border-blue-500"
                onClick={() => {
                  localStorage.removeItem("user");
                  dispatch(resetUser());
                }}
              >
                Logout
              </button>
            )}
            {user.role !== "normal" && (
              <Button name="Create User" href="/create" className="mx-2" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

interface ButtonProps {
  name: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}
function Button({ name, href, className, onClick }: ButtonProps) {
  return (
    <Link href={href || `/${name.toLowerCase()}`}>
      <button
        className={cn(
          "px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700 border border-blue-500",
          className
        )}
        onClick={onClick}
      >
        {name}
      </button>
    </Link>
  );
}
