/**
 * Created by Valentin.Kostyuk on 09.04.14.
 */
require.config({
    urlArgs: +new Date(),
    "paths": {
        //define independent utils
        "Logger":"projectGlobalUtils/Logger",
        "javaScriptUtils": "projectGlobalUtils/javaScriptUtils",
        //define geometrical classes
        "geometryUtils": "geometryCore/geometryUtils/geometryUtils",
        "Line": "geometryCore/primitives/Line.class",
        "Circle": "geometryCore/primitives/Circle.class",
        "Arc": "geometryCore/primitives/Arc.class",
        "SubContour":"geometryCore/subContour/SubContour.class"
    },
    shim: {
    }
});
require(["SubContour"]);