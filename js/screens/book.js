let selectedFlight = null;

function selectFlight(flight) {
    selectedFlight = flight;

    $("#selectedFlightInfo").html(`
        <strong>${flight.number}</strong><br>
        Airline: ${flight.airline}<br>
        Route: ${flight.from} → ${flight.to}<br>
        Departure: ${flight.time}
    `);
    $("#bookStep2").addClass("d-none");
    $("#bookStep3").removeClass("d-none");
}

function backToStep1() {
    $("#bookStep2").addClass("d-none");
    $("#bookStep1").removeClass("d-none");
}

function backToStep2() {
    $("#bookStep3").addClass("d-none");
    $("#bookStep2").removeClass("d-none");
}



