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

//Flamethrower pickup.  Inherits from weapon pickup, in case other weapns need to be picked up in other levels, like a gun.

ig.module('game.entities.flamePickup').requires('game.entities.weaponPickup').defines(function() {
	EntityFlamePickup = EntityWeaponPickup.extend({
		size:{x:36, y:50},
		
		animSheet: new ig.AnimationSheet('media/images/sprites/blowtorch.png',36,50),
		_wmIgnore: false,
		
		weaponType: 10210897109101 //Flame.  This is the base 10 ASCII encoding of "flame."  This might be changed to just a string later.
	});
});