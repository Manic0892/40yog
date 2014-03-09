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
