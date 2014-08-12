/**
 * Created by Valentin.Kostyuk on 16.04.14.
 */
define(function(require) {
	'use strict';

	if(!window.NestingProj) {
		window.NestingProj = {};
	}

	var modeKey = 'perfect-local-storage-debug-mode',
		debug,
		logger;

	function getDebugMode () {
		if (!window.console && typeof window.console !== 'object') {
			return false;
		}
		var stStr = (window.localStorage && (window.localStorage.getItem (modeKey))),
			mode;

		if (stStr === '3' || stStr === 'error') {
			console.log ('LOGGING ONLY ERRORS');
			mode = 3;
		} else if (stStr === '2' || stStr === 'warn') {
			console.log ('LOGGING WARNINGS AND ERRORS');
			mode = 2;
		} else if (stStr === '1' || stStr === 'info') {
			mode = 1;
		} else if(stStr === '0' || stStr === 'false'){
			console.log ('LOGGING DISABLED');
			mode = 0;
		} else {
			mode = 3;
		}
		return {
			mode: mode
		};
	}

	debug = getDebugMode();

	function enableDebugMode (enable) {
		var usageStr = 'USAGE OF DEBUG MODE\nuse:\n\t' +
			' 3 / \'error\' - for errors,\n\t' +
			' 2 / \'warn\' - warnings,\n\t' +
			' 1 / \'info\' - all messages\n\t ' +
			'\'false\' value - turn off';
		if (enable === undefined) {
			if (debug.mode === false) {
				console.warn ('DEBUG MODE TURNED OFF');
				return usageStr;
			}
			console.warn ('NOW USING \'' + debug + '\' MODE');
			return;
		}
		if (window.localStorage) {
			window.localStorage.setItem (modeKey, enable);
		}
		debug = getDebugMode();
		return usageStr;
	}

	function info () {
		if (debug.mode !== 0 && debug.mode < 2) {
			if(arguments.length > 1 && typeof arguments[0] === "string") {
				arguments[0] = '['+ arguments[0] +']';// suppose that first parameter is module name
				console.info.apply(console, arguments);
			} else {
				console.info.apply(console,arguments);
			}
		}
	}

	function log () {
		if (debug.mode !== 0 && debug.mode < 2) {
			if(arguments.length === 1 && typeof arguments[0] !== "string") {

				console.dir.apply(console, arguments);

			} else if (arguments.length > 1 &&
						typeof arguments[arguments.length - 1] === "boolean" &&
						arguments[arguments.length - 1] === true // so tracing is enabled
				) {
				var argsToLog = [],
					i = 0;
				while(i < arguments.length - 1){
					argsToLog.push(arguments[i]);
					i += 1;
				}
				console.log(argsToLog);
				console.trace();

			} else {

				console.log.apply(console,arguments);

			}
		}
	}

	function warn () {
		if (debug.mode !== 0 && debug.mode <= 2 ) {
			if(arguments.length > 1 && typeof arguments[0] === "string") {
				arguments[0] = '['+ arguments[0] +']';// suppose that first parameter is module name
				console.warn.apply(console, arguments);
			} else if(arguments[0]) {
				console.warn.apply(console, arguments);
			}
		}
	}

	function error () {
		if (debug.mode !== 0 && debug.mode <= 3) {
			if(arguments.length > 1 && typeof arguments[0] === "string") {
				arguments[0] = '['+ arguments[0] +']';// suppose that first parameter is module name
				console.error.apply(console, arguments);
			} else if(arguments[0]) {
				console.error.apply(console, arguments);
			}
		}
	}

	logger = {
		info: info,
		warn: warn,
		error: error,
		log: log
	};
	window.NestingProj.enableDebugMode = enableDebugMode;
	return logger;
});