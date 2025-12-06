let searchInitialized = false;

function showAirportCard(airport) {
    $("#airportTitle").text(`${airport.name} (${airport.iata || airport.icao || "N/A"})`);
    $("#airportLocation").text(`${airport.city || ""}${airport.city && airport.country ? ", " : ""}${airport.country || ""}`);
    $("#add_to_favorite").html('<i class="fas fa-star"></i> Add to Favorites');
    $("#add_to_favorite").prop("disabled", false);
    $("#add_to_favorite").off("click").on("click", async function () {

        const airportName  = airport.name;
        const airportIata  = airport.iata;

        if (!airportIata) {
            showAlert("Could not detect airport IATA code.", "danger");
            return;
        }

        try {
            const res = await fetch("https://golang-flight-tracker-backend.onrender.com/favorites/add", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    airport_iata: airportIata,
                    airport_name: airportName
                })
            });

            const data = await res.json();

            if (!res.ok) {
                showAlert(data.error || "Failed to add favorite.", "danger");
                return;
            }

            showAlert("Airport added to favorites!", "success");

            $("#add_to_favorite").prop("disabled", true).text("Added to Favorites");

        } catch (err) {
            console.error(err);
            showAlert("Server error. Please try again.", "danger");
        }
    });

    $("#airportInfo").removeClass("d-none");
}

function renderFlights(data) {
    const depBody = $("#departuresBody");
    const arrBody = $("#arrivalsBody");

    depBody.empty();
    arrBody.empty();

    data.departures.forEach(f => {
        depBody.append(`
            <tr>
                <td>${f.number}</td>
                <td>${f.airline?.name || "-"}</td>
                <td>${f.arrival?.airport?.iata || "-"}</td>
                <td>${f.status || "-"}</td>
                <td>${formatTime(f.departure?.scheduledTimeLocal)}</td>
                <td>${f.gate || "-"}</td>
            </tr>
        `);
    });


    data.arrivals.forEach(f => {
        arrBody.append(`
            <tr>
                <td>${f.number}</td>
                <td>${f.airline?.name || "-"}</td>
                <td>${f.departure?.airport?.iata || "-"}</td>
                <td>${f.status || "-"}</td>
                <td>${formatTime(f.arrival?.scheduledTimeLocal)}</td>
                <td>${f.gate || "-"}</td>
            </tr>
        `);
    });

    $("#airportFlights").removeClass("d-none");
}

function loadSearchScreen() {
    if (searchInitialized) return;
    searchInitialized = true;

    $("#airportSearchForm").on("submit", async function (e) {
        e.preventDefault();

        $("#airportError").addClass("d-none").text("");
        $("#airportInfo").addClass("d-none");
        $("#airportFlights").addClass("d-none");

        const query = $("#airportQuery").val().trim();

        if (!query) {
            showError("Please enter airport code or name.");
            return;
        }

        try {
            const airport = await findAirport(query);
            if (!airport) {
                showError("Airport not found.");
                return;
            }

            showAirportCard(airport);
            const flights = await getAirportFlights(airport.iata); 
            renderFlights(flights);

        } catch (err) {
            console.error(err);
            showError("API error. Try again later.");
        }
    });
}
