//Options menu.  Used on the options screen in the main menu.

ig.module('game.entities.optionsMenu').requires('game.entities.menu', 'game.entities.slider').defines(function() {
	EntityOptionsMenu = EntityMenu.extend({
		name: 'optionsMenu',
		
		font: new ig.Font('media/fonts/bebas_neue_100_black.png'),
		redFont: new ig.Font('media/fonts/bebas_neue_100_red.png'),
		
		//Start with an option to return to the main menu
		items: [
			{text:'MAIN MENU', exec:function() {
				ig.game.loadLevelDeferred(LevelMainMenu);
			}}
		],
		
		initYOffset: 296,
		
		initXOffset: 256,
		
		ySpacing: 100,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			if (!ig.global.wm) {
				x = ig.game.screen.x + ig.system.width/2;
				y = ig.game.screen.y + ig.system.height/2;
				//Add music and sound sliders
				this.musicSlider = ig.game.spawnEntity(EntitySliderMusic, x + this.initXOffset, 50);
				this.soundSlider = ig.game.spawnEntity(EntitySliderSound, x + this.initXOffset, 150);
			}
		},
		
		//Spawn the rest of the menu items.  This is more specialized than the default spawnMenuItems because we need to add extra options
		spawnMenuItems: function(settings) {
			var text;
			ig.global.graphics.gradient == true ? text = "GRADIENT ON" : text = "GRADIENT OFF"; //Change the text for the gradient setting based on the current gradient setting
			//Create a function which will both set the option and the cookie for the gradient
			var exec = function() {
				ig.global.graphics.gradient = !ig.global.graphics.gradient;
				ig.global.graphics.gradient == true ? this.text = "GRADIENT ON" : this.text = "GRADIENT OFF";
				$.cookie("gradient", ig.global.graphics.gradient, {expires: 99999, path:'/'});
			}
			var width = this.font.widthForString("GRADIENT OFF");
			var height = this.font.heightForString("GRADIENT OFF");
			var xPos = this.initXOffset + ig.system.width/2 - width/2 + ig.game.screen.x;
			var yPos = this.initYOffset+-1*this.ySpacing + ig.game.screen.y;
			this.menuItems.push(ig.game.spawnEntity(EntityMenuItemGraphicsOptions, xPos, yPos, {width:width, height:height, text: text, exec: exec, font: this.font, redFont: this.redFont, initXOffset: this.initXOffset})); //Use a special menu item entity that will change its with on updating to correctly draw GRAIDNET ON and GRADIENT OFF to the proper width and centered
			for (var i = 0; i < this.items.length; i++) {
				width = this.font.widthForString(this.items[i].text);
				height = this.font.heightForString(this.items[i].text);
				xPos = this.initXOffset + ig.system.width/2 - width/2 + ig.game.screen.x;
				yPos = this.initYOffset+i*this.ySpacing + ig.game.screen.y;
				this.spawnMenuItem(i,width,height,xPos,yPos,settings);
			}
		}
	});
	
	EntityMenuItemGraphicsOptions = EntityMenuItem.extend({
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
});