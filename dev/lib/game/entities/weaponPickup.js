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

//Weapon pickup entity.  Inherits from powerup.

ig.module('game.entities.weaponPickup').requires('game.entities.powerup').defines(function() {
	EntityWeaponPickup = EntityPowerup.extend({
		size:{x:64, y:64},
		
		_wmDrawBox: false,
		_wmBoxColor: 'rgba(255,224,122,0.4)',
		_wmIgnore: true,
		
		animSheet: new ig.AnimationSheet('media/images/null.png',64,64),
		
		bobTime: 1.5, //Time it takes to bob up and down
		
		powerup: function(other) {
			if (other.pickup) { //If the other entity is a player, trigger the pickup for this and despawn the entity
				other.pickup(this.weaponType);
				this.kill();
			}
		}
	});
});
