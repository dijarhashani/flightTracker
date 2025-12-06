async function fetchPlanes() {
    try {
        const res = await fetch("https://golang-flight-tracker-backend.onrender.com/flights");
        const data = await res.json();

        return (data.ac || []).map(p => ({
            icao24: p.hex,
            callsign: p.flight || "N/A",
            reg: p.r || "Unknown",
            type: p.type || "Unknown",
            lat: p.lat,
            lon: p.lon,
            altitude: p.alt_baro,
            speed: p.gs,
            heading: p.track
        }));
    } catch (err) {
        console.error("ADSB Error:", err);
        return [];
    }
}

async function fetchPlaneImage(reg) {
    try {
        const res = await fetch(`https://api.planespotters.net/pub/photos/reg/${reg}`);
        const data = await res.json();

        if (!data.photos || data.photos.length === 0) {
            return "img/fallback.jpg";
        }

        const p = data.photos[0];

        if (p.thumbnail_large?.src) return p.thumbnail_large.src;
        if (p.thumbnail?.src) return p.thumbnail.src;

        return "img/fallback.jpg";

    } catch (err) {
        console.error("Plane image error:", err);
        return "img/fallback.jpg";
    }
}

async function fetchAirlineName(flightNumber) {
    try {
        
        const prefix = flightNumber.match(/^[A-Za-z]+/);
        if (!prefix) return "Unknown Airline";

        const airlineCode = prefix[0];

        const res = await fetch(
            `https://golang-flight-tracker-backend.onrender.com/airline/name?airline_code=${airlineCode}`,
            { method: "GET" }
        );

        const data = await res.json();
        return data.airline_name || "Unknown Airline";

    } catch (err) {
        return "Unknown Airline";
    }
}