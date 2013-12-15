/*
 *MAIN KEYS
 *titleText
 *descriptionText
 *levelToLoad
 */
ig.module('game.entities.levelIntro').requires('impact.entity', 'game.entities.menu').defines(function(){
	EntityLevelIntro = ig.Entity.extend({
		titleFont: new ig.Font( 'media/bebas_neue_100_white.png' ),
		descriptionFont: new ig.Font('media/bebas_neue_25_white.png'),
				
		alignment: ig.Font.ALIGN.CENTER,
				
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 125, 125, 0.4)',
		
		animSheet: new ig.AnimationSheet('media/null.png',64,64),
		
		titleText: 'Sample Level Title',
		
		descriptionText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna\naliqua. Ut enim ad minim veniam, quis nostrud exercitation\nullamco laboris nisi ut aliquip ex ea commodo consequat. Duis\naute irure dolor in reprehenderit in voluptate velit esse cillum\ndolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\nnon proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		
		levelToLoad: 'LevelMainMenu',
		
		collision: ig.Entity.COLLIDES.NONE,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		size: {x:64, y:64},
		offset: {x:0,y:0},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			
			if (!ig.global.wm) {
				ig.game.clearColor = 'black';
				
				this.levelToLoad = eval(this.levelToLoad);
			
				ig.game.spawnEntity(EntityPlayMenu, 0,0, {levelToLoad: this.levelToLoad});
			}
		},
		
		update: function() {
			this.parent();
			this.currentAnim = this.anims.idle;
		},
		
		draw: function() {
			this.parent();
			
			if (!ig.global.wm) {
				this.drawTitle();
				this.drawDescription();
			}
		},
		
		drawTitle: function() {
			this.titleFont.draw(this.titleText, ig.system.width/2, 0, this.alignment);
		},
		
		drawDescription: function() {
			this.descriptionFont.draw(this.descriptionText, ig.system.width/2, 150, this.alignment);
		},
	});
	
	EntityPlayMenu = EntityMenu.extend({
		name: 'playMenu',
		
		safetyCD: 20, //this is here to fix bug where it's spawned and then kills itself but misses toggling pause again.  dumb bug.
		
		font: new ig.Font('media/bebas_neue_75_white.png'),
		redFont: new ig.Font('media/bebas_neue_75_red.png'),
		
		items: [],
		
		initXOffset: 0,
		initYOffset: 0,
		
		clearColor: 'black',
		
		alignment: ig.Font.ALIGN.CENTER,
		
		init: function(x,y,settings) {
			this.levelToLoad = settings.levelToLoad;
			this.items.push({text:'PLAY', levelToLoad: this.levelToLoad, exec:function() {
				ig.game.loadLevelDeferred(this.levelToLoad);
			}});
			this.initYOffset = ig.system.height - 100;
			this.parent();
		},
		
		update: function() {
			this.parent();
			this.safetyCD--;
		},
		
		draw: function() {
			this.parent();
		}
	});
});