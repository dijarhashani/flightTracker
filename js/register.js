$(document).ready(function () {
    $("#registerForm").on("submit", function (e) {
        e.preventDefault();

        const name = $("#name").val().trim();
        const surname = $("#surname").val().trim();
        const email = $("#email").val().trim();
        const password = $("#password").val();
        const passwordConfirm = $("#passwordConfirm").val();

        const $error = $("#errorMsg");
        const $success = $("#successMsg");

        
        $error.addClass("d-none").text("");
        $success.addClass("d-none").text("");

        
        if (!name || !surname || !email || !password || !passwordConfirm) {
            $error.text("Please fill in all fields").removeClass("d-none");
            return;
        }

        if (password !== passwordConfirm) {
            $error.text("Passwords do not match").removeClass("d-none");
            return;
        }

        
        AuthApi.register(name, surname, email, password,
            () => {
                $success.text("Registered successfully! Redirecting...")
                    .removeClass("d-none");

                setTimeout(() => window.location.href = "login.html", 1200);
            },
            (xhr) => {
                let msg = "Registration failed";
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    msg = xhr.responseJSON.error;
                }
                $error.text(msg).removeClass("d-none");
            }
        );
    });
});
