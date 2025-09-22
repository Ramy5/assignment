import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { ArrowUpDown, Edit } from "lucide-react";
import { Badge } from "./ui/badge";
import type { ServiceProvider } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

const tableHeader = (text: string) => (
  <div className="uppercase text-xs font-medium text-gray-500 tracking-wider">
    {text}
  </div>
);

export const columns = (
  onEdit: (user: ServiceProvider) => void
): ColumnDef<ServiceProvider>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border-[#4E4636] cursor-pointer"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border-[#4E4636] cursor-pointer"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-left p-0 hover:bg-gray-100"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {tableHeader("Email")}
        <ArrowUpDown className="ml-2 h-3 w-3 text-gray-400" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("email")}</div>
    ),
  },
  { accessorKey: "phone", header: () => tableHeader("Phone Number") },
  { accessorKey: "postcode", header: () => tableHeader("Postcode") },
  { accessorKey: "vendorType", header: () => tableHeader("Vendor Type") },
  {
    accessorKey: "serviceOffering",
    header: () => tableHeader("Service Offering"),
  },
  { accessorKey: "signupDate", header: () => tableHeader("Signup Date") },
  {
    accessorKey: "status",
    header: () => tableHeader("Status"),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      if (status === "-") return <span className="text-gray-500">-</span>;

      const variant =
        status === "Onboarded"
          ? "default"
          : status === "Rejected"
          ? "destructive"
          : "secondary";
      return (
        <Badge variant={variant} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => tableHeader("Actions"),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 cursor-pointer"
          onClick={() => onEdit(user)}
        >
          <span className="sr-only">Edit user</span>
          <Edit className="h-4 w-4" />
        </Button>
      );
    },
  },
];
