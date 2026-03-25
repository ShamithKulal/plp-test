import { fetchBookings, saveBookings } from "../../actions";
import AdminCalendar from "@/components/admin/Calendar";

export const revalidate = 0;

export default async function AdminBookingsPage() {
    const { success, bookings } = await fetchBookings();

    return (
        <div>
            <AdminCalendar initialBookings={bookings || []} saveAction={saveBookings} />
        </div>
    );
}
