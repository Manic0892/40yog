ig.module('game.entities.loopingSoundManager').requires('impact.entity').defines(function () {
	//I hate this shit right here.
	EntityLoopingSoundManager = ig.Entity.extend({
		ignorePause: true,
		
		sounds: [],
		prevVol: 0,
		
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
			this.prevVol = ig.soundManager.volume;
		},
		
		update: function() {
			this.parent();
			if (this.prevVol != ig.soundManager.volume) {
				this.stop();
				this.play();
			}
			this.prevVol = ig.soundManager.volume;
		},
		
		loadLevel: function() {
			this.stop();
		}
	});
});