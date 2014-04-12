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

//Rising variety of ashParticle.  Used mostly when the flamethrower hits a bedbug in level one.

ig.module('game.entities.ashParticleRising').requires('game.entities.ashParticle','impact.entity-pool').defines(function(){
	EntityAshParticleRising = EntityAshParticle.extend({
		gravityFactor: 0,
		
		init: function( x, y, settings ) {
			this.parent(x,y,settings);
			this.pos.x = x;
			this.pos.y = y;
			//Color is 0 - black
			this.color = 0;
			//Randomize velocity for upward and random lateral movement
			this.vel.y = -100 - Math.random()*25;
			this.vel.x = Math.random()*200 - 100;
			
			this.idleTimer = new ig.Timer();
		},
		
		reset: function(x,y,settings) {
			this.parent(x,y,settings);
			this.pos.x = x;
			this.pos.y = y;
			this.color = 0;
			this.vel.y = -100 - Math.random()*25;
			this.vel.x = Math.random()*200 - 100;
		},
		
		
		update: function() {
			this.color +=5 
			this.parent();
		}
	});
	
	ig.EntityPool.enableFor(EntityAshParticleRising);
});