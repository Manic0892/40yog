ig.module('game.entities.level2Logic').requires('game.entities.levelLogic').defines(function() {
	EntityLevel2Logic = EntityLevelLogic.extend({
		zIndex: 9999,
		
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
			var cutsceneProp = ig.game.getEntitiesByType(EntityPlayerL2IntroCutsceneProp);
			if( player && player.enabled) {
				//ig.game.screen.x = player.pos.x - ig.system.width/2;
				ig.game.screen.x = player.pos.x;
				ig.game.screen.y = 0;
			} else if (cutsceneProp.length != 0) {
				if (cutsceneProp.length > 1) {
					for (var i = 0; i < cutsceneProp.length; i++) {
						if (cutsceneProp[i].opening) {
							cutsceneProp = cutsceneProp[i];
							break;
						}
					}
				} else {
					cutsceneProp = ig.game.getEntityByName("cutsceneProp2");
				}
				ig.game.screen.x = cutsceneProp.pos.x - ig.system.width/2;
				ig.game.screen.y = cutsceneProp.pos.y - ig.system.height/2;
			}
			var maxX = ig.game.collisionMap.width * ig.game.collisionMap.tilesize - ig.system.width;
			if (ig.game.screen.x < 0) ig.game.screen.x = 0;
			if (ig.game.screen.x > maxX) ig.game.screen.x = maxX;
		}
	});
});