ig.module('game.entities.winFlag').requires('game.entities.staticImage').defines(function() {
	EntityWinFlag = EntityStaticImage.extend({
		_wmIgnore: false,
		
		animSheet: new ig.AnimationSheet('media/winFlag.png',64,64)
	});
});