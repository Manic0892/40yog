ig.module('game.entities.particleSpawner').requires('game.entities.particle', 'impact.entity').defines(function() {
	EntityParticleSpawner = ig.Entity.extend({
		size:{x:16,y:16},
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 0, 255, 0.4)',
		
		update: function() {
			this.parent();
			
		}
	});
});