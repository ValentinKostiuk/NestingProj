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

			it('{x1: 0, y1: 0, x2: 2, y2: 0} angle should be 0', function(){
				// arrange
				var line = new Line ({x1: 0, y1: 0, x2: 2, y2: 0});
				// assert
				expect (line.directionAngle).toBeCloseTo(0, 6);
			});

			it('{x1: 0, y1: 0, x2: 0, y2: 2} angle should be 90', function(){
				// arrange
				var line = new Line ({x1: 0, y1: 0, x2: 0, y2: 2});
				// assert
				expect (line.directionAngle).toBeCloseTo(90, 6);
			});

			it('{x1: 0, y1: 0, x2: 0, y2: -2} angle should be 270', function(){
				// arrange
				var line = new Line ({x1: 0, y1: 0, x2: 0, y2: -2});
				// assert
				expect (line.directionAngle).toBeCloseTo(270, 6);
			});

			it('{x1: 0, y1: 0, x2: -2, y2: 0} angle should be 180', function(){
				// arrange
				var line = new Line ({x1: 0, y1: 0, x2: -2, y2: 0});
				// assert
				expect (line.directionAngle).toBeCloseTo(180, 6);
			});

			it('{x1: 0, y1: 0, x2: 2, y2: 2} angle should be 45', function(){
				// arrange
				var line = new Line ({x1: 0, y1: 0, x2: 2, y2: 2});
				// assert
				expect (line.directionAngle).toBeCloseTo(45, 6);
			});

			it('{x1: 0, y1: 0, x2: -2, y2: 2} angle should be 135', function(){
				// arrange
				var line = new Line ({x1: 0, y1: 0, x2: -2, y2: 2});
				// assert
				expect (line.directionAngle).toBeCloseTo(135, 6);
			});

			it('{x1: 0, y1: 0, x2: -2, y2: -2} angle should be 225', function(){
				// arrange
				var line = new Line ({x1: 0, y1: 0, x2: -2, y2: -2});
				// assert
				expect (line.directionAngle).toBeCloseTo(225, 6);
			});

			it('{x1: 0, y1: 0, x2: 2, y2: -2} angle should be 315', function(){
				// arrange
				var line = new Line ({x1: 0, y1: 0, x2: 2, y2: -2});
				// assert
				expect (line.directionAngle).toBeCloseTo(315, 6);
			});


			it('{x1: 2, y1: 0, x2: 0, y2: 0} angle should be 180', function(){
				// arrange
				var line = new Line ({x1: 2, y1: 0, x2: 0, y2: 0});
				// assert
				expect (line.directionAngle).toBeCloseTo(180, 6);
			});

			it('{x1: 0, y1: 2, x2: 0, y2: 0} angle should be 270', function(){
				// arrange
				var line = new Line ({x1: 0, y1: 2, x2: 0, y2: 0});
				// assert
				expect (line.directionAngle).toBeCloseTo(270, 6);
			});

			it('{x1: 0, y1: -2, x2: 0, y2: 0} angle should be 90', function(){
				// arrange
				var line = new Line ({x1: 0, y1: -2, x2: 0, y2: 0});
				// assert
				expect (line.directionAngle).toBeCloseTo(90, 6);
			});

			it('{x1: -2, y1: 0, x2: 0, y2: 0} angle should be 0', function(){
				// arrange
				var line = new Line ({x1: -2, y1: 0, x2: 0, y2: 0});
				// assert
				expect (line.directionAngle).toBeCloseTo(0, 6);
			});

			it('{x1: 2, y1: 2, x2: 0, y2: 0} angle should be 225', function(){
				// arrange
				var line = new Line ({x1: 2, y1: 2, x2: 0, y2: 0});
				// assert
				expect (line.directionAngle).toBeCloseTo(225, 6);
			});

			it('{x1: -2, y1: 2, x2: 0, y2: 0} angle should be 315', function(){
				// arrange
				var line = new Line ({x1: -2, y1: 2, x2: 0, y2: 0});
				// assert
				expect (line.directionAngle).toBeCloseTo(315, 6);
			});

			it('{x1: -2, y1: -2, x2: 0, y2: 0} angle should be 45', function(){
				// arrange
				var line = new Line ({x1: -2, y1: -2, x2: 0, y2: 0});
				// assert
				expect (line.directionAngle).toBeCloseTo(45, 6);
			});

			it('{x1: 2, y1: -2, x2: 0, y2: 0} angle should be 135', function(){
				// arrange
				var line = new Line ({x1: 2, y1: -2, x2: 0, y2: 0});
				// assert
				expect (line.directionAngle).toBeCloseTo(135, 6);
			});
		});

		describe('Line usage', function(){
			var line;
			beforeEach(function(){
				line = new Line({x1: 2, y1: 2, x2: 4, y2: 4});
			});
			it('should move line', function(){
				//arrange
				//act
				line.move(10, 10);
				//assert
				expect(line.x1).toBe(12);
				expect(line.y1).toBe(12);
				expect(line.x2).toBe(14);
				expect(line.y2).toBe(14);
			});
			it('should rotate line', function(){
				//arrange
				//act
				line.rotateAround(0, 0, 150);
				//assert
				expect(line.x1).toBeCloseTo(-2.732051, 6);
				expect(line.y1).toBeCloseTo(-0.732051, 6);
				expect(line.x2).toBeCloseTo(-5.464102, 6);
				expect(line.y2).toBeCloseTo(-1.464102, 6);
				expect(line.directionAngle).toBeCloseTo(195, 6);
			});
		});
	});

});
