/*
Base entity class for particle entities. Subclass your own particles from
this class. See the EntityDebrisParticle in debris.js for an example.

Particle entities will kill themselfs after #lifetime# seconds. #fadetime#
seconds before the #lifetime# ends, they will start to fade out.

The velocity of a particle is randomly determined by its initial .vel 
properties. Its Animation will start at a random frame.
*/

ig.module(
	'game.entities.bloodParticle'
)
.requires(
	'game.entities.particle'
)
.defines(function(){

	EntityBloodParticle = EntityParticle.extend({
		alpha: 1,
		
		lifetime: .5,
		fadetime: .4,
		bounciness: 0.1,
		friction: {x:100, y: 100},
		zIndex: 0,
		maxVel: {x:500,y:500},
		gravityFactor: .5,
		
		
		init: function( x, y, settings ) {
			this.pos.x = x;
			this.pos.y = y;
			this.vel.x = (settings.dx/20)*Math.random()/.3;
			this.vel.y = (settings.dy/20)*Math.random()/.3;
			
			this.particleSize = Math.random()*5;
			
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
			this.parent();
		},
		draw: function() {
			this.parent();
			var x = this.pos.x - ig.game.screen.x;
			var y = this.pos.y - ig.game.screen.y;
			ig.system.context.beginPath();
			ig.system.context.arc(x, y, this.particleSize, 0, Math.PI*2, true);
			ig.system.context.fillStyle = 'rgba(' + 255 + ',' + 0 + ',' + 0 + ',' + this.alpha + ')';
			ig.system.context.fill();
		}
	});


});