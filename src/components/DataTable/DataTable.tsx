'use client'

import React from "react"

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnDef,
    getPaginationRowModel,
    getSortedRowModel
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Box } from "@mui/material"
import { Button } from "../ui/button"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data
}:DataTableProps<TData, TValue>) {

    const table = useReactTable({ 
        data,
        columns,
        // debugTable: true,
        getCoreRowModel: getCoreRowModel(), // its like a configuration
        getPaginationRowModel: getPaginationRowModel(),  // Adding pagination functionality
        getSortedRowModel: getSortedRowModel(),
    })

    return <Box>
        <Box className="rounded-md border">
            {/* Data Table */}
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(
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
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id} className="text-left">
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Box>
        {/* Pagination */}
        <Box className="flex items-center justify-start space-x-4 py-4">
            <Button variant="outline" size='sm' disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
                Previous
            </Button>
            <Button variant="outline" size='sm' disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
                Next
            </Button>
        </Box>
    </Box>
}