//Weapon pickup entity.  Inherits from powerup.

ig.module('game.entities.weaponPickup').requires('game.entities.powerup').defines(function() {
	EntityWeaponPickup = EntityPowerup.extend({
		size:{x:64, y:64},
		
		_wmDrawBox: false,
		_wmBoxColor: 'rgba(255,224,122,0.4)',
		_wmIgnore: true,
		
		animSheet: new ig.AnimationSheet('media/images/null.png',64,64),
		
		bobTime: 1.5, //Time it takes to bob up and down
		
		powerup: function(other) {
			if (other.pickup) { //If the other entity is a player, trigger the pickup for this and despawn the entity
				other.pickup(this.weaponType);
				this.kill();
			}
		}
	});
});
