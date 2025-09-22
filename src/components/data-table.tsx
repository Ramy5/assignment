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
    state: {
      sorting,
      rowSelection,
      globalFilter,
      columnFilters,
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
      <div className="flex-grow rounded-md border overflow-y-auto h-[500px] scrollbar-none">
        <Table>
          <TableHeader className="bg-gray-50 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
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
