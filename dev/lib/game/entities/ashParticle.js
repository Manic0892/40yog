//Ash particle--used primarily in level one.  Different from ashParticleRising, which is applied when the flamethrower hits something--but the rising variety inherits from this.

ig.module('game.entities.ashParticle').requires('game.entities.particle','impact.entity-pool').defines(function(){
	EntityAshParticle = EntityParticle.extend({
		alpha: 1,
		
		lifetime: 1,
		fadetime: .4,
		bounciness: 0.1,
		friction: {x:100, y: 100},
		zIndex: 0,
		maxVel: {x:500,y:500},
		gravityFactor: .5,
		
		
		init: function( x, y, settings ) {
			//Randomize values for better/less uniform look
			this.pos.x = x+Math.floor(Math.random()*settings.width);
			this.pos.y = y+Math.floor(Math.random()*settings.height);
			this.color = Math.floor(Math.random()*255);
			
			this.particleSize = Math.random()*5;
			
			this.idleTimer = new ig.Timer();
		},
		
		reset: function(x,y,settings) {
			//Reinitialize particle to initial state
			this.parent(x,y,settings);
			this.alpha = 1;
			this.lifetime = 1;
			this.fadetime = .4;
			
			this.pos.x = x+Math.floor(Math.random()*settings.width);
			this.pos.y = y+Math.floor(Math.random()*settings.height);
			
			this.idleTimer.reset();
		},
		
		
		update: function() {
			//Kill when timer hits 0
			if( this.idleTimer.delta() > this.lifetime ) {
				this.kill();
				return;
			}
			//Change alpha to make it fade out
			this.alpha = this.idleTimer.delta().map(
				this.lifetime - this.fadetime, this.lifetime,
				1, 0.1
			);
			this.parent();
		},
		draw: function() {
			this.parent();
			//Correct for screen position since we're using canvas pixels to render the particle, not game pixels
			var x = this.pos.x - ig.game.screen.x;
			var y = this.pos.y - ig.game.screen.y;
			ig.system.context.beginPath();
			ig.system.context.arc(x, y, this.particleSize, 0, Math.PI*2, true);
			//Grayscale
			ig.system.context.fillStyle = 'rgba(' + this.color + ',' + this.color + ',' + this.color + ',' + this.alpha + ')';
			ig.system.context.fill();
		}
	});

	ig.EntityPool.enableFor(EntityAshParticle);
});