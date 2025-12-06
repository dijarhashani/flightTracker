function showAlert(message, type = "success") {
    $("#alertBox").remove();

    const alert = `
        <div id="alertBox" class="alert alert-${type} alert-dismissible fade show position-fixed"
             style="top: 20px; right: 20px; z-index: 2000; min-width: 250px;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    $("body").append(alert);

    
    setTimeout(() => {
        $("#alertBox").alert("close");
    }, 3000);
}