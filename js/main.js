// Main script

function setContents(html) {
    document.querySelector("#container").innerHTML = html;
}

function renderMyCustomGraph(data) {
    setContents(renderVisualization(data));
}

function deepintCustomView() {
    DeepIntelligence.ready(function () {
        // Set config
        tweekConfiguration();

        // Theme
        if (DeepIntelligence.param("theme") === "dark") {
            document.querySelector("body").classList.add("dark-theme");
        }

        // Extract custom parameters given by the user

        if (DeepIntelligence.param("data:timestamp") === null) {
            return setContents(renderError("Missing required parameter: 'data:timestamp' (position of timestamp in the data)"));
        }

        if (DeepIntelligence.param("data:variable") === null) {
            return setContents(renderError("Missing required parameter: 'data:variable' (position of variable name in the data)"));
        }

        if (DeepIntelligence.param("data:value") === null) {
            return setContents(renderError("Missing required parameter: 'data:value' (position of value in the data)"));
        }

        var timestampPos = parseInt(DeepIntelligence.param("data:timestamp") || "0", 10);
        var variablePos = parseInt(DeepIntelligence.param("data:variable") || "1", 10);
        var valuePos = parseInt(DeepIntelligence.param("data:value") || "2", 10);

        DeepIntelligence.fetchData(
            [timestampPos, variablePos, valuePos], // Projection (selects the features to get)
            function (error, features, instances, projection) {
                if (error) {
                    return setContents(renderError(error.message));
                }

                try {
                    prepareData(instances, renderMyCustomGraph);
                } catch (ex) {
                    setContents(renderError(ex.message));
                }
            }
        );
    });
}

deepintCustomView();
