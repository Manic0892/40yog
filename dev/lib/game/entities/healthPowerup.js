ig.module('game.entities.healthPowerup').requires('game.entities.powerup').defines(function() {
	EntityHealthPowerup = EntityPowerup.extend({
		maxX:0,
		maxY:5,
		minX:0,
		minY:-5,
		currX:0,
		currY:0,
		
		_wmIgnore: false,
		
		animSheet: new ig.AnimationSheet( 'media/healthPowerup.png', 32, 32 ),
		
		check: function(other) {
			other.healthPowerup(50);
			
			this.kill();
		}
	});
});