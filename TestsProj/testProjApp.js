/**
 * Created by Valentin.Kostyuk on 09.04.14.
 */
require.config({
    urlArgs: +new Date(),
	baseUrl: "..",
    paths: {
        //define independent utils
        "Logger":"projectGlobalUtils/Logger",
        "javaScriptUtils": "projectGlobalUtils/javaScriptUtils",
        //define geometrical classes
        "geometryUtils": "geometryCore/geometryUtils/geometryUtils",
        "Line": "geometryCore/primitives/Line.class",
        "Circle": "geometryCore/primitives/Circle.class",
        "Arc": "geometryCore/primitives/Arc.class",
        "SubContour":"geometryCore/subContour/SubContour.class",
		//define tests
		"testRunner": "TestsProj/testRunner",
		"LineClassTests": "TestsProj/geometryCoreTest/primitivesTests/Line.classTests",
		"ArcClassTests": "TestsProj/geometryCoreTest/primitivesTests/Arc.classTests"
    },
    shim: {
    }
});
require(["testRunner"]);