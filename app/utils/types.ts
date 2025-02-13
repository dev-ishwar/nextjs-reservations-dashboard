interface SupabaseDBRow {
    addOns: string | null
    betriebId: number | null
    children: string | null
    createdAt: string | null
    feedbackHash: string | null
    feedbackSent: string | null
    gastId: number | null
    hash: string | null
    highChairs: string | null
    id: number
    invoice: string | null
    isTablePlan: string | null
    locked: string | null
    msg: string | null
    notes: string | null
    orderId: string | null
    paymentId: string | null
    paymentTemplate: string | null
    peopleCount: number | null
    recurrenceId: string | null
    referrer: string | null
    reservedFor: string | null
    resHotelID: string | null
    roomId: string | null
    shiftId: string | null
    source: string | null
    status: string | null
    stayTime: string | null
    tags: string | null
    turnover: string | null
    userPerSmsInform: string | null
}

export type ReservationTableInterface = Pick<SupabaseDBRow, 'id' | 'betriebId' | 'peopleCount' | 'status' | 'reservedFor'>;
export type ReservationsChartInterface = Pick<SupabaseDBRow, 'createdAt'> & Omit<ReservationTableInterface, 'betriebId'>;

export enum ReservationStatus  {
    "CANCELED" = "canceled",
    "CONFIRMED" = "confirmed",
    "NOSHOW" = "noShow",
    "FINISHED" = "finished",
}

export type ReservationCount = {
    [key in ReservationStatus]: number;
}