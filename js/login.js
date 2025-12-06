$(document).ready(function () {
    AuthApi.me(
        () => window.location.href = "index.html",
        () => {}
    );

    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        const email = $("#email").val().trim();
        const password = $("#password").val();

        const $error = $("#errorMsg");
        const $success = $("#successMsg");

        $error.addClass("d-none");
        $success.addClass("d-none");

        if (!email || !password) {
            $error.text("Please fill in all fields").removeClass("d-none");
            return;
        }

        AuthApi.login(email, password,
            function (res) {
                $success.text("Login successful! Redirecting...").removeClass("d-none");
                // setTimeout(() => {
                //     window.location.href = "index.html";
                // }, 1500);
            },
            function (xhr) {
                let msg = "Invalid email or password";
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    msg = xhr.responseJSON.error;
                }
                $error.text(msg).removeClass("d-none");
            }
        );
    });
});
