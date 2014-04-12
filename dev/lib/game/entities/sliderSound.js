/*
 * Copyright 2014 Sean McGeer
 *
 * This file is part of the 40 Year Old Game.
 *
 * The 40 Year Old Game is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The 40 Year Old Game is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with the 40 Year Old Game.  If not, see <http://www.gnu.org/licenses/>.
*/

//Sound slider.  Inherits from slider.

ig.module('game.entities.sliderSound').requires('game.entities.slider').defines(function(){
	EntitySliderSound = EntitySlider.extend({
		title: 'Sound',
		
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