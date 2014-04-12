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

//Bedbug entity.  Used primarily on level 1.  Bedbugs are both placed on the level initially and spawned by couches.  They move side to side and hurt the player if they touch them.  Killed by the flamethrower on level 1.

ig.module('game.entities.enemyBedbug').requires('game.entities.enemy'/*,'plugins.perpixel' */).defines(function() {
	EntityEnemyBedbug = EntityEnemy.extend({
		collides: ig.Entity.COLLIDES.PASSIVE,
		
		maxVel: {x: 400, y: 400},
		friction: {x: 300, y: 0},
		size:{x:64,y:64},
		offset:{x:0,y:0},
		speed:100,
		
		health:50,
		
		animSheet: new ig.AnimationSheet( 'media/images/sprites/bedbug.png', 64, 64 ),
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			this.addAnim('walk', .3, [0,1]);
			this.currentAnim = this.anims.walk;
		},
		
		update: function() {
			//If the bedbug has reached the edge of a platform or has hit a wall and needs to turn around
			if(!ig.game.collisionMap.getTile(this.pos.x + (this.flip ? +4 : this.size.x -4), this.pos.y + this.size.y+1))
				this.flip = !this.flip;
			if(ig.game.collisionMap.getTile(this.pos.x + (this.flip ?- 4 : this.size.x+4),this.pos.y + 10))
				this.flip = !this.flip;
			
			//Go left or right
			var xdir = this.flip ? -1 : 1;
			this.vel.x = this.speed * xdir;
			
			this.parent();
		},
		
		//If the bedbug hits Entity.TYPE.A, it deals 10 damage to it and kills itself.
		check: function( other ) {
			other.receiveDamage( 10, this );
			this.kill();
		}
	});
});