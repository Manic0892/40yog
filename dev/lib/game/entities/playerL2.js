ig.module('game.entities.playerL2').requires('game.entities.player').defines(function() {
	EntityPlayerL2 = EntityPlayer.extend({
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		checkAgainst: ig.Entity.TYPE.B,
		
		animSheet: new ig.AnimationSheet( 'media/car.png', 294, 600 ),
		
		maxVel: {x:50,y:400},
		size: {x:294, y:600},
		
		health:100,
		gravityFactor:0,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
		},
		
		update: function() {
			this.vel.y += 1;
			this.parent();
		},
		
		draw: function() {
			this.parent();
		},
		
		check: function(other) {
			this.receiveDamage(10);
			other.kill();
		}
	});
});