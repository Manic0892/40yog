//Win flag used on first level.  Represents the final part of the level that the player is trying to get to.  Inherits from staticImage.

ig.module('game.entities.winFlag').requires('game.entities.staticImage').defines(function() {
	EntityWinFlag = EntityStaticImage.extend({
		_wmIgnore: false,
		
		animSheet: new ig.AnimationSheet('media/images/sprites/winFlag.png',64,64) //Little flag that says "Win!" on it.  This should be changed.
	});
});
