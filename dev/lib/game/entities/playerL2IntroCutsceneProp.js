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

//Cutscene prop for the intro cutscene of level 2.  Moves to the car aand enables it.

ig.module('game.entities.playerL2IntroCutsceneProp').requires('impact.entity').defines(function() {
	EntityPlayerL2IntroCutsceneProp = ig.Entity.extend({
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NEVER,
		checkAgainst: ig.Entity.TYPE.B,
		gravityFactor: 0,
		
		animSheet: new ig.AnimationSheet( 'media/images/sprites/L2CutscenePlayerProp.png', 64, 55),
		
		size: {x:64, y:55},
		
		currWaypoint: null, //Next waypoint to head towards.  The waypoints are set in Weltmeister.
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]); //This will probably never be used
			this.addAnim('walk', .2, [0,1,0,2]);
			this.currentAnim = this.anims.walk;
		},
		
		update: function() {
			this.parent();
			if (this.currWaypoint != null) { //If there's a current waypoint, move towards it
				if (Math.abs(this.currWaypoint.pos.x - this.pos.x) > 2) {
					if (this.currWaypoint.pos.x > this.pos.x) {
						this.pos.x += 2;
					} else if (this.currWaypoint.pos.x < this.pos.x) {
						this.pos.x -= 2;
					}
				}
				
				if (Math.abs(this.currWaypoint.pos.y - this.pos.y) > 2) {
					if (this.currWaypoint.pos.y > this.pos.y) {
						this.pos.y += 2;
					} else if (this.currWaypoint.pos.y < this.pos.y) {
						this.pos.y -= 2;
					}
				}

				//Rotate the prop so it's facing the same direction it's running
				var angle = Math.atan2(this.currWaypoint.pos.y - this.pos.y, this.currWaypoint.pos.x - this.pos.x);
				angle += (90).toRad();
				this.currentAnim.angle = angle;
			}
		},
		
		//Start something when it's triggered, such as start the car or move towards the next waypoint
		triggeredBy: function(triggered, other) {
			//Move to the next waypoint
			if (other.hasNextWaypoint) {
				this.currWaypoint = ig.game.getEntityByName(other.nextWaypoint);
			} else {
				if (this.opening) { //If it's the starting cutscene, enable the car and remove itself
					ig.game.getEntityByName('PlayerL2').enable();
					this.kill();
				} else { //If it's the ending cutscene, load the level win screen
					ig.game.loadLevelDeferred(LevelWin2);
				}
			}
		}
	});
});
