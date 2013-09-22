/*
Base entity class for particle entities. Subclass your own particles from
this class. See the EntityDebrisParticle in debris.js for an example.

Particle entities will kill themselfs after #lifetime# seconds. #fadetime#
seconds before the #lifetime# ends, they will start to fade out.

The velocity of a particle is randomly determined by its initial .vel 
properties. Its Animation will start at a random frame.
*/

ig.module(
	'game.entities.particle'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityParticle = ig.Entity.extend({
	size: {x: 4, y: 4},
	offset: {x: 0, y: 0},
	maxVel: {x: 160, y: 160},
	minBounceVelocity: 0,
	
	_wmIgnore: true,
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.LITE,
	
	lifetime: 5,
	fadetime: 1,
	bounciness: 0.6,
	friction: {x:20, y: 0}
});


});