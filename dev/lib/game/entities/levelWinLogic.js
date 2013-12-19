ig.module('game.entities.levelWinLogic').requires('impact.entity', 'game.entities.menu').defines(function(){
	EntityLevelWinLogic = ig.Entity.extend({
		font: new ig.Font( 'media/bebas_neue_50_black.png' ),
		
		initYOffset: 25,
		
		initXOffset: 0,
				
		alignment: ig.Font.ALIGN.CENTER,
				
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 125, 125, 0.4)',
		
		animSheet: new ig.AnimationSheet('media/null.png',64,64),
		
		text: "Congratulations!\nYou won!\nPlay again?",
		
		collision: ig.Entity.COLLIDES.NONE,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		size: {x:64, y:64},
		offset: {x:0,y:0},
		
		beat: "l0",
		
		nextLevel:null,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
			
			if (!ig.global.wm) {
				ig.game.spawnEntity(EntityWinMenu,0,0,{nextLevel:this.nextLevel});
				ig.game.clearColor = '#fff';
				$.cookie(this.beat, "beat", {expires: 99999, path:'/'});
			}
		},
		
		draw: function() {
			this.parent();
			
			if (!ig.global.wm) {
				this.font.draw(this.text, this.initXOffset + ig.system.width/2, this.initYOffset, this.alignment);
			}
		}
	});
	
	EntityWinMenu = EntityMenu.extend({
		name: 'winMenu',
		
		items: [
			{text:'MAIN MENU',exec:function() {
				ig.game.loadLevel(LevelMainMenu);
			}}
		],
		
		initYOffset: 500,
		
		initXOffset: 0,
		
		init:function(x,y,settings) {
			if (settings.nextLevel != null) {
				this.items.unshift({text:'NEXT LEVEL', exec:function() {
					ig.game.loadLevel(settings.nextLevel);
				}});
				this.initYOffset -= 100;
			}
			this.parent(x,y,settings);
		}
	});
});