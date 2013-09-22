ig.module('game.entities.fireParticleDamage').requires('game.entities.particle', 'game.entities.ashParticleRising').defines(function() {
	EntityFireParticleDamage = EntityParticle.extend({
		checkAgainst: ig.Entity.TYPE.B,
		lifetime: .3,
		fadetime: .2,
		bounciness: 0,
		friction: {x:0,y:0},
		gravityFactor: 0,
		
		maxVel: {x:9999,y:9999},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.r = 255;
			this.g = 255;
			this.b = 0;
			this.color = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
			
			this.idleTimer = new ig.Timer();
			this.particleSize = 1;
			
			this.vel.x = ig.game.screen.x+settings.d.x - this.pos.x; 
			this.vel.y = settings.d.y+ ig.game.screen.y- this.pos.y;
			var vectorLength = Math.sqrt(this.vel.x*this.vel.x + this.vel.y*this.vel.y);
			this.vel.x /= vectorLength;
			this.vel.y /= vectorLength;
			this.vel.x*=750; //default 500
			this.vel.y*=750;
		},
		
		update: function() {
			this.particleSize += 2;
			
			if (this.idleTimer.delta() > this.lifetime) {
				this.kill();
				return;
			}
			this.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1,0.1);
			this.g -= 20;
			if (this.g < 0) this.g = 0;
			this.parent();
		},
		
		draw: function() {
			this.parent();
			var x = this.pos.x - ig.game.screen.x;
			var y = this.pos.y - ig.game.screen.y;
			//ig.system.context.beginPath();
			//ig.system.context.arc(x, y, this.particleSize, 0, Math.PI*2, true);
			//ig.system.context.fillStyle = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
			//ig.system.context.fill();
			
			//gradient
			//ig.system.context.rect(0, 0, ig.game.screen.width, ig.game.screen.height);
			
			// create radial gradient
			var grd = ig.system.context.createRadialGradient(x, y, this.particleSize, x, y, this.particleSize+20);
			grd.addColorStop(0, 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',1)');
			grd.addColorStop(1, 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',0)');
			
			ig.system.context.fillStyle = grd;
			ig.system.context.fillRect(0,0,ig.system.width, ig.system.height);
			

		},
		
		check: function(other) {
			if (!other.dead) {
				ig.game.spawnEntity(EntityAshParticleRising,this.pos.x,this.pos.y);
				other.receiveDamage( 2, this );
				this.kill();
			}
		}
	});
});