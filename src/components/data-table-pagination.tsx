import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <Pagination className="flex items-center justify-center sm:justify-start py-4">
      <PaginationContent className="flex-wrap">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => table.previousPage()}
            aria-disabled={!table.getCanPreviousPage()}
            className={
              !table.getCanPreviousPage()
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
        {Array.from({ length: table.getPageCount() }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => table.setPageIndex(i)}
              isActive={table.getState().pagination.pageIndex === i}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => table.nextPage()}
            aria-disabled={!table.getCanNextPage()}
            className={
              !table.getCanNextPage() ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
