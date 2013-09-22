ig.module('game.entities.staticImage').requires('impact.entity').defines(function() {
	EntityStaticImage = ig.Entity.extend({
		size:{x:64, y:64},
		
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.TYPE.NEVER,
		
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255,224,122,0.4)',
		_wmIgnore: true,
		
		animSheet: new ig.AnimationSheet('media/null.png',64,64),
		
		//This method causes the image to load when the entity is declared.  Perhaps should switch to multiple entities, each of which extends this class with different animsheets?
				
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
		}
	});
});