// Parsing the data

window.prepareData = function (data, callback) {
    if (window.DATA_DISPOSITION === "cols") {
        throw new Error("Data disposition 'cols' not yet supported.")
    } else {
        prepareDataMelted(data, callback);
    }
};


window.prepareDataMelted = function (data, callback) {
    var res = Object.create(null);
    var times = Object.create(null);

    // Create Id map
    var varIdMap = new Map();
    var varKeys = Object.keys(VARIABLES);
    for (var i = 0; i < varKeys.length; i++) {
        varIdMap.set(VARIABLES[varKeys[i]].var_name, varKeys[i]);
    }

    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var time = toTimestamp(row[0]);
        var varName = row[1];
        var val = row[2];

        // Find variable
        var varId = varIdMap.get(varName);
        if (!varId) continue;

        var prevTime = times[varId] || 0;

        if (time > prevTime) {
            times[varId] = time;
            res[varId] = val;
        }
    }

    callback(res);
};
