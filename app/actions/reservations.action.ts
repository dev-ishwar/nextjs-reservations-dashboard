'use server';

import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "../utils/supabase/server";
import { ReservationsChartInterface, ReservationStatus } from "../utils/types";

interface KeyValueType<T> {
    label: string,
    value: T
}

interface ResponseSuccess<T> {
    data: T,
    error: null,
}

interface ResponseError {
    data: null,
    error: string,
}

type ResponseType<T> = ResponseSuccess<T> | ResponseError;

export const getKeyTotalCounts = async (): Promise<ResponseType<KeyValueType<number>[]>> => {
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
                value: reservations.count ?? 0,
            },
            {
                label: 'Total People',
                value: totalPeople
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

export const getReservationStatusCount = async (): Promise<ResponseType<KeyValueType<number>[]>> => {
    const supabase = await createClient();

    const statusConfirmed = supabase.from('reservations').select('id, status', { count: 'estimated', head: false }).eq('status', ReservationStatus.CONFIRMED);
    const statusCanceled = supabase.from('reservations').select('id, status', { count: 'estimated', head: false }).eq('status', ReservationStatus.CANCELED);
    const statusFinished = supabase.from('reservations').select('id, status', { count: 'estimated', head: false }).eq('status', ReservationStatus.FINISHED);
    const statusNoShow = supabase.from('reservations').select('id, status', { count: 'estimated', head: false }).eq('status', ReservationStatus.NOSHOW);

    try {
        const [confirmed, canceled, finished, noShow] = await Promise.all([statusConfirmed, statusCanceled, statusFinished, statusNoShow]);
        const data = [
            { label: 'Confirmed', value: confirmed.count ?? 0 },
            { label: 'Canceled', value: canceled.count ?? 0 },
            { label: 'Finished', value: finished.count ?? 0 },
            { label: 'No Show', value: noShow.count ?? 0 },
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