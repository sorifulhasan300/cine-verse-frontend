"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getPaginationRowModel,
  OnChangeFn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  onPageChange,
  onLimitChange,
  sorting,
  onSortingChange,
}: DataTableProps<TData, TValue>) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);

  const currentSorting = sorting !== undefined ? sorting : internalSorting;
  const currentOnSortingChange = onSortingChange || setInternalSorting;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: currentOnSortingChange,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: currentSorting,
    },
    manualPagination: !!pagination,
    pageCount: pagination?.totalPages || 0,
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-red-500/20 bg-black/20 backdrop-blur-sm">
        <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-red-500/20 hover:bg-red-500/10">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-red-400 font-semibold cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableHead>
                )
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
                  className="border-red-500/10 hover:bg-red-500/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-gray-300">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-400"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="flex items-center justify-between px-2">
          <div className="flex-1 text-sm text-gray-400">
            Showing {table.getRowModel().rows.length} of {pagination.total}{" "}
            users
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-400">Rows per page</p>
              <select
                value={pagination.limit}
                onChange={(e) => onLimitChange?.(Number(e.target.value))}
                className="h-8 w-[70px] rounded border border-red-500/20 bg-black/20 px-2 text-sm text-black"
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium text-gray-400">
              Page {pagination.page} of {pagination.totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 disabled:opacity-50"
                onClick={() => onPageChange?.(pagination.page - 1)}
                disabled={pagination.page <= 1}
              >
                ‹
              </button>
              <button
                className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 disabled:opacity-50"
                onClick={() => onPageChange?.(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
