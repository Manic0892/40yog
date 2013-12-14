/*
* ImpactJS Per-Pixel Collision Detection Plugin
* Written by Abraham Walters
* v1.0 - January 2012
* v1.1 - August 2012
*
*/
ig.module(
	'plugins.betterLoadLevel'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function () {
	ig.Game.inject({
		loadLevel: function(data) {
			for (var i = 0; i < this.entities.length; i++) {
				this.entities[i].loadLevel();
			}
			this.parent(data);
		}
	});
	
	ig.Entity.inject({
		loadLevel: function() {},
		
	});

});