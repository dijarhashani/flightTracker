// Begin Benita
function showAirportError(message) {
    $("#airportError").text(message).removeClass("d-none");
    $("#airportInfo").addClass("d-none");
    $("#airportFlights").addClass("d-none");
}

function showError(message) {
    showAirportError(message);
}
// End Benita