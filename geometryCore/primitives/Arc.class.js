/**
 * Created by Valentin.Kostyuk on 07.04.14.
 */
define (function (require, exports, module) {
	'use strict';

	var geomUtils = require ('GeometryUtils'),
		logger = require ('Logger');

	function Arc (data) {

		if (data.startAngle === data.endAngle) {
			logger.error (module.id, data, 'wrong Arc parameters! start & end angles can\'t be equal');
			return;
		}
		if (data.startAngle < 0 || data.endAngle < 0) {
			logger.error (module.id, data, 'wrong Arc parameters! angles can\'t be negative');
			return;
		}
		if (data.radius <= 0) {
			logger.error (module.id, data, 'wrong Arc parameters! radius can\'t be negative or equal zero');
			return;
		}

		var self = this,
			primitiveHelpers = {};

		Object.defineProperties (this, {
			rx: {
				value: data.rx,
				writable: true,
				enumerable: true,
				configurable: false
			},
			ry: {
				value: data.ry,
				writable: true,
				enumerable: true,
				configurable: false
			},
			radius: {
				value: data.radius,
				writable: true,
				enumerable: true,
				configurable: false
			},
			startAngle: {
				value: data.startAngle,
				writable: true,
				enumerable: true,
				configurable: false
			},
			endAngle: {
				value: data.endAngle,
				writable: true,
				enumerable: true,
				configurable: false
			},
			x1: {
				configurable: false,
				enumerable: true,
				get: function () {
					return this.radius * Math.cos (geomUtils.getRadians (this.startAngle)) + this.rx;
				}
			},
			y1: {
				configurable: false,
				enumerable: true,
				get: function () {
					return this.radius * Math.sin (geomUtils.getRadians (this.startAngle)) + this.ry;
				}
			},
			x2: {
				configurable: false,
				enumerable: true,
				get: function () {
					return this.radius * Math.cos (geomUtils.getRadians (this.endAngle)) + this.rx;
				}
			},
			y2: {
				configurable: false,
				enumerable: true,
				get: function () {
					return this.radius * Math.sin (geomUtils.getRadians (this.endAngle)) + this.ry;
				}
			},
			length: {
				value: (function () {
					var angle,
						length;
					angle = this.endAngle - this.startAngle;
					length = Math.abs (geomUtils.getRadians (angle) * this.radius);
					return length;
				}) (),
				configurable: false,
				enumerable: true,
				writable: false
			},
			largeArcFlag: {
				value: (function () {
					var angle = this.endAngle - this.startAngle;
					return angle >= 180 || this.endAngle < this.startAngle ? 1 : 0;
				}) (),
				configurable: false,
				enumerable: true,
				writable: false
			},
			sweepFlag: {
				value: 1,
				configurable: false,
				enumerable: true,
				writable: false
			}
		});

		primitiveHelpers.getArcSplittedByQuadrant = function () {

		};
	}

	Arc.prototype._normalizeAngles = function () {
		var normalizationAngle, normalizer;
		if (this.startAngle > 360 || this.endAngle > 360) {
			normalizationAngle = Math.max (this.startAngle, this.endAngle);
			normalizer = parseInt (normalizationAngle / 360) * 360;
			this.startAngle -= normalizer;
			this.endAngle -= normalizer;
		}
		if (this.startAngle < 0 || this.endAngle < 0) {
			normalizationAngle = Math.min (this.startAngle, this.endAngle);
			normalizer = parseInt ((0 - normalizationAngle) / 360) * 360 + 360;
			this.startAngle += normalizer;
			this.endAngle += normalizer;
		}
	};

	exports.Arc = Arc;

	logger.info (module.id, 'loaded');
});