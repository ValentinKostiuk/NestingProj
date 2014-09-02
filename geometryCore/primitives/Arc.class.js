/**
 * Created by Valentin.Kostyuk on 07.04.14.
 */
define (function (require, exports, module) {
	'use strict';

	var geomUtils = require ('geometryUtils'),
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

		var self = this;

		function getArcSplittedByQuadrant () {
			//implement caching !!!!by hash of start end rx ry radius
			self._normalizeAngles ();

			var start = self.startAngle,
				end = self.endAngle,
				startQuadrant,
				endQuadrant,
				splittedArc = [ [], [], [], [] ];

			function defineQuadrant (angle) {
				if (angle >= 0 && angle < 90) {
					return {
						number: 0,
						ageAngle: 90,
						nextAngle: 90
					};
				}
				if (angle >= 90 && angle < 180) {
					return {
						number: 1,
						ageAngle: 180,
						nextAngle: 180
					};
				}
				if (angle >= 180 && angle < 270) {
					return {
						number: 2,
						ageAngle: 270,
						nextAngle: 270
					};
				}
				if (angle >= 270 && angle < 360) {
					return {
						number: 3,
						ageAngle: 360,
						nextAngle: 0
					};
				}
			}

			while (start !== end) {
				startQuadrant = defineQuadrant (start);
				endQuadrant = defineQuadrant (end);

				if (startQuadrant.number < endQuadrant.number || start > end) {
					splittedArc[startQuadrant.number].push ({
						start: start,
						end: startQuadrant.ageAngle
					});
					start = startQuadrant.nextAngle;
				} else if (startQuadrant.number === endQuadrant.number) {
					splittedArc[startQuadrant.number].push ({
						start: start,
						end: end
					});
					start = end;
				}
			}
			return splittedArc;
		}
		function getXCoordinate(radius, xCenterCoordinate, angle){
			return radius * Math.cos (geomUtils.getRadians (angle)) + xCenterCoordinate;
		}
		function getYCoordinate(radius, yCenterCoordinate, angle){
			return radius * Math.sin (geomUtils.getRadians (angle)) + yCenterCoordinate;
		}

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
			maxX: {
				configurable: false,
				enumerable: true,
				get: function () {
					var allXCoordinates = [],
						quadrantArcs = getArcSplittedByQuadrant (),
						i, j;
					for (i = 0; i < quadrantArcs.length; i += 1) {
						if (quadrantArcs[i].length > 0) {
							for (j = 0; j < quadrantArcs[i].length; j += 1) {
								allXCoordinates.push (getXCoordinate (this.radius, this.rx, quadrantArcs[i][j].start));
								allXCoordinates.push (getXCoordinate (this.radius, this.rx, quadrantArcs[i][j].end));
							}
						}
					}
					return Math.max.apply (Math, allXCoordinates);
				}
			},
			maxY: {
				configurable: false,
				enumerable: true,
				get: function () {
					var allYCoordinates = [],
						quadrantArcs = getArcSplittedByQuadrant (),
						i, j;
					for (i = 0; i < quadrantArcs.length; i += 1) {
						if (quadrantArcs[i].length > 0) {
							for (j = 0; j < quadrantArcs[i].length; j += 1) {
								allYCoordinates.push (getYCoordinate (this.radius, this.ry, quadrantArcs[i][j].start));
								allYCoordinates.push (getYCoordinate (this.radius, this.ry, quadrantArcs[i][j].end));
							}
						}
					}
					return Math.max.apply (Math, allYCoordinates);
				}
			},
			length: {
				get: function () {
					var angle,
						length;
					angle = this.endAngle - this.startAngle;
					length = Math.abs (geomUtils.getRadians (angle) * this.radius);
					return length;
				},
				configurable: false,
				enumerable: true
			},
			largeArcFlag: {
				get: function () {
					var angle = this.endAngle - this.startAngle;
					return angle >= 180 || this.endAngle < this.startAngle ? 1 : 0;
				},
				configurable: false,
				enumerable: true
			},
			sweepFlag: {
				value: 1,
				configurable: false,
				enumerable: true,
				writable: false
			},
			arcSplittedByQuadrants: {
				get: getArcSplittedByQuadrant,
				configurable: false,
				enumerable: true
			}
		});
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