import { fetchBookings, saveBookings } from "../../actions";
import AdminCalendar from "@/components/admin/Calendar";

export const revalidate = 0;

export default async function AdminBookingsPage({ searchParams }: { searchParams: Promise<{ month?: string; year?: string }> }) {
    const { success, bookings } = await fetchBookings();
    const params = await searchParams;
    const month = Number(params.month);
    const year = Number(params.year);
    const initialDate = Number.isInteger(month) && month >= 1 && month <= 12 && Number.isInteger(year) && year >= 1970
        ? `${year}-${String(month).padStart(2, "0")}-01`
        : undefined;

    return (
        <div>
            <AdminCalendar initialBookings={bookings || []} saveAction={saveBookings} initialDate={initialDate} />
        </div>
    );
}
