ig.module('game.entities.playerL2').requires('ig.entities.player').defines(function() {
	EntityPlayerL2 = EntityPlayer.extend({
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		checkAgainst: ig.Entity.TYPE.B,
		
		animSheet: new ig.AnimationSheet( 'media/car.png', 294, 600 )
	});
});