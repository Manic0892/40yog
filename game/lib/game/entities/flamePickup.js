ig.module('game.entities.flamePickup').requires('game.entities.weaponPickup').defines(function() {
	EntityFlamePickup = EntityWeaponPickup.extend({
		size:{x:36, y:50},
		
		animSheet: new ig.AnimationSheet('media/blowtorch.png',36,50),
		
		maxXDelta: 0,
		maxYDelta: 20,
		currXDiff: 1,
		currYDiff: 1,
		_wmIgnore: false,
		
		weaponType: 10210897109101 //flame
	});
});