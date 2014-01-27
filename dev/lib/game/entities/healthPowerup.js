//Health powerup.  GIves the palye rhealth.

ig.module('game.entities.healthPowerup').requires('game.entities.powerup').defines(function() {
	EntityHealthPowerup = EntityPowerup.extend({
		_wmIgnore: false,
		
		zIndex: -10,
		
		animSheet: new ig.AnimationSheet( 'media/images/sprites/health.png', 32, 32 ),
		
		playSoundOnTouch: false, //Ensures that the player doesn't have the sound play by simply touching the powerup.  This fixes a bug where a player at max health could touch the health powerup and hear the sound play until they moved off of it.
		
		powerup: function(other) {
			if (other.health < other.maxHealth) { //Make sure the player isn't already at max health
				other.healthPowerup(50); //Call the player's healthPowerup to add 50 health
				
				this.powerupSound.play(); //Play the sound, since the powerup doesn't play the sound on touch
				
				this.kill(); //Kill the powerup to keep the player from picking it up again
			}
		}
	});
});