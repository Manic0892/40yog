ig.module('game.entities.playerL2IntroCutsceneProp').requires('impact.entity').defines(function() {
	EntityPlayerL2IntroCutsceneProp = ig.Entity.extend({
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NEVER,
		checkAgainst: ig.Entity.TYPE.B,
		gravityFactor: 0,
		
		animSheet: new ig.AnimationSheet( 'media/L2CutscenePlayerProp.png', 64, 55),
		
		size: {x:64, y:55},
		
		currWaypoint: null,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
			this.addAnim('walk', .2, [0,1,0,2]);
			this.currentAnim = this.anims.walk;
		},
		
		update: function() {
			this.parent();
			if (this.currWaypoint != null) {
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
				var x1,x2,y1,y2;
				//if (this.currWaypoint.pos.y > )
				var angle = Math.atan2(this.currWaypoint.pos.y - this.pos.y, this.currWaypoint.pos.x - this.pos.x);
				angle += (90).toRad();
				this.currentAnim.angle = angle;
			}
		},
		
		triggeredBy: function(triggered, other) {
			if (other.hasNextWaypoint) {
				this.currWaypoint = ig.game.getEntityByName(other.nextWaypoint);
			} else {
				if (this.opening) {
					ig.game.getEntityByName('PlayerL2').enable();
					this.kill();
				} else {
					ig.game.loadLevelDeferred(LevelWin2);
				}
			}
		}
	});
});