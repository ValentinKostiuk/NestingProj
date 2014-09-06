/**
 * Created by Valentin.Kostyuk on 11.08.2014.
 */
define(function(require, exports, module) {
	'use strict';

	var logger = require('Logger');

	exports.getClassOf = function (o){
		var className;
		if(o === null) {
			return 'Null';
		}
		if(o === undefined) {
			return 'Undefined';
		}
		className = Object.prototype.toString.call(o).slice(8, -1);
		if(className === 'Object'){
			return o.constructor.name;
		}
		return className;
	};

	logger.info(module.id, 'Loaded');
});