import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, MessageSquareText } from "lucide-react";

export function Header() {
  const navLinks = [
    "Service Dashboard",
    "Finance Forecast",
    "Human Resources",
    "Users",
    "Compliances & Verification",
  ];
  const activeLink = "Human Resources";

  return (
    <header className="flex items-center justify-between py-6 h-16 sticky top-0 z-50 bg-slate-50 border-b border-gray-200 px-20">
      <nav className="flex items-center space-x-8">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className={`text-sm font-medium ${
              link === activeLink
                ? "text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {link}
          </a>
        ))}
      </nav>
      <div className="flex items-center space-x-6">
        <button className="relative p-1 cursor-pointer rounded-full text-gray-400 hover:text-blue-600">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 block h-2 w-2 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
        <button className="p-1 rounded-full cursor-pointer text-gray-400 hover:text-blue-600">
          <MessageSquareText className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="Max Smith" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-semibold text-gray-800">Max Smith</p>
            <p className="text-gray-500">London, UK</p>
          </div>
        </div>
      </div>
    </header>
  );
}
