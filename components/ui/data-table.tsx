'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, PaginationState, TableOptions } from "@tanstack/react-table";
import { Table, TableHead, TableBody, TableHeader, TableCell, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { Skeleton } from "./skeleton";

interface DataTableProps<TData, Tvalue> {
    columns: ColumnDef<TData, Tvalue>[],
    data: TData[],
    rowCount?: number,
    setPagination?: Dispatch<SetStateAction<PaginationState>>,
    pagination?: PaginationState,
    showPagination: boolean,
    loading: boolean
}

export const DataTable = <TData, Tvalue>({ columns, data, rowCount, pagination, setPagination, showPagination = true, loading = false }: DataTableProps<TData, Tvalue>) => {
    // Minimum table options
    let tableOptions: TableOptions<TData> = {
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    }

    // Add pagination options only if pagination is visible
    if (showPagination) {
        tableOptions = {
            ...tableOptions,
            manualPagination: true,
            rowCount,
            onPaginationChange: setPagination,
            state: { pagination }
        }
    }

    const table = useReactTable(tableOptions);

    const renderSkeletonRows = () => (
        <>
            {/* Render dynamic skeleton rows as a placeholder while loading */}
            {Array.from(new Array(pagination?.pageSize)).map((_, index) => (
                <TableRow key={index++}>
                    {/* Render skeleton cells for each visible column */}
                    {table.getVisibleLeafColumns().map((column) => (
                        <TableCell key={column.id}>
                            <Skeleton className="h-5" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );

    let tableBodyContent: ReactElement | ReactElement[] = (
        <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
            </TableCell>
        </TableRow>
    );

    if (table.getRowModel().rows.length) {
        tableBodyContent = table.getRowModel().rows.map(row => (
            <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
            >
                {
                    row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                    ))
                }
            </TableRow>
        ))
    }

    if (loading) {
        tableBodyContent = (
            <>
                {renderSkeletonRows()}
            </>
        )
    }

    return (
        <div className="rounded-md border p-2">
            <Table>
                <TableHeader>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {
                                    headerGroup.headers.map(header => (
                                        <TableHead key={header.id}>
                                            {
                                                header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                            }
                                        </TableHead>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {tableBodyContent}
                </TableBody>
            </Table>
            {
                showPagination &&
                <DataTablePagination table={table} />
            }
        </div>
    )
} 