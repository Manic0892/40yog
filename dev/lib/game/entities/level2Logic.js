ig.module('game.entities.level2Logic').requires('game.entities.levelLogic').defines(function() {
	EntityLevel2Logic = EntityLevelLogic.extend({
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			if (!ig.global.wm) {
			}
		},
		
		bindKeys: function() {
			ig.input.bind( ig.KEY.A, 'left' );
			ig.input.bind( ig.KEY.D, 'right' );
			ig.input.bind( ig.KEY.W, 'up');
			ig.input.bind (ig.KEY.S, 'down');
			ig.input.bind(ig.KEY.ESC, 'pause');
		},
		
		updateScreenPos: function() {
			var player = ig.game.getEntitiesByType( EntityPlayerL2 )[0];
			if( player ) {
				//ig.game.screen.x = player.pos.x - ig.system.width/2;
				ig.game.screen.y = player.pos.y - ig.system.height/2 - player.size.y/2;
			}
		}
	});
});