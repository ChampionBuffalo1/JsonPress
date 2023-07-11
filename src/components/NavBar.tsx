import Link from "next/link";
import NavUser from "./NavUser";
import { FileJson } from "lucide-react";

export default function NavBar() {
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
          <div className="flex items-center">
            <NavUser />
          </div>
        </div>
      </div>
    </nav>
  );
}
