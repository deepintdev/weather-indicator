// Visualization rendering

window.renderError = function(msg) {
    return '<div class="error"><b>Error:</b> ' + escapeHTML(msg) + '</div>';
};

window.renderNumber = function (input) {
    var n = Number(input);

    if (isNaN(n)) {
        return "??";
    }

    if (!isFinite(n)) {
        if (n > 0) {
            return "∞";
        } else {
            return "-∞";
        }
    }

    // Remove extra decimals
    n = Math.round(n * Math.pow(10, DECIMALS_MAX)) / Math.pow(10, DECIMALS_MAX);

    // Decimals fixed?
    if (DECIMALS_FIXED) {
        n = n.toFixed(DECIMALS_MAX);
    }

    return "" + n;
};

window.updateTemperature = function (mag) {
    if (mag === "c") {
        document.querySelector(".temp-switch-c").classList.add("chosen");
        document.querySelector(".temp-switch-f").classList.remove("chosen");
    } else {
        document.querySelector(".temp-switch-f").classList.add("chosen");
        document.querySelector(".temp-switch-c").classList.remove("chosen");
    }

    window.temperatureCurrentUnits = mag;
    document.querySelector(".temperature").innerHTML = escapeHTML(renderTemperature());
    if (window.localStorage) {
        localStorage.setItem('tmag', mag);
    }
};

window.temperatureInC = 0;
window.temperatureCurrentUnits = window.localStorage ? (localStorage.getItem('tmag') || "c") : "c";

function getWeatherState(state) {
    state = state + "";


    var states = VARIABLES.weather_state.states;
    var statesKeys = Object.keys(states);

    for (var i = 0; i < statesKeys.length; i++) {
        if (states[statesKeys[i]].value === state) {
            return {
                id: statesKeys[i],
                image: states[statesKeys[i]].image,
                name: "variables.weather_state.states." + statesKeys[i] + ""
            }
        }
    }

    return {
        id: "sunny",
        image: VARIABLES.weather_state.states.sunny.image,
        name: "variables.weather_state.states.sunny"
    };
}

function renderTemperature() {
    var t = temperatureInC;
    if (temperatureCurrentUnits === "f") {
        t = (t * 1.8) + 32;
    }
    return renderNumber(t);
}

function renderVariable(value, mag) {
    value = Number(value);
    if (isNaN(value)) {
        return "-";
    }
    return renderNumber(value) + "" + mag;
}

window.renderVisualization = function (variables) {
    var html = '';

    console.log(variables);

    html += '<div class="weather-indicator">';

    // Weather state
    if (VARIABLES.weather_state.display) {
        html += '<div class="weather-state-container">';

        {
            var weatherState = getWeatherState(variables.weather_state);

            html += '<img src="' + escapeDoubleQuotes(weatherState.image) + '" alt="' + escapeDoubleQuotes(getText(weatherState.name)) + '" title="' + escapeDoubleQuotes(getText(weatherState.name)) + '" class="weather-state">';
        }

        html += '</div>';
    }

    // Temperature
    if (VARIABLES.temperature.display) {
        html += '<div class="temperature-container">';

        {
            var temperature = Number(variables.temperature);

            if (VARIABLES.temperature.mag === "f") {
                // To celsius
                temperature = (temperature - 32) / 1.8;
            }

            window.temperatureInC = temperature;

            html += '<span class="temperature" title="' + escapeDoubleQuotes(getText('variables.temperature.name')) + '">' + renderTemperature() + '</span>'

            html += '<span class="temp-switch">';

            {
                html += '<span onclick="updateTemperature(\'c\')" class="temp-switch-c' + (temperatureCurrentUnits === "f" ? "" : " chosen") + '" title="' + escapeDoubleQuotes(getText('variables.temperature.units.celsius')) + '">°C</span>';

                html += '<span onclick="updateTemperature(\'f\')" class="temp-switch-f' + (temperatureCurrentUnits === "f" ? " chosen" : "") + '" title="' + escapeDoubleQuotes(getText('variables.temperature.units.fahrenheit')) + '">°F</span>';
            }

            html += '</span>';
        }

        html += '</div>';
    }

    if (LAYOUT_DIRECTION === "vertical") {
        html += '<div class="vertical-split">&nbsp</div>';
    }

    // Extra variables

    var fillCount = 3;
    var needsClose = false;
    for (var i = 0; i < extraVariableDisplay.length; i++) {
        var varId = extraVariableDisplay[i];
        var varVal = Number(variables[varId]) * (VARIABLES[varId].conv_factor || 1);
        if (VARIABLES[varId].display) {
            if (fillCount >= 3) {
                fillCount = 0;
                if (needsClose) {
                    needsClose = false;
                    html += '</div>';
                }
                html += '<div class="triple-variable">';
                needsClose = true;
            }

            fillCount++;
            html += '<span class="single-variable"><b>' + escapeHTML(getText("variables." + varId + ".name")) + ':</b> ' + escapeHTML(renderVariable(varVal, VARIABLES[varId].mag)) + '</span>';
        }
    }

    if (needsClose) {
        needsClose = false;
        html += '</div>';
    }

    html += '</div>';

    return html;
}