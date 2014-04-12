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

//Couch entity.  It's used to spawn bedbugs on level 1.

ig.module('game.entities.couch').requires('impact.entity', 'game.entities.enemyBedbug').defines(function() {
	EntityCouch = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/images/sprites/couch.png', 128, 64),
		
		size: {x:128,y: 64},
		
		offset:{x:0,y:0},
		
		type: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NONE,
		
		health: 100,
		
		zIndex: -10,
		
		bulletDamage: false, //Deprecated.  Level 1 used to be all about using bullets to kill bedbugs, but since then it has changed to be about using a flamethrower
		
		spawnCD: 3.5, //Time in seconds between there being a chance to spawn a bedbug
				
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('init', 1, [0]);
			this.addAnim('damaged', 1, [1]);
			this.addAnim('dead', 1, [2]);
			
			this.currentAnim = this.anims.init;
			this.spawnTimer = new ig.Timer(this.spawnCD);
		},
		
		update: function() {
			this.parent();
			
			//Change animation based on how much it's been damaged
			if (this.health >50) {
				this.currentAnim = this.anims.init;
			} else if (this.health > 0) {
				this.currentAnim = this.anims.damaged;
			} else if (this.health <= 0) {
				this.currentAnim = this.anims.dead;
			}
			
			//Every 3.5 seconds, this gives the couch a 50% chance to spawn a bedbug as long as the couch hasn't been burnt down to <0 health
			if (this.spawnTimer.delta() >= 0 && this.health > 0) {
				var playerPos = ig.game.getEntitiesByType(EntityPlayer)[0].pos;
				if (Math.random() > .5 && playerPos.x > this.pos.x - 500 && playerPos.x < this.pos.x + 500 && playerPos.y > this.pos.y - 500 && playerPos.y < this.pos.y + 500) {
					this.spawnEnemy();
				}
				this.spawnTimer.reset();
			}
		},
		
		//Spawn bedbug
		spawnEnemy: function() {
			ig.game.spawnEntity(EntityEnemyBedbug, this.pos.x, this.pos.y+32);
		},
		
		kill: function() {
			//just keeps you from losing the couch when it's dead
			this.dead = true;
		},
		
		//You used to be able to "capture" the sun and use it to kill couches and bedbugs, but was removed from the game due to not making much sesne.  This function has therefore been deprecated.
		receiveSunDamage: function(damage, other) {
			damage *= 4;
			this.receiveDamage(damage, other);
			if (this.health > 0) {
				for (i = 0; i < 1; i++) {
					ig.game.spawnEntity(EntityAshParticle, this.pos.x, this.pos.y, {width: this.size.x, height: this.size.y});
				}
			}
		}
	});
});