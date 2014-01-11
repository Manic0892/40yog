ig.module('game.entities.ashParticleRising').requires('game.entities.ashParticle','impact.entity-pool').defines(function(){
	EntityAshParticleRising = EntityAshParticle.extend({
		alpha: 1,
			
		lifetime: 1,
		fadetime: .4,
		bounciness: 0.1,
		friction: {x:100, y: 100},
		zIndex: 1,
		maxVel: {x:500,y:500},
		gravityFactor: 0,
		
		
		init: function( x, y, settings ) {
			this.pos.x = x;
			this.pos.y = y;
			this.color = 0;
			this.vel.y = -100 - Math.random()*25;
			this.vel.x = Math.random()*200 - 100;
			
			this.particleSize = Math.random()*5;
			
			this.idleTimer = new ig.Timer();
		},
		
		reset: function(x,y,settings) {
			this.parent(x,y,settings);
			this.alpha = 1;
			this.lifetime = 1;
			this.fadetime = .4;
				
			this.pos.x = x;
			this.pos.y = y;
			this.color = 0;
			this.vel.y = -100 - Math.random()*25;
			this.vel.x = Math.random()*200 - 100;
			
			//this.particleSize = Math.random()*5;
			
			this.idleTimer = new ig.Timer();
		},
		
		
		update: function() {
			if( this.idleTimer.delta() > this.lifetime ) {
				this.kill();
				return;
			}
			this.alpha = this.idleTimer.delta().map(
				this.lifetime - this.fadetime, this.lifetime,
				1, 0.1
			);
			this.color +=5 
			this.parent();
		},
		draw: function() {
			this.parent();
			var x = this.pos.x - ig.game.screen.x;
			var y = this.pos.y - ig.game.screen.y;
			ig.system.context.beginPath();
			ig.system.context.arc(x, y, this.particleSize, 0, Math.PI*2, true);
			ig.system.context.fillStyle = 'rgba(' + this.color + ',' + this.color + ',' + this.color + ',' + this.alpha + ')';
			ig.system.context.fill();
		}
	});
	
	ig.EntityPool.enableFor(EntityAshParticleRising);
});