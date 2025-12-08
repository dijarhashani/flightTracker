// Begin Olta
async function getFavorites() {
    const res = await fetch("https://golang-flight-tracker-backend.onrender.com/favorites/my-favorites", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await res.json();
}

async function removeFromFavorites(iata) {
    const res = await fetch(`https://golang-flight-tracker-backend.onrender.com/favorites/remove/${iata}`, {
        method: "DELETE",
        credentials: "include"
    });

    
    if (res.ok) {
        showAlert("Airport removed from favorites.", "success");
        loadFavoriteScreen();
    } else {
        showAlert(res.error || "Failed to remove favorite.", "danger");
    }
}
// End Olta