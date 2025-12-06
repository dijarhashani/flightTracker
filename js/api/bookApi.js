async function searchFlightByNumber() {
    const flight = $("#bookFlightNumber").val().trim().toUpperCase();

    if (!flight) {
        $("#bookingError").text("Enter a flight number").removeClass("d-none");
        return;
    }

    $("#bookingError").addClass("d-none");
    $("#bookingFlightsResult").html("<p>Searching flights...</p>");
    $("#bookStep2").removeClass("d-none");

    
    const res = await fetch(`https://golang-flight-tracker-backend.onrender.com/search-flights?flight=${flight}`);
    const data = await res.json();

    if (!res.ok) {
        $("#bookingFlightsResult").html(`<div class='alert alert-danger'>${data.error}</div>`);
        return;
    }

    if (data.flights.length === 0) {
        $("#bookingFlightsResult").html(`<p>No flights found for ${flight}</p>`);
        $("#bookStep1").addClass("d-none");
        return;
    }

    
    let html = `<h6>Available Flights:</h6><ul class="list-group mt-3">`;

    data.flights.forEach(flight => {
        html += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${flight.number}</strong> - ${flight.airline}<br>
                    ${flight.from} → ${flight.to}<br>
                    <small>Departure: ${flight.time}</small>
                </div>

                <button class="btn btn-primary" onclick='selectFlight(${JSON.stringify(flight)})'>
                    Select
                </button>
            </li>
        `;
    });

    html += "</ul>";
    $("#bookStep1").addClass("d-none");
    $("#bookingFlightsResult").html(html);
}


async function confirmBooking() {
    const seat = $("#seatNumber").val().trim();
    const name = $("#passengerName").val().trim();

    if (!seat || !name) {
        showAlert("Please enter seat and name", "danger");
        return;
    }

    if (!selectedFlight) {
        showAlert("No flight selected", "danger");
        return;
    }

    const res = await fetch("https://golang-flight-tracker-backend.onrender.com/booking/create", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            flight_id: selectedFlight.number,
            flight_name: selectedFlight.airline,
            flight_departure: selectedFlight.from,
            flight_arrival: selectedFlight.to,
            date: selectedFlight.time,
            seat_number: seat,
            passenger_name: name
        })
    });

    const data = await res.json();

    if (res.ok) {
        
        showAlert("Flight booked successfully!", "success");

       
        setTimeout(() => {
            selectedFlight = null;

            
            $("#bookFlightNumber").val("");
            $("#seatNumber").val("");
            $("#passengerName").val("");

            
            $("#bookStep3").addClass("d-none");
            $("#bookStep2").addClass("d-none");
            $("#bookStep1").removeClass("d-none");

            
            $("#bookingFlightsResult").html("");
            $("#selectedFlightInfo").html("");

            window.scrollTo(0, 0);
        }, 1200);

    } else {
        showAlert(data.error || "Booking failed", "danger");
    }
}