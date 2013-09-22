ig.module('game.entities.sunPowerup').requires('game.entities.powerup').defines(function() {
	EntitySunPowerup = EntityPowerup.extend({
		maxX:0,
		maxY:5,
		minX:0,
		minY:-5,
		currX:0,
		currY:0,
		
		_wmIgnore: false,
		
		animSheet: new ig.AnimationSheet( 'media/sunPowerup.png', 32, 32 ),
		
		check: function(other) {
			other.sunPowerup(50);
			
			this.kill();
		}
	});
});