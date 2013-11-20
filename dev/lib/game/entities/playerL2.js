ig.module('game.entities.playerL2').requires('impact.entity').defines(function() {
	EntityPlayerL2 = ig.Entity.extend({
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		checkAgainst: ig.Entity.TYPE.B,
		
		animSheet: new ig.AnimationSheet( 'media/car.png', 261, 128),
		
		maxVel: {x:750,y:400},
		size: {x:261, y:128},
		friction: {x:0,y:2000},
		
		health:100,
		gravityFactor:0,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
			this.accel.x=100;
		},
		
		update: function() {
			//this.accel = {x:0,y:0};
			//if (ig.input.state('left') && this.vel.y < 0)
			//	this.accel.x = -400;
			//if (ig.input.state('right') && this.vel.y < 0)
			//	this.accel.x = 400;
			//if (ig.input.state('up'))
			//	this.accel.y = -200;
			//if (ig.input.state('down') && this.vel.y < 0)
			//	this.accel.y = 300;
			//if (this.vel.y > 0)
			//	this.vel.y = 0;
			//if (this.vel.y >= 0)
			//	this.vel.x = 0;
			if (ig.input.state('left') || ig.input.state('up'))
				this.vel.y = -700;
			else if (ig.input.state('right') || ig.input.state('down'))
				this.vel.y = 700;
			else
				this.vel.y = 0; //fuck dealing with acceleration and friction amirite?
			this.parent();
			//if (this.vel.x == this.maxVel.x)
			//	this.accel.x = 0;
			//else
			//	this.accel.x = 100;
		},
		
		draw: function() {
			this.parent();
		},
		
		check: function(other) {
			this.receiveDamage(10);
			//this.vel.y += 500;
			this.vel.x -= 200;
			//this.pos.y += 50;
			other.kill();
		},
		
		triggeredBy: function(triggered, other) {
			if (other.name=='winTrigger') {
				ig.music.stop();
				ig.game.loadLevelDeferred(LevelWin);
			}
		}
	});
});