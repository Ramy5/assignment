import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Menu, MessageSquareText } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    "Service Dashboard",
    "Finance Forecast",
    "Human Resources",
    "Users",
    "Compliances & Verification",
  ];
  const activeLink = "Human Resources";

  return (
    <header className="sticky top-0 z-50 flex h-16 py-6 items-center justify-between border-b border-gray-200 bg-slate-50 px-4 md:px-8 lg:px-20">
      <div className="flex items-center gap-8">
        <nav className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className={`whitespace-nowrap text-sm font-medium transition-colors ${
                link === activeLink
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button className="relative cursor-pointer rounded-full p-1 text-gray-400 hover:text-blue-600">
          <Bell className="h-6 w-6" />
          <span className="absolute right-0 top-0 block h-2 w-2 translate-x-1/2 -translate-y-1/2 transform rounded-full bg-red-500 ring-2 ring-white" />
        </button>
        <button className="cursor-pointer rounded-full p-1 text-gray-400 hover:text-blue-600">
          <MessageSquareText className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="Max Smith" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <div className="hidden text-sm sm:block">
            <p className="font-semibold text-gray-800">Max Smith</p>
            <p className="text-gray-500">London, UK</p>
          </div>
        </div>

        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="rounded-md p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm">
              <nav className="flex flex-col space-y-5 pt-10">
                <div className="px-2 pb-4 border-b">
                  <a href="#" className="font-bold text-xl text-gray-800">
                    Logo
                  </a>
                </div>
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-md px-3 py-2 text-base font-medium ${
                      link === activeLink
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
