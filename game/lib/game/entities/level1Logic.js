ig.module('game.entities.level1Logic').requires('game.entities.levelLogic').defines(function() {
	EntityLevel1Logic = EntityLevelLogic.extend({
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			if (!ig.global.wm) {
				ig.game.spawnEntity(EntitySunbar);
			}
		}
	});
	EntitySunbar = ig.Entity.extend({
		_wmIgnore: true,
		
		draw: function() {
			var playerEnt = (ig.game.getEntitiesByType(EntityPlayerL1)[0]);
								
			if (playerEnt) {
				newsp = playerEnt.sun;
				maxsp = playerEnt.maxSun;
				if (newsp > maxsp)
					newsp = maxsp;
				
				var width = 150;
				var height = 30;
				var x = 170;
				var y = 10;
				
				var rectWidth = newsp/maxsp * width;
				ig.system.context.beginPath();
				ig.system.context.rect(x, y, rectWidth, height);
				ig.system.context.fillStyle = 'yellow';
				ig.system.context.fill();
				ig.system.context.beginPath();
				ig.system.context.rect(x, y, width, height);
				ig.system.context.strokeStyle = 'black';
				ig.system.context.lineWidth = 1;
				ig.system.context.stroke();
			}
		}
	});
	EntityKeybinder = ig.Entity.extend({
		_wmIgnore: true,
		
		init: function() {
			ig.input.bind( ig.KEY.A, 'left' );
			ig.input.bind( ig.KEY.D, 'right' );
			ig.input.bind( ig.KEY.W, 'jump' );
			ig.input.bind(ig.KEY.MOUSE1, 'shoot');
			ig.input.bind(ig.KEY.ESC, 'pause');
			ig.input.bind(ig.KEY.SPACE, 'sun');
		}
	});
});