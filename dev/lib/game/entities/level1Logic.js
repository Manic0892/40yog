ig.module('game.entities.level1Logic').requires('game.entities.levelLogic').defines(function() {
	EntityLevel1Logic = EntityLevelLogic.extend({
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			if (!ig.global.wm) {
				ig.game.spawnEntity(EntityHealthbar);
			}
		}
	});
});