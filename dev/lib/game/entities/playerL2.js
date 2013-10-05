ig.module('game.entities.playerL2').requires('game.entities.player').defines(function() {
	EntityPlayerL2 = EntityPlayer.extend({
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		checkAgainst: ig.Entity.TYPE.B,
		
		animSheet: new ig.AnimationSheet( 'media/car.png', 294, 600 ),
		
		size: {x:294, y:600},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
		},
		
		update: function() {
			this.vel.x += 1;
			this.parent();
		}
	});
});