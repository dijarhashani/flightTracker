// Begin Dijar
const API_BASE = "https://golang-flight-tracker-backend.onrender.com";

const AuthApi = {
    login: function(email, password, onSuccess, onError) {
        $.ajax({
            url: API_BASE + "/auth/login",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email: email, password: password }),
            xhrFields: { withCredentials: true },
            crossDomain: true,
            success: onSuccess,
            error: onError
        });
    },

    register: function(name, surname, email, password, onSuccess, onError) {
        $.ajax({
            url: API_BASE + "/auth/register",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ name: name, surname: surname, email: email, password: password }),
            xhrFields: { withCredentials: true },
            crossDomain: true,
            success: onSuccess,
            error: onError
        });
    },

    me: function(onSuccess, onError) {
        $.ajax({
            url: API_BASE + "/auth/me",
            method: "GET",
            xhrFields: { withCredentials: true },
            crossDomain: true,
            success: onSuccess,
            error: onError
        });
    },

    logout: function(onSuccess, onError) {
        $.ajax({
            url: API_BASE + "/auth/logout",
            method: "POST",
            xhrFields: { withCredentials: true },
            crossDomain: true,
            success: onSuccess,
            error: onError
        });
        console.log("Logged out");
    }
};
// End Dijar

