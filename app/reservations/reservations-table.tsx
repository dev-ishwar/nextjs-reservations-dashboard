'use client';

import { DataTable } from "@/components/ui/data-table";
import type { GetAllReservationsResponse } from "../api/reservations/route";
import { getAllReservations } from "../utils/services/reservations.service";
import { columns } from './columns';
import { useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { ReservationTableInterface } from "../utils/types";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "../utils/constants";

const ReservationsTable = ({ recentTransactions }: { recentTransactions?: number }) => {
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: DEFAULT_PAGE_INDEX, pageSize: recentTransactions ?? DEFAULT_PAGE_SIZE });
    const [reservations, setReservations] = useState<ReservationTableInterface[]>([]);
    const [rowCount, setRowCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const getReservations = async () => {
        setIsLoading(true);
        try {
            const res: GetAllReservationsResponse = await getAllReservations(pagination.pageIndex, pagination.pageSize);

            if (res.error || res.code == 0) {
                return (
                    <p>{res.error}</p>
                )
            }

            const data = res.data;
            setReservations(data);
            setRowCount(res.count);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getReservations();
    }, [pagination])

    return (
        <div className="container mx-auto py-5">
            <DataTable
                columns={columns}
                data={reservations}
                rowCount={rowCount}
                setPagination={setPagination}
                pagination={pagination}
                showPagination={!recentTransactions} // true
                loading={isLoading}
            />
        </div>
    )
}

export default ReservationsTable;