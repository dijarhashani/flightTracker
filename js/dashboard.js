$(document).ready(function () {

    Auth.ensureAuthenticated(function(user) {
        $("#userInfo").text(`${user.name} ${user.surname}`);
    });

    $("#logoutBtn").on("click", function() {
        Auth.logout();
    });
});

function navigateTo(screen) {
   
    $(".spaScreen").addClass("d-none");
    $("#" + screen).removeClass("d-none");

    
    $(".sidebar-btn").removeClass("sidebar-active");
    $(`.sidebar-btn[data-screen="${screen}"]`).addClass("sidebar-active");

   
    switch (screen) {
        case "mapScreen":
            loadMapScreen();
            break;

        case "bookScreen":
            
            break;

        case "favoriteScreen":
            loadFavoriteScreen();
            break;

        case "myBookingsScreen":
            loadMyBookingsScreen();
            break;

        case "searchScreen":
            loadSearchScreen();
            break;

        default:
            console.error("Unknown screen:", screen);
    }
}
