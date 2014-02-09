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
	keysQueue: [ ],
	queueMax: 0,
	
	init: function() {
		ig.CheatCodes.instances.push( this );
	},
	
	addCode: function( name, keys, success ) {
		if( !name || 'object' !== typeof keys || 'function' !== typeof success ) {
			return;
		}
		this.codes[name] = {
			'keys': keys.join(),
			'keysLen': keys.length,
			'success': success
		};
		if( this.queueMax < keys.length ) {
			this.queueMax = keys.length;
		}
	},
	
	removeCode: function( name ) {
		delete this.codes[name];
		
		this.queueMax = 0;
		for( name in this.codes ) {
			var code = this.codes[name];
			if( this.queueMax < code.keysLen ) {
				this.queueMax = code.keysLen;
			}
		}
	},
	
	keydown: function( event ) {
		if( !this.queueMax ) { return; }
		
		if( 'keydown' == event.type ) {
			var tag = event.target.tagName;
			if( 'INPUT' == tag || 'TEXTAREA' == tag ) { return; }
			
			this.keysQueue.push( event.keyCode );
			
			while( this.keysQueue.length > this.queueMax ) {
				this.keysQueue.shift();
			}
			this.checkCodes();
		}
	},
	
	checkCodes: function() {
		for( var name in this.codes ) {
			var code = this.codes[name];
			var begin = this.queueMax - code.keysLen;
			if( this.keysQueue.slice(begin).join() == code.keys ) {
				code.success();
			}
		}
	}
	
});



ig.CheatCodes.instances = [ ];
ig.Input.inject({
	
	keydown: function( event ) {
		for( var i = 0; i < ig.CheatCodes.instances.length; i++ ) {
			ig.CheatCodes.instances[i].keydown( event );
		}
		this.parent( event );
	}
	
});

});

