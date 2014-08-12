/**
 * Created by Valentin.Kostyuk on 07.04.14.
 */
define(function(require){
	'use strict';
	var Logger = require('Logger'),
		jsUtils= require('javaScriptUtils'),
		Line = require('Line').Line;

	var l1 = new Line({
		x1: 0,
		x2: 2,
		y1: 0,
		y2: 2
	});

	l1.move(0,0);
	l1.rotateAround(0, 0, 180);

	Logger.log(l1.maxX);
	Logger.log( jsUtils.getClassOf(l1));
	console.log(JSON.stringify(l1));
});