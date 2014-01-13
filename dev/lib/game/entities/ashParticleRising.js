//Rising variety of ashParticle.  Used mostly when the flamethrower hits a bedbug in level one.

ig.module('game.entities.ashParticleRising').requires('game.entities.ashParticle','impact.entity-pool').defines(function(){
	EntityAshParticleRising = EntityAshParticle.extend({
		gravityFactor: 0,
		
		init: function( x, y, settings ) {
			this.parent(x,y,settings);
			this.pos.x = x;
			this.pos.y = y;
			//Color is 0 - black
			this.color = 0;
			//Randomize velocity for upward and random lateral movement
			this.vel.y = -100 - Math.random()*25;
			this.vel.x = Math.random()*200 - 100;
			
			this.idleTimer = new ig.Timer();
		},
		
		reset: function(x,y,settings) {
			this.parent(x,y,settings);
			this.pos.x = x;
			this.pos.y = y;
			this.color = 0;
			this.vel.y = -100 - Math.random()*25;
			this.vel.x = Math.random()*200 - 100;
		},
		
		
		update: function() {
			this.color +=5 
			this.parent();
		}
	});
	
	ig.EntityPool.enableFor(EntityAshParticleRising);
});