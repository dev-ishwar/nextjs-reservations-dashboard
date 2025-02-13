const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllReservations = async (page: number, size: number, query?: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());
    searchParams.set('size', size.toString());
    if(query) searchParams.set('quety', query);

    try {
        const res = await fetch(`${BASE_URL}/api/reservations?${searchParams.toString()}`)
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error: ', error);
        error = error instanceof Error ? error.message : 'Failed to fetch data';
        return { error };
    }
}