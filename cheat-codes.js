/*!
 * cheat-codes.js v1.0.1
 * (c) 2014, Benoit Asselin contact(at)ab-d.fr
 * MIT Licence
 */

ig.module(
	'plugins.cheat-codes'
)
.requires(
	'impact.input'
)
.defines(function() { "use strict";

ig.CheatCodes = ig.Class.extend({
	codes: {},
	
	init: function() {
		ig.CheatCodes.instances.push( this );
	},
	
	addCode: function( name, keys, success ) {
		if( !name || 'object' !== typeof keys || 'function' !== typeof success ) { return; }
		
		this.codes[name] = {
			'keys': keys.join(),
			'keysLen': keys.length,
			'success': success
		};
		ig.CheatCodes.calcQueueMax();
	},
	
	removeCode: function( name ) {
		delete this.codes[name];
		ig.CheatCodes.calcQueueMax();
	},
	
	removeAllCodes: function() {
		this.codes = {};
		ig.CheatCodes.calcQueueMax();
	},
	
	checkCodes: function() {
		var name, code, begin;
		for( name in this.codes ) {
			code = this.codes[name];
			begin = ig.CheatCodes.queueMax - code.keysLen;
			if( ig.CheatCodes.keysQueue.slice(begin).join() == code.keys ) {
				code.success.apply( ig.game );
			}
		}
	}
	
});



ig.CheatCodes.instances = [];
ig.CheatCodes.keysQueue = []; // keydown
ig.CheatCodes.queueMax = 0;
ig.CheatCodes.calcQueueMax = function() {
	ig.CheatCodes.queueMax = 0;
	var i = 0, cheatCodes,
	    name, code;
	for( ; i < ig.CheatCodes.instances.length; ++i ) {
		cheatCodes = ig.CheatCodes.instances[i];
		for( name in cheatCodes.codes ) {
			code = cheatCodes.codes[name];
			if( ig.CheatCodes.queueMax < code.keysLen ) {
				ig.CheatCodes.queueMax = code.keysLen;
			}
		}
	}
};
ig.CheatCodes.keydown = function( event ) {
	if( !ig.CheatCodes.queueMax ) { return; }
	
	if( 'keydown' == event.type ) {
		var tag = event.target.tagName;
		if( 'INPUT' == tag || 'TEXTAREA' == tag ) { return; }
		
		ig.CheatCodes.keysQueue.push( event.keyCode );
		while( ig.CheatCodes.keysQueue.length > ig.CheatCodes.queueMax ) {
			ig.CheatCodes.keysQueue.shift();
		}
		
		for( var i = 0; i < ig.CheatCodes.instances.length; ++i ) {
			ig.CheatCodes.instances[i].checkCodes();
		}
	}
};

// ImpactJS
ig.Input.inject({
	
	keydown: function( event ) {
		ig.CheatCodes.keydown( event );
		this.parent( event );
	}
	
});

});

