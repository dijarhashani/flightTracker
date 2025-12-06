const Auth = {
    ensureAuthenticated: function(onAuthenticated) {
        AuthApi.me(function(user) {
            if (typeof onAuthenticated === "function") {
                onAuthenticated(user);
            }
        }, function() {
            window.location.href = "login.html";
        });
    },

    logout: function() {
        AuthApi.logout(function() {
            window.location.href = "login.html";
        }, function() {
            window.location.href = "login.html";
        });
    }
};