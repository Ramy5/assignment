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
import type { ServiceProvider } from "./types";
import type { ColumnFiltersState } from "@tanstack/react-table";

function App() {
  const [data, setData] = React.useState<ServiceProvider[]>(mockData);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const handleFilter = (filters: Record<string, string | string[] | null>) => {
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
  };

  const clearFilters = () => {
    setColumnFilters([]);
    setGlobalFilter("");
    toast.info("Filters cleared.");
  };

  const handleUpdateUser = (updatedUser: ServiceProvider) => {
    setData((currentData) =>
      currentData.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    toast.success("User updated successfully!");
  };

  const mainContent = (
    <div className="bg-white rounded-lg p-6">
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
      <MainLayout
        sidebar={
          <SidebarFilters
            onFilter={(data: {
              postcode?: string;
              status?: string[];
              vendorType?: string[];
              serviceOffering?: string[];
              startDate?: Date;
              endDate?: Date;
            }) =>
              handleFilter(data as Record<string, string | string[] | null>)
            }
            onClear={clearFilters}
          />
        }
      >
        {mainContent}
      </MainLayout>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="colored"
      />
    </div>
  );
}

export default App;
