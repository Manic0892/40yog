ig.module('game.entities.L1Tutorial').requires('game.entities.staticImage').defines(function() {
	EntityL1Tutorial = EntityStaticImage.extend({
		size:{x:448, y:320},
		maxVel: {x:999,y:999},
		zIndex: -10,
		
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.TYPE.NEVER,
		
		_wmDrawBox: false,
		_wmIgnore: false,
		gravityFactor: 1,
		bounciness: .4,
		
		animSheet: new ig.AnimationSheet('media/L1Tutorial.png',448,320),
		
		//This method causes the image to load when the entity is declared.  Perhaps should switch to multiple entities, each of which extends this class with different animsheets?
				
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
		}
	});
});