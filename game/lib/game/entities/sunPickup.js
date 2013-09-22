ig.module('game.entities.sunPickup').requires('game.entities.weaponPickup').defines(function() {
	EntitySunPickup = EntityWeaponPickup.extend({
		size:{x:32, y:32},
		
		animSheet: new ig.AnimationSheet('media/sunPickup.png',32,32),
		
		maxXDelta: 0,
		maxYDelta: 20,
		currXDiff: 1,
		currYDiff: 1,
		_wmIgnore: false,
		
		weaponType: 8301115117110 //sun
	});
});