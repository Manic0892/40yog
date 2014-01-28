//Level 1 Logic.  Handles all the custom, non-Impact logic.

ig.module('game.entities.level1Logic').requires('game.entities.levelLogic').defines(function() {
	EntityLevel1Logic = EntityLevelLogic.extend({
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			if (!ig.global.wm) {
				ig.game.spawnEntity(EntityHealthbar); //Spawn the health bar so that it's drawn every frame
			}
		}
	});
});