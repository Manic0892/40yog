//Pause menu.  Spawned by the level entity when the game is paused.  Used to display options.

ig.module('game.entities.pauseMenu').requires('game.entities.menu', 'game.entities.slider').defines(function(){
	EntityPauseMenu = EntityMenu.extend({
		name: 'pauseMenu',
		ignorePause: true, //Ignore the regular game pause.  Having this pause would keep it from working as intended.
		
		safetyTimer: .25, //This is here to fix bug where it's spawned and then kills itself but misses toggling pause again.  Dumb bug.
		
		font: new ig.Font('media/fonts/bebas_neue_50_black.png'),
		redFont: new ig.Font('media/fonts/bebas_neue_50_red.png'),
		zIndex:999, //Make sure it's drawn on top of everything in the level.
		
		items: [
			//Resume the game.  This toggles the pause (unpauses) and cleans up the pause menu entity.
			{text:'RESUME', exec:function() {
				ig.game.togglePause();
				var parentEntity = ig.game.getEntityByName('pauseMenu'); //Fuck, this is hacky.  Since we can't use this because the menu entity is separate from the pause menu, we have to find and kill the pause menu.
				parentEntity.parentLevel.safetyTimer.reset(); //Resets the safety timer on the level.
				parentEntity.kill();
			}},
			//Spaces to allow room for the sliders
			{text:'',exec:function() {
			}},
			{text:'',exec:function() {
			}},
			{text:'',exec:function() {
			}},
			{text:'',exec:function() {
			}},
			{text:'MAIN MENU', exec:function() {
				ig.game.togglePause();
				ig.game.loadLevelDeferred(LevelMainMenu);
				ig.music.stop();
			}}
		],
		
		initYOffset: 100,
		
		initXOffset: 0,
		
		ySpacing: 50,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			x = ig.game.screen.x + ig.system.width/2;
			y = ig.game.screen.y + ig.system.height/2;
			//Spawn the music and sound sliders
			this.musicSlider = ig.game.spawnEntity(EntityMusicSlider, x, y - 115);
			this.soundSlider = ig.game.spawnEntity(EntitySoundSlider,x,y - 30);
			this.safetyTimer = new ig.Timer(this.safetyTimer); //Set the safety timer
		},
		
		update: function() {
			this.parent();
			if (ig.input.pressed('esc') && this.safetyTimer.delta() >= 0) { //Does the same thing as clicking "RESUME" but with a keypress
				ig.game.togglePause();
				this.parentLevel.safetyTimer.reset();
				this.kill();
			}
		},
		
		draw: function() {
			if (!ig.global.wm) {
				//Block out the level so we can see the menu options
				ig.system.context.beginPath();
				ig.system.context.rect(0, 0, ig.system.width, ig.system.height);
				ig.system.context.fillStyle = '#5f5f5f';
				ig.system.context.fill();
			}
			this.parent();
		},
		
		kill: function() {
			//Clean up the sliders and menu items before killing itself
			this.musicSlider.kill();
			this.soundSlider.kill();
			for (var i = 0; i < this.menuItems.length; i++) {
				this.menuItems[i].kill();
			}
			this.parent();
		}
	});
	
	//Music slider.  Used to change the music volume.
	EntityMusicSlider = EntitySlider.extend({
		title: 'Music',
		
		init: function(x,y,settings) {
			this.initVal = ig.music.volume; //Get the initial music volume to correctly set the slider
			this.parent(x,y,settings);
		},
		
		sliderLogic: function() {
			ig.music.volume = this.handle.val; //Set the music volume to the correct value
			$.cookie("music", ig.music.volume, {expires: 99999, path:'/'}); //Set the cookie so it's not lost between playthroughss
		}
	});
	
	//Sound slider.  Used to change the sound volume.
	EntitySoundSlider = EntitySlider.extend({
		title: 'Sound',
		
		init: function(x,y,settings) {
			this.initVal = ig.soundManager.volume; //Get the initial sound volume to correctly set the slider
			this.parent(x,y,settings);
		},
		
		sliderLogic: function() {
			ig.soundManager.volume = this.handle.val; //Set the sound manager volume to the correct value
			$.cookie("sound", ig.soundManager.volume, {expires: 99999, path:'/'}); //Set the cookie so it's not lost between playthroughs
		}
	});
});