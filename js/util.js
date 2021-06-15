// Utilities

window.escapeHTML = function escapeHTML(html) {
    return ("" + html).replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

window.escapeDoubleQuotes = function (raw) {
    return ("" + raw).replace(/"/g, "\\\"").replace(/\\/g, "\\\\")
};

window.toTimestamp = function (t) {
    if (typeof t === "number") {
        return t;
    }
    try {
        return (new Date(t)).getTime();
    } catch (ex) {
        return 1;
    }
};
