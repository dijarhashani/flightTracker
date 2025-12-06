function loadMyBookingsScreen() {
    $("#myBookingsList").empty();

    GetMyBookings().then(bookings => {
        if (!Array.isArray(bookings) || bookings.length === 0) {
            $("#myBookingsList").append(`
                <li class="list-group-item text-center text-muted">
                    No bookings found.
                </li>
            `);
            return;
        }  
        const list = $("<ul class='list-group'></ul>");
        bookings.forEach(booking => {
            const listItem = $(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${booking.flight_id}</strong> - ${booking.flight_name}<br>
                        ${booking.flight_departure} → ${booking.flight_arrival}<br>
                        <small>Departure: ${booking.date}</small>
                    </div>

                    <div>
                        Seat: ${booking.seat_number} <br>
                        Passenger: ${booking.passenger_name}
                    </div>  

                    <div>
                        <button class="btn btn-danger deleteBookingBtn" data-booking-id="${booking.flight_id}">
                            Delete Booking
                        </button>
                    </div>
                </li>
            `);
            list.append(listItem);

           
        });

        $("#myBookingsList").append(list);

        $(".deleteBookingBtn").on("click", function () {
            const bookingId = $(this).data("booking-id");
            DeleteBooking(bookingId);
        });
    });


}

