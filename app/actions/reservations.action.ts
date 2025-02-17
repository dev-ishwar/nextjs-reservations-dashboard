'use server';

import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "../utils/supabase/server";
import { ReservationsChartInterface, ReservationStatus } from "../utils/types";

interface ResponseSuccess<T> {
    data: T,
    error: null,
}

interface ResponseError {
    data: null,
    error: string,
}

type ResponseType<T> = ResponseSuccess<T> | ResponseError;

type ReservationCount = {
    label: string,
    status: string,
    count: number,
}

type TotalsType =  Omit<ReservationCount, 'status'>

export const getKeyTotalCounts = async (): Promise<ResponseType<TotalsType[]>> => {
    const supabase = await createClient();

    const reservations = await supabase.from('reservations').select('id, peopleCount', { count: 'estimated', head: false });
    const totalPeople = reservations.data?.reduce((total, reservation) => total + Number(reservation.peopleCount), 0) ?? 0;

    if (reservations.error) {
        return {
            error: reservations.error.message,
            data: null
        }
    }

    return {
        data: [
            {
                label: 'Total Reservations',
                count: reservations.count ?? 0,
            },
            {
                label: 'Total People',
                count: totalPeople
            }
        ],
        error: null
    }
}

export const getReservations = async (): Promise<ResponseType<ReservationsChartInterface[]>> => {
    const supabase = await createClient();

    const reservations = await supabase.from('reservations').select('id, reservedFor, createdAt, peopleCount, status', { count: 'estimated', head: false });

    if (reservations.error) {
        return {
            error: reservations.error.message,
            data: null
        }
    }

    return {
        data: reservations.data,
        error: null
    }
}

export const getReservationStatusCount = async (): Promise<ResponseType<ReservationCount[]>> => {
    const supabase = await createClient();

    const statusConfirmed = supabase.from('reservations').select('id, status', { count: 'estimated', head: false }).eq('status', ReservationStatus.CONFIRMED);
    const statusCanceled = supabase.from('reservations').select('id, status', { count: 'estimated', head: false }).eq('status', ReservationStatus.CANCELED);
    const statusFinished = supabase.from('reservations').select('id, status', { count: 'estimated', head: false }).eq('status', ReservationStatus.FINISHED);
    const statusNoShow = supabase.from('reservations').select('id, status', { count: 'estimated', head: false }).eq('status', ReservationStatus.NOSHOW);

    try {
        const [confirmed, canceled, finished, noShow] = await Promise.all([statusConfirmed, statusCanceled, statusFinished, statusNoShow]);
        const data = [
            { label: 'Confirmed', status: 'confirmed', count: confirmed.count ?? 0 },
            { label: 'Canceled', status: 'canceled', count: canceled.count ?? 0 },
            { label: 'Finished', status: 'finished', count: finished.count ?? 0 },
            { label: 'No Show', status: 'noShow', count: noShow.count ?? 0 },
        ];

        return {
            data: data,
            error: null
        }
    } catch (error) {
        return {
            error: error instanceof PostgrestError ? error.message : 'Failed to fetch data',
            data: null
        }

    }
}