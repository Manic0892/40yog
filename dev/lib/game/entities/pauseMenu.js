ig.module('game.entities.pauseMenu').requires('game.entities.menu', 'game.entities.slider').defines(function(){
	EntityPauseMenu = EntityMenu.extend({
		name: 'pauseMenu',
		ignorePause: true,
		
		safetyCD: 20, //this is here to fix bug where it's spawned and then kills itself but misses toggling pause again.  dumb bug.
		
		//statusFont: new ig.Font('media/bebas_neue_25_black.png'),
		
		font: new ig.Font('media/bebas_neue_50_black.png'),
		redFont: new ig.Font('media/bebas_neue_50_red.png'),
		zIndex:999,
		
		items: [
			{text:'RESUME', exec:function() {
				ig.game.togglePause();
				ig.game.getEntitiesByType(EntityPauseMenu)[0].kill(); //Fuck, this is hacky.
			}},
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
			this.musicSlider = ig.game.spawnEntity(EntityMusicSlider, x, y - 125);
			this.soundSlider = ig.game.spawnEntity(EntitySoundSlider,x,y - 40);
		},
		
		update: function() {
			this.parent();
			if (ig.input.pressed('pause') && this.safetyCD <= 0) {
				ig.game.togglePause();
				this.kill();
			}
			this.safetyCD--;
		},
		
		draw: function() {
			if (!ig.global.wm) {
				ig.system.context.beginPath();
				ig.system.context.rect(0, 0, ig.system.width, ig.system.height);
				ig.system.context.fillStyle = '#5f5f5f';
				ig.system.context.fill();
				//var soundStatus = "SOUND: " + (ig.soundManager.volume == 0 ? "MUTED" : ig.soundManager.volume*100 + "%");
				//var musicStatus = "MUSIC: " + (ig.music.volume == 0 ? "MUTED" : ig.music.volume*100 + "%");
				//this.statusFont.draw(soundStatus, 50, 50, ig.Font.ALIGN.LEFT);
				//this.statusFont.draw(musicStatus, ig.system.width-50, 50, ig.Font.ALIGN.RIGHT);
			}
			this.parent();
		},
		
		kill: function() {
			this.musicSlider.kill();
			this.soundSlider.kill();
			this.parent();
		}
	});
	
	EntityMusicSlider = EntitySlider.extend({
		title: 'Music',
		
		init: function(x,y,settings) {
			console.log(this.initVal);
			this.initVal = ig.music.volume;
			console.log(this.initVal);
			this.parent(x,y,settings);
		},
		
		sliderLogic: function() {
			ig.music.volume = this.handle.val;
		}
	});
	
	EntitySoundSlider = EntitySlider.extend({
		title: 'Sound',
		
		init: function(x,y,settings) {
			this.initVal = ig.soundManager.volume;
			this.parent(x,y,settings);
		},
		
		sliderLogic: function() {
			ig.soundManager.volume = this.handle.val;
		}
	});
});