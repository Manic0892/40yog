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

//Static entity on level 2.  The player can crash into these and they damage the car and slow it down slightly.

ig.module('game.entities.barrier').requires('impact.entity').defines(function() {
	EntityBarrier = ig.Entity.extend({
		size: {x:38,y:141},
		animSheet: new ig.AnimationSheet('media/images/sprites/barrier_comp.png', 38,141),
		maxVel: {x:0,y:0},
		gravityFactor:0,
		health: 1,
		
		zIndex: -1,
		
		type: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.STATIC,
		checkAgainst: ig.Entity.TYPE.A,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			//We don't want the entity to disappear entirely when it dies, hence the two animations--once for normal and once for a shattered barrier that's been run into.
			this.addAnim('idle', 1, [0]);
			this.addAnim('dead', 1, [1]);
			this.currentAnim = this.anims.idle;
		},
		
		//This overwrites the normal kill function to just switch the animation and reduce the health so that playerL2 doesn't count its damage anymore instead of removing the entity altogether.
		kill: function() {
			this.currentAnim = this.anims.dead;
			this.health--;
		}
	})
});