ig.module('game.entities.optionsMenu').requires('game.entities.menu', 'game.entities.slider').defines(function() {
	EntityOptionsMenu = EntityMenu.extend({
		name: 'optionsMenu',
		
		safetyTimer: .25, //this is here to fix bug where it's spawned and then kills itself but misses toggling pause again.  dumb bug.
		
		font: new ig.Font('media/bebas_neue_100_black.png'),
		redFont: new ig.Font('media/bebas_neue_100_red.png'),
		
		items: [
			{text:'MAIN MENU', exec:function() {
				ig.game.loadLevelDeferred(LevelMainMenu);
			}}
		],
		
		initYOffset: 450,
		
		initXOffset: 0,
		
		ySpacing: 50,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			if (!ig.global.wm) {
				x = ig.game.screen.x + ig.system.width/2;
				y = ig.game.screen.y + ig.system.height/2;
				this.musicSlider = ig.game.spawnEntity(EntityMusicSlider_Options, x, y - 130);
				this.soundSlider = ig.game.spawnEntity(EntitySoundSlider_Options,x,y);
			}
		}
	});
	
	EntityMusicSlider_Options = EntitySlider.extend({
		title: 'Music',
		
		labelFont: new ig.Font('media/bebas_neue_40_black.png'),
		titleFont: new ig.Font('media/bebas_neue_75_black.png'),
		
		init: function(x,y,settings) {
			this.initVal = ig.music.volume;
			this.parent(x,y,settings);
		},
		
		sliderLogic: function() {
			ig.music.volume = this.handle.val;
			$.cookie("music", ig.music.volume, {expires: 99999, path:'/'});
		}
	});
	
	EntitySoundSlider_Options = EntitySlider.extend({
		title: 'Sound',
		
		labelFont: new ig.Font('media/bebas_neue_40_black.png'),
		titleFont: new ig.Font('media/bebas_neue_75_black.png'),
		
		init: function(x,y,settings) {
			this.initVal = ig.soundManager.volume;
			this.parent(x,y,settings);
		},
		
		sliderLogic: function() {
			ig.soundManager.volume = this.handle.val;
			$.cookie("sound", ig.soundManager.volume, {expires: 99999, path:'/'});
		}
	});
});