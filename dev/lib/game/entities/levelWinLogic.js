ig.module('game.entities.levelWinLogic').requires('impact.entity').defines(function(){
	EntityLevelWinLogic = ig.Entity.extend({
		font: new ig.Font( 'media/impact_bitmap_large_yellow.png' ),
		
		initYOffset: 25,
		
		initXOffset: 0,
				
		alignment: ig.Font.ALIGN.CENTER,
				
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 125, 125, 0.4)',
		
		animSheet: new ig.AnimationSheet('media/null.png',64,64),
		
		collision: ig.Entity.COLLIDES.NONE,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		size: {x:64, y:64},
		offset: {x:0,y:0},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			
			if (!ig.global.wm) {
				ig.game.clearColor = '#969696';
			}
		},
		
		update: function() {
			this.parent();
			
			this.currentAnim = this.anims.idle;
		},
		
		draw: function() {
			this.parent();
			
			if (!ig.global.wm) {
				this.font.draw('Congratulations!\nYou won!\nPlay again?', this.initXOffset + ig.system.width/2, this.initYOffset, this.alignment);
			}
		}
	});
	
	
});