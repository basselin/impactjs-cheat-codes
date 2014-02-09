/*!
 * cheat-codes.js v1.0.0
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
	codes: { },
	
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
		this.codes = { };
		ig.CheatCodes.calcQueueMax();
	},
	
	checkCodes: function() {
		for( var name in this.codes ) {
			var code = this.codes[name];
			var begin = ig.CheatCodes.queueMax - code.keysLen;
			if( ig.CheatCodes.keysQueue.slice(begin).join() == code.keys ) {
				code.success.apply( ig.game );
			}
		}
	}
	
});



ig.CheatCodes.instances = [ ];
ig.CheatCodes.keysQueue = [ ]; // keydown
ig.CheatCodes.queueMax = 0;
ig.CheatCodes.calcQueueMax = function() {
	ig.CheatCodes.queueMax = 0;
	for( var i = 0; i < ig.CheatCodes.instances.length; i++ ) {
		var cheatCodes = ig.CheatCodes.instances[i];
		for( var name in cheatCodes.codes ) {
			var code = cheatCodes.codes[name];
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
		
		for( var i = 0; i < ig.CheatCodes.instances.length; i++ ) {
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

