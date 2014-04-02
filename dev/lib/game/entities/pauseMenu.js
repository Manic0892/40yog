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
		},
		
		//This shit is so fucking ugly
		spawnMenuItems: function(settings) {
			var text, width, height, xPos, yPos, i;
			
			for (i =0; i < this.items.length; i++) {
				width = this.font.widthForString(this.items[i].text);
				height = this.font.heightForString(this.items[i].text);
				xPos = this.initXOffset + ig.system.width/2 - width/2 + ig.game.screen.x;
				yPos = this.initYOffset+i*this.ySpacing + ig.game.screen.y;
				this.spawnMenuItem(i,width,height,xPos,yPos,settings);
			}
			
			ig.global.graphics.gradient == true ? text = "GRADIENT ON" : text = "GRADIENT OFF"; //Change the text for the gradient setting based on the current gradient setting
			//Create a function which will both set the option and the cookie for the gradient
			var exec = function() {
				ig.global.graphics.gradient = !ig.global.graphics.gradient;
				ig.global.graphics.gradient == true ? this.text = "GRADIENT ON" : this.text = "GRADIENT OFF";
				$.cookie("gradient", ig.global.graphics.gradient, {expires: 99999, path:'/'});
			}
			width = this.font.widthForString("GRADIENT OFF");
			height = this.font.heightForString("GRADIENT OFF");
			xPos = this.initXOffset + ig.system.width/2 - width/2 + ig.game.screen.x;
			yPos = this.initYOffset+i*this.ySpacing + ig.game.screen.y;
			this.menuItems.push(ig.game.spawnEntity(EntityMenuItemGraphicsOptions, xPos, yPos, {width:width, height:height, text: text, exec: exec, font: this.font, redFont: this.redFont, initXOffset: this.initXOffset})); //Use a special menu item entity that will change its width on updating to correctly draw GRAIDNET ON and GRADIENT OFF to the proper width and centered
			
			i++;
			
			//Now do main menu.
			text = 'MAIN MENU';
			width = this.font.widthForString(text);
			height = this.font.heightForString(text);
			xPos = this.initXOffset + ig.system.width/2 - width/2 + ig.game.screen.x;
			yPos = this.initYOffset+i*this.ySpacing + ig.game.screen.y;
			exec = function() {
				ig.game.togglePause();
				ig.game.loadLevelDeferred(LevelMainMenu);
				ig.music.stop();
			};
			this.menuItems.push(ig.game.spawnEntity(EntityMenuItem, xPos, yPos, {width:width, height:height, text: text, exec: exec, font: this.font, redFont: this.redFont})); //Spawn a new menuItem
		}
	});
	
	EntityMenuItemGraphics = EntityMenuItem.extend({
		init: function(x,y,settings) {
			this.parent(x,y,settings);
		},
		
		update: function() {
			if (ig.input.pressed("lbtn") && this.selected)
				this.exec();
			this.selected = false;
			//Fix the size depending on how wide the text CURRENTLY is, and fix the position to make sure it's still centered
			var width = this.font.widthForString(this.text);
			this.size.x = width;
			this.pos.x = this.initXOffset + ig.system.width/2 - width/2 + ig.game.screen.x;
		},
		
		check: function(other) {
			if (other.isCursor) this.selected = true;
		},
		
		draw: function() {
			this.selected ? this.redFont.draw(this.text, this.pos.x - ig.game.screen.x, this.pos.y - ig.game.screen.y, this.alignment) : this.font.draw(this.text, this.pos.x - ig.game.screen.x, this.pos.y - ig.game.screen.y, this.alignment);
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