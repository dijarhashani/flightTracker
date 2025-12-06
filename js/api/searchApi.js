const AVIATIONSTACK_BASE_URL = "https://api.aviationstack.com/v1";
const AVIATIONSTACK_API_KEY = "98a05662aa751bb76e0b42450c8b3ece"; 

async function findAirport(term) {
    const trimmed = term.trim();

    

    let iata = "";
    let icao = "";

    if (/^[A-Za-z]{3}$/.test(trimmed)) {
        iata = trimmed.toUpperCase();
    } else if (/^[A-Za-z]{4}$/.test(trimmed)) {
        icao = trimmed.toUpperCase();
    } else {
       
            console.warn("Free plan: airport name search not supported.");
            return null;
    }

    const params = new URLSearchParams({
        access_key: AVIATIONSTACK_API_KEY,
        limit: 1
    });

    if (iata) params.set("iata_code", iata);
    if (icao) params.set("icao_code", icao);

    const url = `${AVIATIONSTACK_BASE_URL}/airports?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
        console.error("AviationStack airport lookup error:", res.status, await res.text());
        return null;
    }

    const data = await res.json();
    if (!data.data || data.data.length === 0) return null;

    const a = data.data[0];

    return {
        name: a.airport_name || a.airport || trimmed,
        iata: a.iata_code || iata || "",
        icao: a.icao_code || icao || "",
        city: a.city || a.city_name || "",
        country: a.country_name || a.country_iso2 || ""
    };
}

async function getAirportFlights(iataCode) {
    const res = await fetch(`https://golang-flight-tracker-backend.onrender.com/airport-info?iata=${iataCode}`);
    const data = await res.json();


    return {
        arrivals: data.arrivals || [],
        departures: data.departures || []
    };
}