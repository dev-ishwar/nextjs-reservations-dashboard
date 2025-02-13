'use client';

import { ColumnDef } from "@tanstack/react-table";
import { ReservationTableInterface } from "../utils/types";
import { formatDateTime } from "../utils/helper";

export const columns: ColumnDef<ReservationTableInterface>[] = [
    {
        accessorKey: 'id',
        header: 'Id'
    },
    {
        accessorKey: 'betriebId',
        header: 'Betrieb Id',
    },
    {
        accessorKey: 'peopleCount',
        header: 'Prople Count',
    },
    {
        accessorKey: 'reservedFor',
        header: 'Reserved For',
        cell: ({ row }) => {
            const formatted = formatDateTime(row.getValue('reservedFor'));
            return <span>{formatted}</span>
        }
    },
    {
        accessorKey: 'status',
        header: 'Status',
    }
]

