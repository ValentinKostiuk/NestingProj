/**
 * Created by Valentin.Kostyuk on 07.04.14.
 */
define (function (require, exports, module) {
	'use strict';

	var geomUtils = require ('geometryUtils'),
		logger = require ('Logger');

	function Line (data) {
		Object.defineProperties (this, {
			x1: {
				value: data.x1,
				writable: true,
				enumerable: true,
				configurable: false
			},
			x2: {
				value: data.x2,
				writable: true,
				enumerable: true,
				configurable: false
			},
			y1: {
				value: data.y1,
				writable: true,
				enumerable: true,
				configurable: false
			},
			y2: {
				value: data.y2,
				writable: true,
				enumerable: true,
				configurable: false
			},
			maxX: {
				configurable: false,
				enumerable: true,
				get: function () {
					return Math.max (this.x1, this.x2);
				}
			},
			maxY: {
				configurable: false,
				enumerable: true,
				get: function () {
					return Math.max (this.y1, this.y2);
				}
			},
			minX: {
				configurable: false,
				enumerable: true,
				get: function () {
					return Math.min (this.x1, this.x2);
				}
			},
			minY: {
				configurable: false,
				enumerable: true,
				get: function () {
					return Math.min (this.y1, this.y2);
				}
			},
			length: {
				value: (function () {
					return Math.sqrt (Math.pow ((this.x2 - this.x1), 2) + Math.pow ((this.y2 - this.y1), 2));
				}) (),
				configurable: false,
				enumerable: true,
				writable: false
			},
			integral: {
				value: (function () {
					var integral,
						integral_x,
						integral_y;
					integral_x = (this.y2 - this.y1) * (this.x1 + this.x2) / 2 + (this.y1 * this.x2 - this.y2 * this.x1);
					integral_y = (this.x1 - this.x2) * (this.y1 + this.y2) / 2 + (this.y2 * this.x1 - this.y1 * this.x2);
					integral = integral_x + integral_y;
					return integral;
				}) (),
				configurable: false,
				enumerable: true,
				writable: false
			}
		});
	}

	Line.prototype.move = function (delta_x, delta_y) {//move line
		this.x1 += delta_x;
		this.y1 += delta_y;
		this.x2 += delta_x;
		this.y2 += delta_y;
	};

	Line.prototype.rotateAround = function (point_x, point_y, angle) {//rotate around some point
		var radians,
			x1,
			y1,
			x2,
			y2;
		x1 = this.x1;
		y1 = this.y1;
		x2 = this.x2;
		y2 = this.y2;
		radians = geomUtils.getRadians (angle);
		this.x1 = ((x1 - point_x) * Math.cos (radians) - (y1 - point_y) * Math.sin (radians)) + point_x;
		this.y1 = ((x1 - point_x) * Math.sin (radians) + (y1 - point_y) * Math.cos (radians)) + point_y;
		this.x2 = ((x2 - point_x) * Math.cos (radians) - (y2 - point_y) * Math.sin (radians)) + point_x;
		this.y2 = ((x2 - point_x) * Math.sin (radians) + (y2 - point_y) * Math.cos (radians)) + point_y;
	};

	Line.prototype.constructor = Line;

	exports.Line = Line;

	logger.info (module.id, 'loaded');
});
