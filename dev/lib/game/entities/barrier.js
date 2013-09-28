ig.module('game.entities.barrier').requires('impact.entity').defines(function() {
	EntityBarrier = ig.Entity.extend({
		size: {x:200,y:141},
		animSheet: new ig.AnimationSheet('media/barrier.png', 200,141),
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
		}
	})
});