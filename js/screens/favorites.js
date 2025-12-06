async function loadFavoriteScreen() {
    $("#favoritesList").empty();

    const favorites = await getFavorites() || [];
    const list = $("<ul class='list-group'></ul>");

    if (!Array.isArray(favorites) || favorites.length === 0) {
        list.append(`
            <li class="list-group-item text-center text-muted">
                No favorite airports added yet.
            </li>
        `);
        $("#favoritesList").append(list);
        return;
    }



    favorites.forEach(fav => {
        const listItem = $(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="card-body">
                    <div class="row align-items-center text-md-start d-flex">

                        <!-- LEFT COLUMN (70%) -->
                        <div class="w-70 col-12 col-md-6 mb-3 mb-md-0">
                            <h5 class="card-title mb-1">${fav.airportName}</h5>
                            <p class="mb-0 text-muted">${fav.airportIATA}</p>
                        </div>

                        <!-- RIGHT COLUMN (30%) -->
                        <div class="w-30 col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
                            <button class="btn btn-danger fav-btn remove-fav-btn" data-iata="${fav.airportIATA}">
                                Remove from Favorites
                            </button>

                        </div>

                    </div>
                </div>

            </li>
        `);

        list.append(listItem);
    });

    $("#favoritesList").append(list);

    $(".remove-fav-btn").on("click", function () {
        const iata = $(this).data("iata");
        removeFromFavorites(iata);
    });
}
