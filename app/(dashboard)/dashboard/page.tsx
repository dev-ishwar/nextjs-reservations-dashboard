import { CardHeader, Card, CardTitle, CardDescription } from "@/components/ui/card";
import { getKeyTotalCounts, getReservationStatusCount } from "../../actions/reservations.action";
import { BarChart } from "./barChart";
import { StatusPieChart } from "./PieChart";
import { CalendarCheck, CheckCheck, NotepadText, RouteOff, TicketSlash, Users } from "lucide-react";
import { formatNumber } from "../../utils/helper";
import RecentReservations from "./RecentReservations";

const CountCard = ({ label, count }: { label: string, count: number }) => {
    return (
        <Card className="grow flex items-center justify-center flex-wrap p-2  hover:shadow-sm">
            <div className="flex items-center">
                {label === 'Total Reservations' && <NotepadText className="size-7" />}
                {label === 'Total People' && <Users className="size-7" />}
                {label === 'Confirmed' && <CalendarCheck className="size-7" />}
                {label === 'Canceled' && <TicketSlash className="size-7" />}
                {label === 'Finished' && <CheckCheck className="size-7" />}
                {label === 'No Show' && <RouteOff className="size-7" />}
            </div>
            <CardHeader className="text-center">
                <CardTitle>{formatNumber(count)}</CardTitle>
                <CardDescription>{label}</CardDescription>
            </CardHeader>
        </Card>
    )
}

const Dashboard = async () => {
    const totalsResponse = getKeyTotalCounts();
    const statusCountResponse = getReservationStatusCount();

    const [totals, statusCount] = await Promise.all([totalsResponse, statusCountResponse])

    if (totals.error || statusCount.error) {
        console.log('error: ', totals.error, statusCount.error)
        return;
    }
    
    return (
        <main className="p-5">
            <Card className="flex justify-between gap-4 p-5 flex-wrap my-5">
                {
                    totals.data?.map(item => (
                        <CountCard {...item} key={item.label} />
                    ))
                }
            </Card>
            <Card className="flex justify-between gap-4 p-5 flex-wrap my-5">
                {
                    statusCount.data?.map(item => (
                        <CountCard {...item} key={item.label} />
                    ))
                }
            </Card>
            <Card className="p-4 flex md:flex-row flex-col gap-4 my-5">
                <BarChart />
                <StatusPieChart statusCount={statusCount.data ?? []} />
            </Card>
           <RecentReservations />
        </main>
    )
}

export default Dashboard;