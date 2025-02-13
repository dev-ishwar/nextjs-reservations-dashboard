import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";

export const getPaginationRange = (page: number = DEFAULT_PAGE_INDEX, size: number = DEFAULT_PAGE_SIZE) => {
    if (page < 0) page = DEFAULT_PAGE_INDEX;
    const start = page * size;
    const end = start + size - 1; // -1 since records are 0 indexed in DB and returns inclusive of end
    console.log({ start, end })
    return { start, end };
}

export const formatDateTime = (dateTime: string) => {
    if (!dateTime) return '';

    const date = new Date(dateTime);
    const formatter = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        // timeStyle: 'medium',
    })

    return formatter.format(date);
}

// @return: string - May 20
export const formattedDateMonth = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    })
}

// @return: string - May 20, 2025
export const formateDateToDateMonthYear = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}

export const formatNumber = (value: number) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-US').format(value);
}