ig.module('game.entities.pauseMenu').requires('game.entities.menu').defines(function(){
	EntityPauseMenu = EntityMenu.extend({
		name: 'pauseMenu',
		ignorePause: true,
		
		safetyCD: 20, //this is here to fix bug where it's spawned and then kills itself but misses toggling pause again.  dumb bug.
		
		statusFont: new ig.Font('media/bebas_neue_25_black.png'),
		
		font: new ig.Font('media/bebas_neue_50_black.png'),
		redFont: new ig.Font('media/bebas_neue_50_red.png'),
		
		items: [
			{text:'RESUME', exec:function() {
				ig.game.togglePause();
				ig.game.getEntitiesByType(EntityPauseMenu)[0].kill(); //Fuck, this is hacky.
			}},
			{text:'MUSIC +',exec:function() {
				var newVol = ig.music.volume * 10;
				newVol += 1;
				ig.music.volume = newVol/10;
				if (ig.music.volume > 1) ig.music.volume = 1;
			}},
			{text:'MUSIC -',exec:function() {
				var newVol = ig.music.volume * 10;
				newVol -= 1;
				ig.music.volume = newVol/10;
				if (ig.music.volume < 0) ig.music.volume = 0;
			}},
			{text:'SOUND +',exec:function() {
				var newVol = ig.soundManager.volume * 10;
				newVol += 1;
				ig.soundManager.volume = newVol/10;
				if (ig.soundManager.volume > 1) ig.soundManager.volume = 1;
			}},
			{text:'SOUND -',exec:function() {
				var newVol = ig.soundManager.volume * 10;
				newVol -= 1;
				ig.soundManager.volume = newVol/10;
				if (ig.soundManager.volume < 0) ig.soundManager.volume = 0;
			}},
			//{text:'TOGGLE MUSIC',exec:function() {
			//	ig.game.toggleMusic();
			//}},
			//{text:'TOGGLE SOUND EFFECTS',exec:function() {
			//	ig.game.toggleSound();
			//}},
			{text:'MAIN MENU', exec:function() {
				ig.game.togglePause();
				ig.game.loadLevelDeferred(LevelMainMenu);
				ig.music.stop();
			}}
		],
		
		initYOffset: 100,
		
		initXOffset: 0,
		
		ySpacing: 50,
		
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
				var soundStatus = "SOUND: " + (ig.soundManager.volume == 0 ? "MUTED" : ig.soundManager.volume*100 + "%");
				var musicStatus = "MUSIC: " + (ig.music.volume == 0 ? "MUTED" : ig.music.volume*100 + "%");
				this.statusFont.draw(soundStatus, 50, 50, ig.Font.ALIGN.LEFT);
				this.statusFont.draw(musicStatus, ig.system.width-50, 50, ig.Font.ALIGN.RIGHT);
			}
			this.parent();
		}
	});
});