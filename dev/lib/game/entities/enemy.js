/*
 * Copyright 2014 Manic Studios
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

//Enemy entity.  Every enemy inherits from this.  This basically just tells every enemy to be type B (enemy type), and to check against type A (player type).

ig.module('game.entities.enemy').requires('game.entities.character').defines(function() {
	EntityEnemy = EntityCharacter.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		
		bulletDamage: true  //Probably deprecated, unless a player shooting bullets is re-integrated
	});
});