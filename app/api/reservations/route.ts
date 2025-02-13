import { getPaginationRange } from "@/app/utils/helper";
import { createClient } from "@/app/utils/supabase/server";
import { ReservationTableInterface } from "@/app/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { QueryData } from '@supabase/supabase-js'

interface ResponseSuccess {
    data: ReservationTableInterface[],
    count: number,
    code: 1,
    error: null
}

interface ResponseError {
    error: string,
    code: 0,
    count: null,
    data: null
}

export type GetAllReservationsResponse = ResponseSuccess | ResponseError;

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get('page'));
    const size = Number(searchParams.get('size'))
   
    const range = getPaginationRange(page, size);

    const supabase = await createClient();
    let res: GetAllReservationsResponse;
    let status: number;

    try {
        const reservationsQuery = supabase.from('reservations')
            .select('id, betriebId, peopleCount, status, reservedFor', { count: 'planned' })
            // .ilike('id', `%${query}%`)
            .range(range.start, range.end);
        type reservationsType = QueryData<typeof reservationsQuery>;
        const { data, error, status: statusCode, count } = await reservationsQuery;

        if (error) {
            res = { data: null, count: null, error: error?.message, code: 0 };
            status = statusCode
        } else {
            const reservations: reservationsType = data;
            res = { error: null, data: reservations, count: count ?? 0,  code: 1 };
            status = statusCode
        }
    } catch (error) {
        const err: string = error instanceof Error ? error.message : 'Failed to fetch data';
        res = { error: err, data: null, count: null, code: 0 }
        status = 200;
    }
    console.time('start')
    const start = Date.now();
    for(let i=0;i<10000;i++) {
        while(Date.now() - start < 2) {}
    }
    console.timeEnd('start');
    return NextResponse.json(res, { status })
}