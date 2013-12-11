ig.module('game.entities.level1Logic').requires('game.entities.levelLogic').defines(function() {
	EntityLevel1Logic = EntityLevelLogic.extend({
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			if (!ig.global.wm) {
			}
		},
		
		bindKeys: function() {
			ig.input.bind( ig.KEY.A, 'left' );
			ig.input.bind( ig.KEY.D, 'right' );
			ig.input.bind( ig.KEY.W, 'jump' );
			ig.input.bind(ig.KEY.MOUSE1, 'shoot');
			ig.input.bind(ig.KEY.ESC, 'pause');
		}
	});
});