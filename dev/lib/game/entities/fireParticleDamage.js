ig.module('game.entities.fireParticleDamage').requires('game.entities.particle', 'game.entities.ashParticleRising', 'impact.entity-pool').defines(function() {
	EntityFireParticleDamage = EntityParticle.extend({
		checkAgainst: ig.Entity.TYPE.B,
		lifetime: .3,
		fadetime: .2,
		bounciness: 0,
		friction: {x:0,y:0},
		gravityFactor: 0,
		
		maxVel: {x:9999,y:9999},
		
		velMult: 500,
		defParticleSize: 1,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.initAll(x,y,settings);
		},
		
		reset: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			this.initAll(x,y,settings);
		},
		
		initAll: function(x,y,settings){
			this.r = 255;
			this.g = 255;
			this.b = 0;
			this.a = 1;
			this.color = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
			
			this.idleTimer = new ig.Timer();
			this.particleSize = this.defParticleSize;
			
			this.vel.x = ig.game.screen.x+settings.d.x - this.pos.x; 
			this.vel.y = settings.d.y+ ig.game.screen.y- this.pos.y;
			var vectorLength = Math.sqrt(this.vel.x*this.vel.x + this.vel.y*this.vel.y);
			this.vel.x /= vectorLength;
			this.vel.y /= vectorLength;
			this.vel.x*=this.velMult;
			this.vel.y*=this.velMult;
			this.pos.x += this.vel.x/30;
			this.pos.y += this.vel.y/30;
		},
		
		update: function() {
			this.particleSize += 2;
			
			if (this.idleTimer.delta() > this.lifetime) {
				this.kill();
				return;
			}
			this.a = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1,0.1);
			this.g -= 20;
			if (this.g < 0) this.g = 0;
			this.parent();
		},
		
		draw: function() {
			this.parent();
			var x = this.pos.x - ig.game.screen.x;
			var y = this.pos.y - ig.game.screen.y;
			// create radial gradient
			if (ig.global.graphics.gradient == true) {
				var grd = ig.system.context.createRadialGradient(x, y, this.particleSize, x, y, this.particleSize+20);
				grd.addColorStop(0, 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')');
				grd.addColorStop(1, 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',0)');
				
				ig.system.context.fillStyle = grd;
				var partSizeBuff = this.particleSize + 20; //This just ensures that we'll be drawing a large enough rectangle for the gradient to fill
				ig.system.context.fillRect(x-partSizeBuff,y-partSizeBuff,x+partSizeBuff, y+partSizeBuff);
			} else {
				ig.system.context.beginPath();
				ig.system.context.arc(x, y, this.particleSize + 20, 0, Math.PI*2, true);
				ig.system.context.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
				ig.system.context.fill();
			}
			

		},
		
		check: function(other) {
			if (!other.dead) {
				ig.game.spawnEntity(EntityAshParticleRising,this.pos.x,this.pos.y);
				other.receiveDamage( 2, this );
				this.kill();
			}
		}
	});
	
	ig.EntityPool.enableFor(EntityFireParticleDamage);
});