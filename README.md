# Make Cheat Codes in your ImpactJS game

This lite plugin can make cheat codes easyly in ImpactJS during the game.


## Usage

### First example
Copy **cheat-codes.js** to your **lib/plugins/** directory.

Edit **lib/game/main.js** :
```javascript
ig.module( 
	'game.main'
)
.requires(
	// ... ,
	'plugins.cheat-codes',
	// ...
)
.defines(function(){
	
	MyGame = ig.Game.extend({
		// ...
		cheats: new ig.CheatCodes(),
		// ...
		init: function() {
			
			// All weapons !
			this.cheats.addCode('IDKFQ',
				[ig.KEY.I, ig.KEY.D, ig.KEY.K, ig.KEY.F, ig.KEY.Q],
				function() {
					ig.game.myEntityPlayer.weaponBullets = 99999;
				});
			
			// ...
		},
		// ...
	});
	
});
```

### Cheat code for single use
```javascript
	this.cheats.addCode('IDDAD',
		[ig.KEY.I, ig.KEY.D, ig.KEY.D, ig.KEY.A, ig.KEY.D],
		function() {
			ig.game.cheats.remove( 'IDDAD' );
			// Your code for this cheat
		});
```

## Documentation

### Methods
* **addCode**: Add a cheat code.
	* *name*: `String` Name of cheat.
	* *keys*: `Array` Array of keys. See: `ig.KEY.`.
	* *success*: `Function` Attach a function when the code is correct.
* **removeCode**: Remove a cheat code.
	* *name*: `String` Name of cheat.


## Changelog

**Version 1.0**
* First commit


