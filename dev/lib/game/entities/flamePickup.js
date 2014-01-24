//Flamethrower pickup.  Inherits from weapon pickup, in case other weapns need to be picked up in other levels, like a gun.

ig.module('game.entities.flamePickup').requires('game.entities.weaponPickup').defines(function() {
	EntityFlamePickup = EntityWeaponPickup.extend({
		size:{x:36, y:50},
		
		animSheet: new ig.AnimationSheet('media/images/sprites/blowtorch.png',36,50),
		_wmIgnore: false,
		
		weaponType: 10210897109101 //Flame.  This is the base 10 ASCII encoding of "flame."  This might be changed to just a string later.
	});
});