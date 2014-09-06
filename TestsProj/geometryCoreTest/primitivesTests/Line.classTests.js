/**
 * Created by Valentin.Kostyuk on 07.04.14.
 */
define (function (require, exports, module) {
	'use strict';
	var Line = require('Line').Line;

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
		});
	});
});
