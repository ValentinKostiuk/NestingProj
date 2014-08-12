/**
 * Created by Valentin.Kostyuk on 11.08.2014.
 */
define(function(require, exports, module) {
	'use strict';

	var logger = require('Logger');

	exports.getClassOf = function (o){
		if(o === null) {
			return 'Null';
		}
		if(o === undefined) {
			return 'Undefined';
		}
		return Object.prototype.toString.call(0).slice(8, -1);
	};

	logger.info(module.id, 'Loaded');
});