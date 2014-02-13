//Particle spawner.  Spawns particles based on a timer.

ig.module('game.entities.particleSpawner').requires('game.entities.particle', 'impact.entity').defines(function() {
	EntityParticleSpawner = ig.Entity.extend({
		size:{x:16,y:16},
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 0, 255, 0.4)',
		
		timer: 0, //Spawns a new particle every frame
		
		particleToSpawn: EntityParticle, //Particle that should be spawned.
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.timer = new ig.Timer(this.timer);
		},
		
		update: function() {
			this.parent();
			this.spawnParticleUpdate();
		},
		
		//Spawn particle update.  This is separated to its own function so that subclassed objects can tweak it.  This is used in smokeParticleSpawner in playerL2 to spawn particles based on health instead of time.
		spawnParticleUpdate: function() {
			if (this.timer.delta() >= 0) {
				this.spawnParticle();
				this.timer.reset();
			}
		},
		
		spawnParticle: function() {
			ig.game.spawnEntity(this.particleToSpawn, this.pos.x, this.pos.y);
		}
	});
});