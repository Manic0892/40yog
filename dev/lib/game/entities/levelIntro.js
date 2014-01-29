//Leven intro.  Handles the intro to each level, explaining the story and playing a sound clip.

/*
 *MAIN KEYS
 *titleText
 *descriptionText
 *levelToLoad
 *clip (optional)
 */
ig.module('game.entities.levelIntro').requires('impact.entity', 'game.entities.menu').defines(function(){
	EntityLevelIntro = ig.Entity.extend({
		titleFont: new ig.Font( 'media/fonts/bebas_neue_100_white.png' ),
		descriptionFont: new ig.Font('media/fonts/bebas_neue_25_white.png'),
				
		alignment: ig.Font.ALIGN.CENTER,
				
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 125, 125, 0.4)',
		
		animSheet: new ig.AnimationSheet('media/images/null.png',64,64),
		
		titleText: 'Sample Level Title', //Title.  Drawn in large font at the top of the screen.
		
		descriptionText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna\naliqua. Ut enim ad minim veniam, quis nostrud exercitation\nullamco laboris nisi ut aliquip ex ea commodo consequat. Duis\naute irure dolor in reprehenderit in voluptate velit esse cillum\ndolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\nnon proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', //Description text.  A story to explain the level.
		
		levelToLoad: null, //Level to load.  The level that should be loaded after the intro.
		
		collision: ig.Entity.COLLIDES.NONE,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		size: {x:64, y:64},
		offset: {x:0,y:0},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			
			if (!ig.global.wm) {
				ig.game.clearColor = 'black'; //Black background
			
				ig.game.spawnEntity(EntityPlayMenu, 0,0, {levelToLoad: this.levelToLoad}); //Make a menu at the bottom that loads the next level
				
				if (this.clip) {
					this.clip.play(); //If there's a sound clip too, play it
				}
			}
		},
		
		update: function() {
			this.parent();
			this.currentAnim = this.anims.idle;
			if (ig.input.pressed('enter')) ig.game.loadLevelDeferred(this.levelToLoad); //Load level if they press ENTER
		},
		
		draw: function() {
			this.parent();
			
			if (!ig.global.wm) {
				this.drawTitle();
				this.drawDescription();
			}
		},
		
		//Draw the large level title
		drawTitle: function() {
			this.titleFont.draw(this.titleText, ig.system.width/2, 0, this.alignment);
		},
		
		//Draw the story description
		drawDescription: function() {
			this.descriptionFont.draw(this.descriptionText, ig.system.width/2, 150, this.alignment);
		},
		
		loadLevel: function() {
			if (this.clip) {
				this.clip.stop(); //Stop the sound clip from playing when the level is loaded
			}
		}
	});
	
	EntityPlayMenu = EntityMenu.extend({
		name: 'playMenu',
		
		font: new ig.Font('media/fonts/bebas_neue_75_white.png'),
		redFont: new ig.Font('media/fonts/bebas_neue_75_red.png'),
		
		items: [],
		
		initXOffset: 0,
		initYOffset: 0,
		
		clearColor: 'black',
		
		alignment: ig.Font.ALIGN.CENTER,
		
		init: function(x,y,settings) {
			this.addAnim('idle', 1, [0]);
			//Load the next level when PLAY is clicked
			this.items.push({text:'PLAY', exec:function() {
				ig.game.loadLevelDeferred(this.levelToLoad);
			}});
			this.initYOffset = ig.system.height - 100;
			
			this.parent(x,y,settings);
		},
		
		spawnMenuItem: function(i,width,height,x,y,settings) {
			this.menuItems.push(ig.game.spawnEntity(EntityMenuItem, x + ig.game.screen.x, y+ig.game.screen.y, {width:width, height:height, text: this.items[i].text, exec: this.items[i].exec, clickCD: this.clickCD, font: this.font, redFont: this.redFont, levelToLoad: settings.levelToLoad}));
		}
	});
});