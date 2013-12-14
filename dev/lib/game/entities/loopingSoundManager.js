ig.module(
	'game.entities.loopingSoundManager'
)
.requires(
	'impact.entity'
)
.defines(function () {
	//I hate this shit right here.
	EntityLoopingSoundManager = ig.Entity.extend({
		ignorePause: true,
		
		sounds: [],
		stopped: false,
		
		add: function(sound) {
			this.sounds.push(sound);
			this.sounds[this.sounds.length-1].loop = true;
			this.sounds[this.sounds.length-1].play();
		},
		
		stop: function() {
			for (var i  = 0; i < this.sounds.length; i++) {
				this.sounds[i].stop();
			}
		},
		
		play: function() {
			for (var i  = 0; i < this.sounds.length; i++) {
				this.sounds[i].play();
			}
		},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
		},
		
		update: function() {
			this.parent();
			if (ig.soundManager.volume <= 0) {
				this.stop();
				this.stopped = true;
			} else if (this.stopped) {
				this.play();
				this.stopped = false;
			}
		},
		
		loadLevel: function() {
			this.stop();
		}
	});
});