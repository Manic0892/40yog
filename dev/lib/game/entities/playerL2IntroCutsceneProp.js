ig.module('game.entities.playerL2IntroCutsceneProp').requires('impact.entity').defines(function() {
	EntityPlayerL2IntroCutsceneProp = ig.Entity.extend({
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		checkAgainst: ig.Entity.TYPE.B,
		
		animSheet: new ig.AnimationSheet( 'media/L2CutscenePlayerProp.png', 64, 55),
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', [0]);
			this.addAnim('walk', [0,1,0,2]);
		}
	});
});