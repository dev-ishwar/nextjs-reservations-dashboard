
import ReservationsTable from "./reservations-table";
// import GoBack from "@/components/GoBack";

const ReservationsPage = async () => {
    return (
        <main className="mx-5">
            {/* <div className="flex items-center gap-5 " >
                <GoBack />
                <h2 className="text-2xl ">Reservations</h2>
            </div> */}
            <ReservationsTable />
        </main>
    )
}
export default ReservationsPage;