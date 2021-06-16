// Indicator configuration

// Data disposition
window.DATA_DISPOSITION = "melted";

window.DATA_COLS_ORDER = [];

// Decimals to display
window.DECIMALS_MAX = 2;
window.DECIMALS_FIXED = false;

// Config for the variables
window.VARIABLES = {
    weather_state: {
        display: true,
        var_name: "weather_state",
        states: {
            "sunny": {
                value: "sunny",
                image: "./image/sunny.png"
            },
            "partly_cloudy": {
                value: "partly_cloudy",
                image: "./image/partly_cloudy.png"
            },
            "cloudy": {
                value: "cloudy",
                image: "./image/cloudy.png"
            },
            "rain_heavy": {
                value: "rain_heavy",
                image: "./image/rain_heavy.png"
            },
            "rain_light": {
                value: "rain_light",
                image: "./image/rain_light.png"
            },
            "rain": {
                value: "rain",
                image: "./image/rain.png"
            },
            "snow": {
                value: "snow",
                image: "./image/snow.png"
            },
            "thunderstorms": {
                value: "thunderstorms",
                image: "./image/thunderstorms.png"
            },
        },
    },
    temperature: {
        display: true,
        var_name: "temp",
        mag: "c", // C or F
    },
    rainfall: {
        display: true,
        var_name: "rainfall",
        mag: "%",
        conv_factor: 1,
    },
    humidity: {
        display: true,
        var_name: "humidity",
        mag: "%",
        conv_factor: 1,
    },
    wind_speed: {
        display: true,
        var_name: "wind_speed",
        mag: " m/s",
        conv_factor: 1,
    },
    visibility: {
        display: true,
        var_name: "visibility",
        mag: " m",
        conv_factor: 1,
    },
    wind_gust: {
        display: true,
        var_name: "wind_gust",
        mag: " m/s",
        conv_factor: 1,
    },
    dew_point: {
        display: true,
        var_name: "dew_point",
        mag: " °C",
        conv_factor: 1,
    },
    pressure: {
        display: true,
        var_name: "pressure",
        mag: " hPa",
        conv_factor: 1,
    },
};

window.extraVariableDisplay = ['rainfall', 'humidity', 'wind_speed', 'visibility', 'wind_gust', 'pressure'];

// Locales
window.LOCALES = {
    variables: {
        weather_state: {
            states: {
                "sunny": {
                    en: "Sunny",
                    es: "Soleado",
                },
                "partly_cloudy": {
                    en: "Partly Cloudy",
                    es: "Parcialmente nublado",
                },
                "cloudy": {
                    en: "Cloudy",
                    es: "Nublado",
                },
                "rain_heavy": {
                    en: "Rain (Heavy)",
                    es: "Chubascos",
                },
                "rain_light": {
                    en: "Rain (Light)",
                    es: "Lluvia ligera",
                },
                "rain": {
                    en: "Rain",
                    es: "Lluvia",
                },
                "snow": {
                    en: "Snow",
                    es: "Nieve",
                },
                "thunderstorms": {
                    en: "Thunderstorms",
                    es: "Tormentas",
                },
            },
        },
        temperature: {
            name: {
                en: "Temperature",
                es: "Temperatura",
            },
            units: {
                celsius: {
                    en: "Celsius degrees",
                    es: "Grados Celsius",
                },
                fahrenheit: {
                    en: "Fahrenheit degrees",
                    es: "Grados Fahrenheit",
                },
            },
        },
        humidity: {
            name: {
                en: "Humidity",
                es: "Humedad",
            }
        },
        wind_speed: {
            name: {
                en: "Wind Speed",
                es: "Velocidad del viento",
            }
        },
        wind_gust: {
            name: {
                en: "Wind Gust",
                es: "Ráfaga de viento",
            }
        },
        visibility: {
            name: {
                en: "Visibility",
                es: "Visibilidad",
            }
        },
        dew_point: {
            name: {
                en: "Dew Point",
                es: "Punto de rocío",
            }
        },
        pressure: {
            name: {
                en: "Pressure",
                es: "Presión",
            }
        },
        rainfall: {
            name: {
                en: "Rainfall",
                es: "Precipitaciones",
            }
        },
    },
};

window.PREF_LANG = (navigator.language + "").split("-")[0];

window.getText = function(path) {
    var parts = ("" + path).split(".");

    var pointer = window.LOCALES || {};

    for (var i = 0; i < parts.length; i++) {
        pointer = pointer[parts[i]] || {};
    }

    if (pointer) {
        return pointer[PREF_LANG] || pointer["en"] || path;
    } else {
        return path;
    }
}

// Layout
window.LAYOUT_DIRECTION = "horizontal";

// Configuration changes based on params
window.tweekConfiguration = function () {
    window.LAYOUT_DIRECTION = (DeepIntelligence.param("layout") || "horizontal").toLowerCase();

    var allVars = Object.keys(VARIABLES);

    if (DeepIntelligence.param("variables:display")) {
        var varIds = (DeepIntelligence.param("variables:display") + "").split(",").map(function (a) {
            return a.trim().toLowerCase().replace(/\s/g, "_");
        }).filter(function (a) {
            return !!VARIABLES[a].var_name;
        });

        for (var i = 0; i < allVars.length; i++) {
            var vid = allVars[i];

            VARIABLES[vid].display = varIds.indexOf(vid) >= 0;
        }

        window.extraVariableDisplay = varIds.filter(function (a) {
            return a !== "weather_state" && a !== "temperature";
        });
    }

    if (DeepIntelligence.param("temperature:var")) {
        VARIABLES.temperature.var_name = (DeepIntelligence.param("temperature:var") + "");
    }

    if (DeepIntelligence.param("temperature:mag")) {
        VARIABLES.temperature.mag = (DeepIntelligence.param("temperature:mag") + "").trim().substr(0, 1).toLowerCase();
    }

    if (DeepIntelligence.param("humidity:var")) {
        VARIABLES.humidity.var_name = (DeepIntelligence.param("humidity:var") + "");
    }

    if (DeepIntelligence.param("humidity:mag")) {
        VARIABLES.humidity.mag = (DeepIntelligence.param("humidity:mag") + "");
    }

    if (DeepIntelligence.param("humidity:cf")) {
        VARIABLES.humidity.conv_factor = Number(DeepIntelligence.param("humidity:cf") + "") || 1;
    }

    if (DeepIntelligence.param("wind_speed:var")) {
        VARIABLES.wind_speed.var_name = (DeepIntelligence.param("wind_speed:var") + "");
    }

    if (DeepIntelligence.param("wind_speed:mag")) {
        VARIABLES.wind_speed.mag = (DeepIntelligence.param("wind_speed:mag") + "");
    }

    if (DeepIntelligence.param("wind_speed:cf")) {
        VARIABLES.wind_speed.conv_factor = Number(DeepIntelligence.param("wind_speed:cf") + "") || 1;
    }

    if (DeepIntelligence.param("wind_gust:var")) {
        VARIABLES.wind_gust.var_name = (DeepIntelligence.param("wind_gust:var") + "");
    }

    if (DeepIntelligence.param("wind_gust:mag")) {
        VARIABLES.wind_gust.mag = (DeepIntelligence.param("wind_gust:mag") + "");
    }

    if (DeepIntelligence.param("wind_gust:cf")) {
        VARIABLES.wind_gust.conv_factor = Number(DeepIntelligence.param("wind_gust:cf") + "") || 1;
    }

    if (DeepIntelligence.param("pressure:var")) {
        VARIABLES.pressure.var_name = (DeepIntelligence.param("pressure:var") + "");
    }

    if (DeepIntelligence.param("pressure:mag")) {
        VARIABLES.pressure.mag = (DeepIntelligence.param("pressure:mag") + "");
    }

    if (DeepIntelligence.param("pressure:cf")) {
        VARIABLES.pressure.conv_factor = Number(DeepIntelligence.param("pressure:cf") + "") || 1;
    }

    if (DeepIntelligence.param("visibility:var")) {
        VARIABLES.visibility.var_name = (DeepIntelligence.param("visibility:var") + "");
    }

    if (DeepIntelligence.param("visibility:mag")) {
        VARIABLES.visibility.mag = (DeepIntelligence.param("visibility:mag") + "");
    }

    if (DeepIntelligence.param("visibility:cf")) {
        VARIABLES.visibility.conv_factor = Number(DeepIntelligence.param("visibility:cf") + "") || 1;
    }

    if (DeepIntelligence.param("dew_point:var")) {
        VARIABLES.dew_point.var_name = (DeepIntelligence.param("dew_point:var") + "");
    }

    if (DeepIntelligence.param("dew_point:mag")) {
        VARIABLES.dew_point.mag = (DeepIntelligence.param("dew_point:mag") + "");
    }

    if (DeepIntelligence.param("dew_point:cf")) {
        VARIABLES.dew_point.conv_factor = Number(DeepIntelligence.param("dew_point:cf") + "") || 1;
    }
};
