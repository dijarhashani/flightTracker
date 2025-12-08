// Begin Benita
async function GetMyBookings() {
    const res = await fetch("https://golang-flight-tracker-backend.onrender.com/booking/my-bookings", {
        method: "GET",
        credentials: "include",
    });

    return await res.json();
}

async function DeleteBooking(bookingId) {
    const res = await fetch(`https://golang-flight-tracker-backend.onrender.com/booking/delete/${bookingId}`, {
        method: "DELETE",
        credentials: "include"
    });
    if (res.ok) {
        showAlert("Booking deleted successfully.", "success");
        loadMyBookingsScreen();
    } else {
        showAlert("Failed to delete booking.", "danger");
    }
}
// End Benita