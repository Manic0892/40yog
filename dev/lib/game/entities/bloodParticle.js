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

//Blood particle entity--currently unused.

ig.module('game.entities.bloodParticle').requires('game.entities.particle').defines(function(){
	EntityBloodParticle = EntityParticle.extend({
		alpha: 1,
		
		lifetime: .5,
		fadetime: .4,
		bounciness: 0.1,
		friction: {x:100, y: 100},
		zIndex: 0,
		maxVel: {x:500,y:500},
		gravityFactor: .5,
		
		
		init: function( x, y, settings ) {
			this.pos.x = x;
			this.pos.y = y;
			//Randomize settings to allow for a nice non-uniform look
			this.vel.x = (settings.dx/20)*Math.random()/.3;
			this.vel.y = (settings.dy/20)*Math.random()/.3;
			
			this.particleSize = Math.random()*5;
			
			this.idleTimer = new ig.Timer();
		},
		
		
		update: function() {
			if( this.idleTimer.delta() > this.lifetime ) {
				this.kill();
				return;
			}
			this.alpha = this.idleTimer.delta().map(
				this.lifetime - this.fadetime, this.lifetime,
				1, 0.1
			);
			this.parent();
		},
		draw: function() {
			this.parent();
			//Correct for position in screen pixels instead of game pixels, since we're using the canvas to draw the particles.
			var x = this.pos.x - ig.game.screen.x;
			var y = this.pos.y - ig.game.screen.y;
			ig.system.context.beginPath();
			ig.system.context.arc(x, y, this.particleSize, 0, Math.PI*2, true);
			ig.system.context.fillStyle = 'rgba(' + 255 + ',' + 0 + ',' + 0 + ',' + this.alpha + ')';
			ig.system.context.fill();
		}
	});
});