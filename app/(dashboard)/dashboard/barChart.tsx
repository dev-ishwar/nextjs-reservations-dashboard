import { ChartConfig } from "@/components/ui/chart"
import { ReservationsBarChart } from "@/components/ReservationBarChart";
import { getReservations } from "../../actions/reservations.action";
import { ReservationsChartInterface } from "../../utils/types";

const chartConfig = {
    reservation: {
        label: "Reservations",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig;

export interface ReservationBarChartData { month: number, reservation: number }

const formatMonthlyDataForBarChart = (data: ReservationsChartInterface[] | null) => {
    if (!data) return [];

    const arr: ReservationBarChartData[] = [];

    for (const re of data) {
        if (!re.reservedFor) continue;
        const month = new Date(re.reservedFor).getMonth();
        const idx = arr.findIndex(item => item.month === month);
        if (idx == -1) {
            arr.push({ month: month, reservation: 1 });
        } else {
            arr[idx] = { ...arr[idx], reservation: arr[idx].reservation + 1 }
        }

    }
    arr.sort((a, b) => a.month - b.month);
    return arr;
}

export async function BarChart() {
    const reservationsResponse = await getReservations();
    const chartData = formatMonthlyDataForBarChart(reservationsResponse.data);

    return (
        <div className="grow">
            <ReservationsBarChart chartConfig={chartConfig} chartData={chartData} />
        </div>
    )
}
