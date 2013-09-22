ig.module('game.entities.sunSpark').requires('impact.entity').defines(function() {
	EntitySunSpark = ig.Entity.extend({
		maxVel: {x:999,y:999},
		size:{x:10,y:10},
		
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.TYPE.NEVER,
		target: null,
		gravityFactor: 0,
		
		initVel: 40,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.target = settings.target;
			
			if (this.pos.x<this.target.pos.x) {
				this.vel.x=this.initVel;
			}
			if (this.pos.y<this.target.pos.y) {
				this.vel.y=this.initVel;
			}
			if (this.pos.x>this.target.pos.x) {
				this.vel.x=-this.initVel;
			}
			if (this.pos.y>this.target.pos.y) {
				this.vel.y=-this.initVel;
			}
			
		},
		update: function() {
			this.parent();
			if (this.pos.x<this.target.pos.x) {
				if (this.vel.x < 0)
					this.vel.x=-this.vel.x;
				this.vel.x+=5;
			}
			if (this.pos.y<this.target.pos.y) {
				if (this.vel.y < 0)
					this.vel.y=-this.vel.y;
				this.vel.y+=5;
			}
			if (this.pos.x>this.target.pos.x) {
				if (this.vel.x > 0)
					this.vel.x=-this.vel.x;
				this.vel.x-=5;
			}
			if (this.pos.y>this.target.pos.y) {
				if (this.vel.y > 0)
					this.vel.y=-this.vel.y;
				this.vel.y-=5;
			}
		},
		draw: function() {		
			var x = this.pos.x - ig.game.screen.x;
			var y = this.pos.y - ig.game.screen.y;
			
			ig.system.context.rect(0,0,ig.system.width,ig.system.height);
			var grd = ig.system.context.createRadialGradient(x,y, 40, x, y, 1000);
			grd.addColorStop(0, 'rgba(255,255,0,1)');
			grd.addColorStop(.1, 'rgba(255,255,0,.3)');
			grd.addColorStop(1, 'rgba(255,255,0,0)');
			ig.system.context.fillStyle = grd;
			ig.system.context.fill();
		},
		
		check: function(other) {
			if (other == this.target) {
				other.sunActive = true;
				this.kill();
			}
		},
		
		handleMovementTrace: function( res ) {
			// This completely ignores the trace result (res) and always
			// moves the entity according to its velocity
			this.pos.x += this.vel.x * ig.system.tick;
			this.pos.y += this.vel.y * ig.system.tick;
		}
	});
});