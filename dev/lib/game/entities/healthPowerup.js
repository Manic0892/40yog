ig.module('game.entities.healthPowerup').requires('game.entities.powerup').defines(function() {
	EntityHealthPowerup = EntityPowerup.extend({
		_wmIgnore: false,
		
		zIndex: -10,
		
		animSheet: new ig.AnimationSheet( 'media/health.png', 32, 32 ),
		
		powerup: function(other) {
			if (other.health < other.maxHealth) {
				other.healthPowerup(50);
				if (other.health > other.maxHealth) {
					other.health = other.maxHealth;
				}
				
				this.powerupSound.play();
				
				this.kill();
			}
		}
	});
});