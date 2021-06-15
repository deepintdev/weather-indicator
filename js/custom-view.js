// © Copyright 2020 by Deep Intelligence
// Custom visualization script
// Version 1.0

window.DeepIntelligence = {};

DeepIntelligence.loaded = false;
DeepIntelligence.url = "https://app.deepint.net/";
//DeepIntelligence.url = "http://localhost/";
DeepIntelligence.token = "";
DeepIntelligence.readyListeners = [];
DeepIntelligence.dataCallback = null;

/* Private scope */

var getParameterByName = function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var jsonGET = function (url, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                try {
                    return callback(JSON.parse(this.responseText));
                } catch (ex) {
                    console.error(ex);
                    return callback(null);
                }
            } else if (this.status === 404) {
                return callback(null);
            } else if (this.status === 0 || this.status === 503 || this.status === 503) {
                // Must try again
                setTimeout(function () {
                    jsonGET(url, callback);
                }, 500);
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};

DeepIntelligence.onload = function () {
    this.loaded = true;
    this.token = this.param("di_token") || "";

    for (var i = 0; i < this.readyListeners.length; i++) {
        try {
            this.readyListeners[i]();
        } catch (ex) {
            console.error(ex);
        }
    }
};

/* Public scope */

/**
 * Gets a parameter from query string
 * @param {string} key The key for the parameter
 */
DeepIntelligence.param = function(key) {
    return getParameterByName(encodeURIComponent(key));
};

/**
 * Asynchronously waits until Deep Intelligence module is ready
 * @param {function} callback A callback to be called when the module is ready
 */
DeepIntelligence.ready = function (callback) {
    if (typeof callback !== "function") {
        return this.loaded;
    }
    if (this.loaded) {
        setTimeout(callback, 0);
    } else {
        this.readyListeners.push(callback);
    }
};

/**
 * Fetches the visualization data
 * @param {number[]} projection Projection to apply to the data, to optimize load. It's an array or features indexes.
 * @param {function} callback Function to call when data is fetched. Example: callback(error, features, instances, projection)
 * You will receive:
 *  - error: An error if something went wrong. Null if sucess.
 *  - features: Array of features
 *  - instances: Data matrix
 *  - projection: The projection applied. May not match with yours if you sent an invalid projection. Null if no projection.
 */
DeepIntelligence.fetchData = function (projection, callback) {
    if (!callback) {
        callback = projection;
        projection = "";
    } else {
        projection = projection ? projection.join(",") : "";
    }
    if (!this.token) {
        return callback(new Error("Could not fetch visualization data. No token provided."));
    }
    jsonGET((new URL("/api/views/custom/fetch?token=" + encodeURIComponent(this.token) + "&projection=" + encodeURIComponent(projection), this.url)).toString(), function (response) {
        if (response === null) {
            return callback(new Error("Could not fetch visualization data. Invalid or expired token provided."));
        } else {
            return callback(null, response.features, response.instances, response.projection);
        }
    }.bind(this));
}

if (document.readyState === "complete") {
    DeepIntelligence.onload();
} else {
    document.addEventListener("DOMContentLoaded", DeepIntelligence.onload.bind(DeepIntelligence));
}

