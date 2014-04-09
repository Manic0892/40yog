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

//Health powerup.  GIves the palye rhealth.

ig.module('game.entities.healthPowerup').requires('game.entities.powerup').defines(function() {
	EntityHealthPowerup = EntityPowerup.extend({
		_wmIgnore: false,
		
		zIndex: -10,
		
		animSheet: new ig.AnimationSheet( 'media/images/sprites/health.png', 32, 32 ),
		
		playSoundOnTouch: false, //Ensures that the player doesn't have the sound play by simply touching the powerup.  This fixes a bug where a player at max health could touch the health powerup and hear the sound play until they moved off of it.
		
		powerup: function(other) {
			if (other.health < other.maxHealth) { //Make sure the player isn't already at max health
				other.healthPowerup(50); //Call the player's healthPowerup to add 50 health
				
				this.powerupSound.play(); //Play the sound, since the powerup doesn't play the sound on touch
				
				this.kill(); //Kill the powerup to keep the player from picking it up again
			}
		}
	});
});