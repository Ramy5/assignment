import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { EditDialog } from "./edit-dialog";
import { columns as columnDefFn } from "./columns";
import type { ServiceProvider } from "@/types";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: (
    onEdit: (user: ServiceProvider) => void
  ) => ColumnDef<TData, TValue>[];
  data: TData[];
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  columnFilters: ColumnFiltersState;
  setColumnFilters: (value: ColumnFiltersState) => void;
  onUpdateUser: (updatedUser: ServiceProvider) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  globalFilter,
  setGlobalFilter,
  columnFilters,
  setColumnFilters,
  onUpdateUser,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnPinning, setColumnPinning] = React.useState({
    left: ["select"],
    right: ["actions"],
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] =
    React.useState<ServiceProvider | null>(null);

  const handleEditClick = (user: ServiceProvider) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const tableColumns = React.useMemo(
    () => columnDefFn(handleEditClick as (user: ServiceProvider) => void),
    []
  );

  const table = useReactTable({
    data: data as ServiceProvider[],
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: (updaterOrValue) => {
      if (typeof updaterOrValue === "function") {
        setColumnFilters(updaterOrValue(columnFilters));
      } else {
        setColumnFilters(updaterOrValue);
      }
    },
    onColumnPinningChange: (updaterOrValue) => {
      if (typeof updaterOrValue === "function") {
        setColumnPinning((prev) => ({
          left: updaterOrValue(prev)?.left || [],
          right: updaterOrValue(prev)?.right || [],
        }));
      } else {
        setColumnPinning({
          left: updaterOrValue?.left || [],
          right: updaterOrValue?.right || [],
        });
      }
    },
    state: {
      sorting,
      rowSelection,
      globalFilter,
      columnFilters,
      columnPinning, // Don't forget to pass the state to the table!
    },
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  return (
    <div className="flex flex-col">
      <EditDialog
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        user={selectedUser}
        onUpdateUser={onUpdateUser}
      />
      <div className="rounded-md border overflow-auto relative">
        <Table>
          <TableHeader className="bg-gray-50 z-20">
            {" "}
            {/* Add z-index to header */}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isPinned = header.column.getIsPinned();
                  return (
                    // FIX: APPLY DYNAMIC STYLES FOR PINNING
                    <TableHead
                      key={header.id}
                      className={cn(isPinned && "sticky bg-gray-50 z-10")}
                      style={{
                        left:
                          isPinned === "left"
                            ? `${header.column.getStart()}px`
                            : undefined,
                        right:
                          isPinned === "right"
                            ? `${header.column.getAfter()}px`
                            : undefined,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isPinned = cell.column.getIsPinned();
                    return (
                      // FIX: APPLY DYNAMIC STYLES FOR PINNING
                      <TableCell
                        key={cell.id}
                        className={cn(
                          isPinned && "sticky bg-white z-10",
                          row.getIsSelected() && isPinned && "bg-muted z-10" // Keep color on selected rows
                        )}
                        style={{
                          left:
                            isPinned === "left"
                              ? `${cell.column.getStart()}px`
                              : undefined,
                          right:
                            isPinned === "right"
                              ? `${cell.column.getAfter()}px`
                              : undefined,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex-shrink-0">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
