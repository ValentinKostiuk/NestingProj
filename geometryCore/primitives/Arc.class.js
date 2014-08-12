/**
 * Created by Valentin.Kostyuk on 07.04.14.
 */
define(function(require, exports, module) {
	'use strict';

	var geomUtils = require('GeometryUtils'),
		logger = require('Logger');

	function Arc (data) {
		Object.defineProperties(this, {
			rx:{
				value: data.rx,
				writable: true,
				enumerable: true,
				configurable: false
			},
			ry:{
				value: data.ry,
				writable: true,
				enumerable: true,
				configurable: false
			},
			radius:{
				value: data.radius,
				writable: true,
				enumerable: true,
				configurable: false
			},
			//todo: maybe define function for normalization of angles where startA > endA that mean through PI
			startAngle:{
				value: data.startAngle,
				writable: true,
				enumerable: true,
				configurable: false
			},
			endAngle:{
				value: data.endAngle,
				writable: true,
				enumerable: true,
				configurable: false
			},
			x1:{
				configurable: false,
				enumerable: true,
				get: function () {
					return this.radius * Math.cos (this.startAngle * (Math.PI/180)) + this.rx;
				}
			},
			y1:{
				configurable: false,
				enumerable: true,
				get: function () {
					return this.radius * Math.sin (this.startAngle * (Math.PI/180)) + this.ry;
				}
			},
			x2:{
				configurable: false,
				enumerable: true,
				get: function () {
					return this.radius * Math.cos (this.endAngle * (Math.PI/180)) + this.rx;
				}
			},
			y2:{
				configurable: false,
				enumerable: true,
				get: function () {
					return this.radius * Math.sin (this.endAngle * (Math.PI/180)) + this.ry;
				}
			},
			length:{
				configurable: false,
				enumerable: true,
				get: function () {
					var angle,
						length;
					angle = this.endAngle - this.startAngle;
					length = Math.abs(Math.PI * this.radius * angle / 180);
					return length;
				}
			}
		});
	}

	exports.Arc = Arc;

	logger.info(module.id, 'loaded');
});