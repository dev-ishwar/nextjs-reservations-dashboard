import { Card } from "@/components/ui/card";
import ReservationsTable from "../reservations/reservations-table";
import Link from "next/link";

const RecentReservations = () => {
    return (
        <Card className="flex flex-col items-center p-5">
            <h2 className="text-left w-full ml-2">Recent Reservations</h2>
            <ReservationsTable recentTransactions={5} />
            <Link href={'/reservations'} className="p-2 px-3 border hover:px-4 transition-all duration-500 ">View All</Link>
        </Card>
    )
}

export default RecentReservations;