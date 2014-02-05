//Looping sound manager.  It's created by things that need to loop a sound over and over.  Normally Impact's sound loop would work, but in order to stop and change the volume of the sound, this entity is needed to keep track of all the sounds and not have to perform actions to each one individually.  This might change if Impact's sound system changes.

ig.module('game.entities.loopingSoundManager').requires('impact.entity').defines(function () {
	EntityLoopingSoundManager = ig.Entity.extend({
		ignorePause: true, //You want to be able to change the volume in the options menu and have this update the sound accordingly
		
		sounds: [], //Array of different sounds to loop
		prevVol: 0, //Previous volume, initialized to zero.  This is used to detect changes in the soundManager volume and change the looping sound volume accordingly.
		
		//Add a sound to be looped
		add: function(sound) {
			this.sounds.push(sound); //Add the sound to the array
			this.sounds[this.sounds.length-1].loop = true; //Set it to loop
			this.sounds[this.sounds.length-1].play(); //Start the sound
		},
		
		//Stop all sounds
		stop: function() {
			for (var i  = 0; i < this.sounds.length; i++) {
				this.sounds[i].stop();
			}
		},
		
		//Play all sounds
		play: function() {
			for (var i  = 0; i < this.sounds.length; i++) {
				this.sounds[i].play();
			}
		},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.prevVol = ig.soundManager.volume; //Initialize prevVol
		},
		
		update: function() {
			this.parent();
			if (this.prevVol != ig.soundManager.volume) { //If the sound volume has changed, stop and re-start all sounds registered.  This resets the volume for the sounds to the new volume.
				this.stop();
				this.play();
			}
			this.prevVol = ig.soundManager.volume; //Change the prevVol to the new volume so it can be re-checked on the next tick
		},
		
		loadLevel: function() {
			this.stop(); //Stop all sounds when a new level is loaded
		}
	});
});