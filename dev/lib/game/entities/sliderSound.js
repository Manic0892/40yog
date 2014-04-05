//Sound slider.  Inherits from slider.

ig.module('game.entities.sliderSound').requies('game.entities.slider').defines(function(){
	EntitySliderSound = EntitySlider.extend({
		title: 'Sound',
		
		labelFont: new ig.Font('media/fonts/bebas_neue_40_black.png'),
		titleFont: new ig.Font('media/fonts/bebas_neue_40_black.png'),
		
		init: function(x,y,settings) {
			this.initVal = ig.soundManager.volume; //Set the slider to the correct position for the current sound volume
			this.parent(x,y,settings);
		},
		
		//Set the sound volume and a cookie to persist across play sessions
		sliderLogic: function() {
			ig.soundManager.volume = this.handle.val;
			$.cookie("sound", ig.soundManager.volume, {expires: 99999, path:'/'});
		}
	});
});