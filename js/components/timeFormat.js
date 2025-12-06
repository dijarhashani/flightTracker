function formatTime(timeStr) {
    if (!timeStr || timeStr === "") return "-";

    let fixed = timeStr.replace(" ", "T");

    let d = new Date(fixed);
    if (isNaN(d.getTime())) return "-";

    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}