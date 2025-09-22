import React from "react";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { SidebarFilters } from "@/components/sidebar-filters";
import { WaitlistHeader } from "@/components/waitlist-header";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { mockData } from "./data/mock-data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import type { ServiceProvider } from "./types";
import type { ColumnFiltersState } from "@tanstack/react-table";

function App() {
  const [data, setData] = React.useState<ServiceProvider[]>(mockData);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [isFilterSheetOpen, setIsFilterSheetOpen] = React.useState(false);

  const handleFilter = (
    filters: Record<string, string | string[] | boolean | number>
  ) => {
    const newColumnFilters: ColumnFiltersState = Object.entries(filters)
      .filter(
        ([, value]) =>
          value && (!Array.isArray(value) || value.length > 0) && value !== ""
      )
      .map(([key, value]) => ({
        id: key,
        value: value,
      }));

    setColumnFilters(newColumnFilters);
    toast.success("Filters applied successfully!");
    setIsFilterSheetOpen(false);
  };

  const clearFilters = () => {
    setColumnFilters([]);
    setGlobalFilter("");
    toast.info("Filters cleared.");
    setIsFilterSheetOpen(false);
  };

  const handleUpdateUser = (updatedUser: ServiceProvider) => {
    setData((currentData) =>
      currentData.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    toast.success("User updated successfully!");
  };

  const sidebarContent = (
    <SidebarFilters
      onFilter={(data: {
        postcode?: string;
        status?: string[];
        vendorType?: string[];
        serviceOffering?: string[];
        startDate?: Date;
        endDate?: Date;
      }) => {
        const filters = {
          ...data,
          startDate: data.startDate?.toISOString(),
          endDate: data.endDate?.toISOString(),
        };
        handleFilter(
          filters as Record<string, string | string[] | boolean | number>
        );
      }}
      onClear={clearFilters}
    />
  );

  const mainContent = (
    <div className="bg-white rounded-lg p-4 sm:p-6 w-full">
      {/* Mobile Filter Trigger */}
      <div className="md:hidden mb-4 w-full">
        <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
          <SheetTrigger className="!w-full" asChild>
            <Button
              variant="outline"
              className="!w-full flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Show Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>

      <WaitlistHeader
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={data}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          onUpdateUser={handleUpdateUser}
        />
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header />
      <MainLayout sidebar={sidebarContent}>{mainContent}</MainLayout>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="colored"
      />
    </div>
  );
}

export default App;
