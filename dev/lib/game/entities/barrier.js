ig.module('game.entities.barrier').requires('impact.entity').defines(function() {
	EntityBarrier = ig.Entity.extend({
		size: {x:38,y:141},
		animSheet: new ig.AnimationSheet('media/barrier.png', 38,141),
		maxVel: {x:0,y:0},
		gravityFactor:0,
		
		type: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.STATIC,
		checkAgainst: ig.Entity.TYPE.A,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
		}
	})
});