ig.module('game.entities.healthPowerup').requires('game.entities.powerup').defines(function() {
	EntityHealthPowerup = EntityPowerup.extend({
		maxX:0,
		maxY:5,
		minX:0,
		minY:-5,
		currX:0,
		currY:0,
		
		_wmIgnore: false,
		
		zIndex: -10,
		
		animSheet: new ig.AnimationSheet( 'media/health.png', 32, 32 ),
		
		check: function(other) {
			if (other.health < other.maxHealth) {
				other.healthPowerup(50);
				if (other.health > other.maxHealth) {
					other.health = other.maxHealth;
				}
				this.kill();
			}
		}
	});
});