ig.module('game.entities.pauseMenu').requires('game.entities.menu').defines(function(){
	EntityPauseMenu = EntityMenu.extend({
		name: 'pauseMenu',
		ignorePause: true,
		
		safetyCD: 20, //this is here to fix bug where it's spawned and then kills itself but misses toggling pause again.  dumb bug.
		
		statusFont: new ig.Font('media/impact_bitmap_25pt.png'),
		
		items: [
			{text:'RESUME', exec:function() {
				ig.game.togglePause();
				ig.game.getEntitiesByType(EntityPauseMenu)[0].kill(); //Fuck, this is hacky.
			}},
			{text:'TOGGLE MUSIC',exec:function() {
				ig.game.toggleMusic();
			}},
			{text:'TOGGLE SOUND EFFECTS',exec:function() {
				ig.game.toggleSound();
			}},
			{text:'MAIN MENU', exec:function() {
				ig.game.togglePause();
				ig.game.loadLevelDeferred(LevelMainMenu);
				ig.music.stop();
			}}
		],
		
		initYOffset: 100,
		
		initXOffset: 0,
		
		update: function() {
			this.parent();
			if (ig.input.pressed('pause') && this.safetyCD <= 0) {
				ig.game.togglePause();
				this.kill();
			}
			this.safetyCD--;
		},
		
		draw: function() {
			this.parent();
			if (!ig.global.wm) {
				var soundStatus = "SOUND: " + (ig.soundManager.volume == 0 ? "MUTED" : "UNMUTED");
				var musicStatus = "MUSIC: " + (ig.music.volume == 0 ? "MUTED" : "UNMUTED");
				this.statusFont.draw(soundStatus, 50, 50, ig.Font.ALIGN.LEFT);
				this.statusFont.draw(musicStatus, ig.system.width-50, 50, ig.Font.ALIGN.RIGHT);
			}
		}
	});
});