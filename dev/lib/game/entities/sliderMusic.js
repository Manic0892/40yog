//Music slider.  Inherits from slider

ig.module('game.entities.sliderMucis').requires('game.entities.sliderMusic'),defines(function(){	
	//Music slider.  Used to change the music volume.
	EntitySliderMusic = EntitySlider.extend({
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
});