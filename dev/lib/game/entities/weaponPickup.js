ig.module('game.entities.weaponPickup').requires('game.entities.powerup').defines(function() {
	EntityWeaponPickup = EntityPowerup.extend({
		size:{x:64, y:64},
		
		_wmDrawBox: false,
		_wmBoxColor: 'rgba(255,224,122,0.4)',
		_wmIgnore: true,
		
		animSheet: new ig.AnimationSheet('media/null.png',64,64),
		
		bobTime: 1.5,
		
		powerup: function(other) {
			if (other.pickup) {
				other.pickup(this.weaponType);
				this.kill();
			}
		}
	});
});