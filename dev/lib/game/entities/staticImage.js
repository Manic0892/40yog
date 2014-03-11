//Static image.  Just displays an image that's not animated and doesn't collide.  Extended by other static images, like winFlag.

ig.module('game.entities.staticImage').requires('impact.entity').defines(function() {
	EntityStaticImage = ig.Entity.extend({
		size:{x:64, y:64},
		
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.TYPE.NEVER,
		
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255,224,122,0.4)',
		_wmIgnore: true,
		
		animSheet: new ig.AnimationSheet('media/images/null.png',64,64),
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
		}
	});
});