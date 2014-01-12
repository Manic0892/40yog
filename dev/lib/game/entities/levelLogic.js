ig.module('game.entities.levelLogic').requires('impact.entity', 'game.entities.pauseMenu', 'game.entities.cursor').defines(function() {
	EntityLevelLogic = ig.Entity.extend({
		size:{x:64,y:64},
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 0, 255, 0.4)',
		
		ignorePause: true,
		safetyTimer: .25, //dumb bug
		
		levelMusic: new ig.Sound('media/sounds/rock_loop.*', false),
		
		defaultCursor: 1,
		
		zIndex: -999,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			if (!ig.global.wm) {
				ig.music.add(this.levelMusic);
				ig.music.play();
				
				this.safetyTimer = new ig.Timer(this.safetyTimer);
				
				this.cursor = ig.game.spawnEntity(EntityCursor, 0, 0, {def:this.defaultCursor});
			}
		},
		
		update: function() {
			this.parent();
			if (ig.input.pressed('esc') && !ig.game.paused && this.safetyTimer.delta() >= 0) {
				ig.game.togglePause();
				ig.game.spawnEntity(EntityPauseMenu, 0, 0, {parentLevel: this});
			}
			this.updateScreenPos();
		},
		
		updateScreenPos: function() {
			var player = ig.game.getEntitiesByType( EntityPlayer )[0];
			if( player ) {
				ig.game.screen.x = player.pos.x - ig.system.width/2;
				ig.game.screen.y = player.pos.y - ig.system.height/2;
			}
		},
		
		loadLevel: function() {
			ig.music.stop();
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
});