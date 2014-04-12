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

//Particle spawner.  Spawns particles based on a timer.

ig.module('game.entities.particleSpawner').requires('game.entities.particle', 'impact.entity').defines(function() {
	EntityParticleSpawner = ig.Entity.extend({
		size:{x:16,y:16},
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 0, 255, 0.4)',
		
		timer: 0, //Spawns a new particle every frame
		
		particleToSpawn: EntityParticle, //Particle that should be spawned.
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.timer = new ig.Timer(this.timer); //Initialize the timer to the correct number of seconds
		},
		
		update: function() {
			this.parent();
			this.spawnParticleUpdate();
		},
		
		//Spawn particle update.  This is separated to its own function so that subclassed objects can tweak it.  This is used in smokeParticleSpawner in playerL2 to spawn particles based on health instead of time.
		spawnParticleUpdate: function() {
			if (this.timer.delta() >= 0) {
				this.spawnParticle();
				this.timer.reset();
			}
		},
		
		//Spawn the particle.  Triggered by spawnParticleUpdate.
		spawnParticle: function() {
			ig.game.spawnEntity(this.particleToSpawn, this.pos.x, this.pos.y);
		}
	});
});