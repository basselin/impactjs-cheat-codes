# Créer des cheat-codes / astuces pour vos jeux ImpactJS

CheatCodes est un petit plugin qui vous permet de créer et de gérer des cheat-codes / astuces facilement durant votre jeu ImpactJS.


## Utilisation

### Premier exemple
Copier **cheat-codes.js** dans le dossier **lib/plugins/** de ImpactJS.

Editer **lib/game/main.js** :
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
			
			// Armes au max !
			this.cheats.addCode('IDKFQ',
				[ ig.KEY.I, ig.KEY.D, ig.KEY.K, ig.KEY.F, ig.KEY.Q ],
				function() {
					ig.game.myEntityPlayer.weaponBullets = 99999;
				});
			
			// ...
		},
		// ...
	});
	
});
```

### Cheat code / astuce à usage unique
```javascript
	this.cheats.addCode('IDDAD',
		[ig.KEY.I, ig.KEY.D, ig.KEY.D, ig.KEY.A, ig.KEY.D],
		function() {
			this.cheats.removeCode( 'IDDAD' );
			// Le code de votre astuce
		});
```

## Documentation

### Méthodes
* **addCode**: Ajouter une astuce.
	* *name*: `String` Nom de l'astuce.
	* *keys*: `Array` Tableau contenant les touches du clavier. Voir: `ig.KEY.`.
	* *success*: `Function` Attacher une fonction lorsque le code est correctement saisi. La valeur `ig.game` est appliquée lors de l'appel de la fonction `success`.
* **removeCode**: Supprimer une astuce.
	* *name*: `String` Nom de l'astuce.
* **removeAllCodes**: Supprimer toutes les astuces.


## Changelog

**Version 1.0.1**
* Optimisation du code source

**Version 1.0**
* First commit


