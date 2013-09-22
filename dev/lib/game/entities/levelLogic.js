ig.module('game.entities.levelLogic').requires('impact.entity').defines(function() {
	EntityLevelLogic = ig.Entity.extend({
		size:{x:64,y:64},
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 0, 255, 0.4)',
		
		paused: false,
		ignorePause: true,
		levelMusic: new ig.Sound('media/sound/loop_level1.*'),
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			if (!ig.global.wm) {
				ig.game.spawnEntity(EntityHealthbar);
				ig.game.spawnEntity(EntityKeybinder);
				ig.music.add(this.levelMusic);
				ig.music.volume = .1;
				ig.music.play();
			}	
		},
		update: function() {
			this.parent();
			if (ig.input.pressed('pause')) {
				ig.game.togglePause();
				if (this.paused)
					ig.music.play();
				else ig.music.pause();
				this.paused = !this.paused;
			}
		}
	});
	
	EntityHealthbar = ig.Entity.extend({
		_wmIgnore: true,
		
		draw: function() {
			var playerEnt = (ig.game.getEntitiesByType(EntityPlayer)[0]);
			
			if (playerEnt) {
				newhp = playerEnt.health;
				maxhp = playerEnt.maxHealth;
				if (newhp > maxhp)
					newhp = maxhp;
				
				var width = 150;
				var height = 30;
				var x = 10;
				var y = 10;
				
				var rectWidth = newhp/maxhp * width;
				ig.system.context.beginPath();
				ig.system.context.rect(x, y, rectWidth, height);
				ig.system.context.fillStyle = 'red';
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
		}
	});
});