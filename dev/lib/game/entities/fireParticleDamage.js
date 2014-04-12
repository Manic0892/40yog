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

//Fire particle damage.  Used on level one for the flamethrower to shoot out and kill couches and bedbugs.

ig.module('game.entities.fireParticleDamage').requires('game.entities.particle', 'game.entities.ashParticleRising', 'impact.entity-pool').defines(function() {
	EntityFireParticleDamage = EntityParticle.extend({
		checkAgainst: ig.Entity.TYPE.B, //Check against enemy
		lifetime: .3,
		fadetime: .2,
		bounciness: 0,
		friction: {x:0,y:0},
		gravityFactor: 0,
		
		maxVel: {x:9999,y:9999}, //Essentially unlimited speed
		
		velMult: 500, //Used in order to change the particle's direction.  See below.
		defParticleSize: 10,
		finalParticleSize: 40,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.initAll(x,y,settings); //Used so init and reset can share less code
		},
		
		reset: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.initAll(x,y,settings); //Used so init and reset can share less code
		},
		
		//Used so init and reset can share less code
		initAll: function(x,y,settings){
			this.r = 255;
			this.g = 255;
			this.b = 0;
			this.a = 1;
			this.color = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
			
			this.idleTimer = new ig.Timer();
			this.particleSize = this.defParticleSize;
			
			
			//Calculate the direction vector so that the fire particle goes from the player to the mouse
			this.vel.x = ig.game.screen.x+settings.d.x - this.pos.x; 
			this.vel.y = settings.d.y+ ig.game.screen.y- this.pos.y;
			var vectorLength = Math.sqrt(this.vel.x*this.vel.x + this.vel.y*this.vel.y);
			this.vel.x /= vectorLength;
			this.vel.y /= vectorLength;
			//velMult is used here to multiiply the x and y components of the direction vector so that the particle moves quickly
			this.vel.x*=this.velMult;
			this.vel.y*=this.velMult;
			this.pos.x += this.vel.x/30;
			this.pos.y += this.vel.y/30;
		},
		
		update: function() {
			//Make the particle larger.  Should probably scale with the timer instead of an iterator.
			this.particleSize = this.idleTimer.delta().map(0, this.lifetime, this.defParticleSize, this.finalParticleSize);
			
			if (this.idleTimer.delta() > this.lifetime) {
				this.kill();
				return;
			}
			this.a = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1,0.1); //Fade out over time
			this.g -= 20; //Transition yellow -> red
			if (this.g < 0) this.g = 0; //Make sure the g portion doesn't go negative
			this.parent();
		},
		
		draw: function() {
			this.parent();
			
			//Correct for screen position
			var x = this.pos.x - ig.game.screen.x;
			var y = this.pos.y - ig.game.screen.y;
			
			//Use radial gradient if gradient are on, or a regular circle if gradients are off for performance
			if (ig.global.graphics.gradient == true) {
				var grd = ig.system.context.createRadialGradient(x, y, this.particleSize, x, y, this.particleSize+20);
				grd.addColorStop(0, 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')');
				grd.addColorStop(1, 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',0)');
				
				ig.system.context.fillStyle = grd;
				var partSizeBuff = this.particleSize + 20; //This just ensures that we'll be drawing a large enough rectangle for the gradient to fill
				ig.system.context.fillRect(x-partSizeBuff,y-partSizeBuff,x+partSizeBuff, y+partSizeBuff);
			} else {
				ig.system.context.beginPath();
				ig.system.context.arc(x, y, this.particleSize, 0, Math.PI*2, true);
				ig.system.context.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
				ig.system.context.fill();
			}
			

		},
		
		//Damage entityBedbug or entityCouch
		check: function(other) {
			
			//If other is not dead, spawn rising ash particles and damage it
			if (!other.dead) {
				ig.game.spawnEntity(EntityAshParticleRising,this.pos.x,this.pos.y);
				other.receiveDamage( 2, this );
				this.kill();
			}
		}
	});
	
	ig.EntityPool.enableFor(EntityFireParticleDamage);
});