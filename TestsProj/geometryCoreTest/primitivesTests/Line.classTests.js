/**
 * Created by Valentin.Kostyuk on 07.04.14.
 */
define (function (require, exports, module) {
	'use strict';
	var Line = require ('Line').Line;

	describe ('Line Class Tests', function () {

		it ('should be function', function(){
			expect (typeof Line).toBe('function');
		});

		it ('result of call should be object type of line', function () {
			// arrange
			var line = new Line ({ x1: 0, x2: 2, y1: 0, y2: 2 });
			// assert
			expect (line instanceof Line).toBeTruthy();
		});

		describe ('Line creation', function () {

			it ('should set properties correctly', function () {
				// arrange
				var line = new Line ({ x1: 0, x2: 2, y1: 0, y2: 2 });
				// assert
				expect (line.x1).toBe (0);
				expect (line.x2).toBe (2);
				expect (line.y1).toBe (0);
				expect (line.x2).toBe (2);
			});

			it ('should correctly calculate maxX & maxY coordinates of line', function () {
				// arrange
				var line = new Line ({ x1: 0, x2: 2, y1: 0, y2: 8 });
				// assert
				expect (line.maxX).toBe (2);
				expect (line.maxY).toBe (8);
			});

			it('should correctly calculate minX & minY coordinates of line', function(){
				// arrange
				var line = new Line ({ x1: 1, x2: 2, y1: 0, y2: 8 });
				// assert
				expect (line.minX).toBe (1);
				expect (line.minY).toBe (0);
			});

			it('should correctly calculate length of line', function(){
				// arrange
				var line = new Line ({ x1: 1, x2: 2, y1: 0, y2: 8 });
				// assert
				expect (line.length).toBeCloseTo(8.062258, 6);
			});

			it('should correctly calculate direction angle of line', function(){
				// arrange
				var line = new Line ({ x1: 0, x2: 2, y1: 0, y2: 2 });
				// assert
				expect (line.directionAngle).toBeCloseTo(45, 6);
			});

			it('should correctly calculate direction angle of line', function(){
				// arrange
				var line = new Line ({ x1: 1, x2: 2, y1: 0, y2: 8 });
				// assert
				expect (line.directionAngle).toBeCloseTo(82.874984, 6);
			});
		});
	});

});
