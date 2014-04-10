/*
 * Copyright 2014 Sean McGeer
 *
 * This file is part of the 40 Year Old Game.
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

//Music slider.  Inherits from slider

ig.module('game.entities.sliderMusic').requires('game.entities.slider').defines(function(){	
	//Music slider.  Used to change the music volume.
	EntitySliderMusic = EntitySlider.extend({
		title: 'Music',
		
		init: function(x,y,settings) {
			this.initVal = ig.music.volume; //Get the initial music volume to correctly set the slider
			this.parent(x,y,settings);
		},
		
		sliderLogic: function() {
			ig.music.volume = this.handle.val; //Set the music volume to the correct value
			$.cookie("music", ig.music.volume, {expires: 99999, path:'/'}); //Set the cookie so it's not lost between playthroughs
		}
	});
});