const map = L.map("map").setView([41.3275, 19.8187], 5);

L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    { maxZoom: 19 }
).addTo(map);

let planeMarkers = {};
let routeLine = null;

function createPlaneIcon(heading) {
    return L.divIcon({
        className: "plane-marker",
        html: `<img src="img/plane.png" class="plane-icon" style="width:28px; transform: rotate(${heading}deg);">`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });
}

function updatePlanesOnMap(planes) {
    const seen = new Set();

    planes.forEach(plane => {
        if (!plane.lat || !plane.lon) return;

        const id = plane.icao24;
        seen.add(id);

        if (planeMarkers[id]) {
            planeMarkers[id].setLatLng([plane.lat, plane.lon]);
            planeMarkers[id].setIcon(createPlaneIcon(plane.heading || 0));
        } else {
            const marker = L.marker([plane.lat, plane.lon], {
                icon: createPlaneIcon(plane.heading || 0)
            }).addTo(map);

            marker.on("click", () => showPlaneDetails(marker, plane));
            planeMarkers[id] = marker;
        }
    });

    for (const id in planeMarkers) {
        if (!seen.has(id)) {
            map.removeLayer(planeMarkers[id]);
            delete planeMarkers[id];
        }
    }
}

function drawPlaneHeadingLine(plane) {
    if (routeLine) map.removeLayer(routeLine);

    const distance = 100000; 
    const R = 6371e3;

    const lat1 = plane.lat * Math.PI / 180;
    const lon1 = plane.lon * Math.PI / 180;
    const bearing = plane.heading * Math.PI / 180;

    const lat2 = Math.asin(
        Math.sin(lat1) * Math.cos(distance / R) +
        Math.cos(lat1) * Math.sin(distance / R) * Math.cos(bearing)
    );

    const lon2 =
        lon1 +
        Math.atan2(
            Math.sin(bearing) * Math.sin(distance / R) * Math.cos(lat1),
            Math.cos(distance / R) - Math.sin(lat1) * Math.sin(lat2)
        );

    const endLat = lat2 * 180 / Math.PI;
    const endLon = lon2 * 180 / Math.PI;

    routeLine = L.polyline(
        [
            [plane.lat, plane.lon],
            [endLat, endLon]
        ],
        { color: "#4e73df", weight: 3, opacity: 0.9 }
    ).addTo(map);
}

async function showPlaneDetails(marker, plane) {

    
    map.flyTo([plane.lat, plane.lon], 9, { duration: 1.2 });

    drawPlaneHeadingLine(plane);

    const img = await fetchPlaneImage(plane.reg);
    const airlineName = await fetchAirlineName(plane.callsign);

    
    $("#panelFlightId").text(plane.callsign);
    $("#panelPlaneImg").attr("src", img);
    $("#panelAirline").text(airlineName);
    $("#panelReg").text(plane.reg);
    $("#panelType").text(plane.type);
    $("#panelAltitude").text(plane.altitude ? plane.altitude + " ft" : "N/A");
    $("#panelSpeed").text(plane.speed ? plane.speed + " kts" : "N/A");
    $("#panelHeading").text(plane.heading + "°");

    
    const panel = document.getElementById("planeInfoPanel");
    panel.classList.add("show");
}

function closePlanePanel() {
    const panel = document.getElementById("planeInfoPanel");
    panel.classList.remove("show");

    if (routeLine) map.removeLayer(routeLine);
}

async function liveUpdate() {
    const planes = await fetchPlanes();
    updatePlanesOnMap(planes);
}

async function loadMapScreen() {
    $("#map").css("height", "calc(100vh - 60px)");
    map.invalidateSize();

    await liveUpdate();
    setInterval(liveUpdate, 5000);
}
