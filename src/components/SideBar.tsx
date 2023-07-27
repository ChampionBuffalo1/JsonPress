import { ChevronRight } from "lucide-react";

const items = ["Home", "test2"];

export default function SideBar() {
  return (
    <aside className="fixed top-0 left-0 z-40 w-1/5 h-screen pt-20 transition-transform -translate-x-full border-r sm:translate-x-0 bg-gray-800 border-gray-700">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-800">
        <ul className="space-y-2 font-medium">
          {items.map((label, key) => (
            <li key={key}>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronRight size={16} />
                <span className="ml-3">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
