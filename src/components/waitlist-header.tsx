import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

interface WaitlistHeaderProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function WaitlistHeader({
  globalFilter,
  setGlobalFilter,
}: WaitlistHeaderProps) {
  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold text-gray-900">Waitlist</h1>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button className="px-3 py-2 text-sm font-medium hover:bg-[#C8D5D9] bg-[#C8D5D9] border-[#4E4636] text-[#4E4636]">
            Service Providers
          </Button>
          <Button className="px-3 py-2 text-sm font-medium hover:bg-transparent text-[#4E4636] bg-transparent border border-[#4E4636]">
            Customers
          </Button>
        </div>
        <div className="relative w-full max-w-xs">
          <Input
            id="search"
            type="search"
            placeholder="Search User by email, name..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
