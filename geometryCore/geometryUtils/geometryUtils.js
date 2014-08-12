/**
 * Created by Valentin.Kostyuk on 10.04.14.
 */
define(function(require, exports, module){
	'use strict';

	var logger = require('Logger');

	exports.getRadians = function getRadians(angle){
		return angle * (Math.PI/180);
	};

	logger.info(module.id, 'Loaded');
});
