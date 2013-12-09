ig.module('game.entities.playerL2IntroCutsceneProp').requires('impact.entity').defines(function() {
	EntityPlayerL2IntroCutsceneProp = ig.Entity.extend({
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NEVER,
		checkAgainst: ig.Entity.TYPE.B,
		gravityFactor: 0,
		
		animSheet: new ig.AnimationSheet( 'media/L2CutscenePlayerProp.png', 64, 55),
		
		carSound: new ig.Sound('media/sound/engine.*'),
		
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
				if (this.currWaypoint.pos.x > this.pos.x) {
					this.pos.x += 1;
				} else if (this.currWaypoint.pos.x < this.pos.x) {
					this.pos.x -= 1;
				}
				
				if (this.currWaypoint.pos.y > this.pos.y) {
					this.pos.y += 1;
				} else if (this.currWaypoint.pos.y < this.pos.y) {
					this.pos.y -= 1;
				}
				var ninetyDegrees = 90 * (Math.PI/180);
				var angle = Math.atan2(this.currWaypoint.pos.y - this.pos.y + ig.game.screen.y, this.currWaypoint.pos.x - this.pos.x + ig.game.screen.x);
				angle += ninetyDegrees;
				this.currentAnim.angle = angle;
			}
		},
		
		triggeredBy: function(triggered, other) {
			if (other.hasNextWaypoint) {
				this.currWaypoint = ig.game.getEntityByName(other.nextWaypoint);
			} else {
				ig.game.getEntityByName('PlayerL2').enabled = true;
				ig.music2 = new ig.Music();
				ig.music2.add(this.carSound);
				ig.music2.volume = 0.1;
				ig.music2.play();
				this.kill();
			}
		}
	});
});