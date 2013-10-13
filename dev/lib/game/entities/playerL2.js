ig.module('game.entities.playerL2').requires('impact.entity').defines(function() {
	EntityPlayerL2 = ig.Entity.extend({
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		checkAgainst: ig.Entity.TYPE.B,
		
		animSheet: new ig.AnimationSheet( 'media/car.png', 128, 261 ),
		
		maxVel: {x:200,y:750},
		size: {x:128, y:261},
		friction: {x:100,y:200},
		
		health:100,
		gravityFactor:0,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
		},
		
		update: function() {
			this.accel = {x:0,y:0};
			if (ig.input.state('left') && this.vel.y < 0)
				this.accel.x = -100;
			if (ig.input.state('right') && this.vel.y < 0)
				this.accel.x = 100;
			if (ig.input.state('up'))
				this.accel.y = -200;
			if (ig.input.state('down') && this.vel.y < 0)
				this.accel.y = 300;
			if (this.vel.y > 0)
				this.vel.y = 0;
			if (this.vel.y >= 0)
				this.vel.x = 0;
			this.parent();
		},
		
		draw: function() {
			this.parent();
		},
		
		check: function(other) {
			this.receiveDamage(10);
			this.vel.y += 500;
			this.vel.x = 0;
			//this.pos.y += 50;
			other.kill();
		}
	});
});