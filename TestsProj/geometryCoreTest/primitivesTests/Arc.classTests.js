/**
 * Created by Valentin.Kostyuk on 07.04.14.
 */
define (function (require, exports, module) {
	'use strict';
	var Arc = require('Arc').Arc;
	describe('Arc', function () {

		it('should', function () {
			expect('123').toBe('123');
		});

		it('should not', function () {
			expect('123').toBeCloseTo(123);
		});
	});
});