/**
 * Created by Valentin.Kostyuk on 07.04.14.
 */
define(function(require){
    'use strict';

    var Logger = require('Logger'),
        jsUtils = require('javaScriptUtils'),
        Line = require('Line').Line,
        Arc = require('Arc').Arc;

    /////////////

    describe('Line', function () {

        it('should move', function () {

            // arrange
            var line = new Line({ x1: 0, x2: 2, y1: 0, y2: 2 });

            // act
            line.move(2, 0);

            // assert
            expect(line.x1).toBe(2);
            expect(line.x2).toBe(4);
        });

        it('should rotateAround', function () {

            // arrange
            var line = new Line({ x1: 0, x2: 2, y1: 0, y2: 2 });

            // act
            line.rotateAround(0, 0, 180);

            // assert
            expect(line.x1).toBeCloseTo(0, 15);
            expect(line.x2).toBeCloseTo(-2, 15);
        })
    });

    describe('Arc', function () {

        it('should', function () {
            expect('123').toBe('123');
        });

    });

    window.onload();

    ///////////

	var l1 = new Line({
		x1: 0,
		x2: 2,
		y1: 0,
		y2: 2
	});

	l1.move(0,0);
	l1.rotateAround(0, 0, 180);

	Logger.log( jsUtils.getClassOf(l1));
	console.log(l1);

	var arc1 = new Arc({
		startAngle: 30,
		endAngle: 150,
		radius: 10,
		rx: 0,
		ry: 0
	});

	Logger.log(jsUtils.getClassOf(arc1));
	Logger.warn(arc1.arcSplittedByQuadrants);
	console.log(JSON.stringify(arc1));

	var arc2 = new Arc({
		startAngle: 300,
		endAngle: 330,
		radius: 10,
		rx: 0,
		ry: 0
	});

	Logger.log(jsUtils.getClassOf(arc2));
	Logger.warn(arc2.arcSplittedByQuadrants);
	console.log(JSON.parse(JSON.stringify(arc2)));
});