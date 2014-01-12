ig.module('game.entities.powerup').requires('impact.entity').defines(function() {
	EntityPowerup = ig.Entity.extend({
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		
		powerupSound: new ig.Sound('media/sounds/yrrt.*'),
		playSoundOnTouch: true,
		
		_wmIgnore: true,
		
		size: {x:32,y:32},
		offset: {x:0,y:0},
		gravityFactor: 0,
		
		xDelta: 0,
		yDelta: 20,
		bobTime: .5,
		
		timer: null,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			
			this.currentAnim=this.anims.idle;
			
			
			this.xDelta = {low: this.pos.x, high: this.pos.x - this.xDelta};
			this.yDelta = {low: this.pos.y, high: this.pos.y - this.yDelta}; //High as in high point on map, not high as in higher number.
			
			this.timer = new ig.Timer();
			
			this.timer.set(this.bobTime);
		},
		
		update: function() {
			this.parent();
			var currTime = Math.abs(this.timer.delta());
			this.pos.x = currTime.map(0, this.bobTime, this.xDelta.low, this.xDelta.high);
			this.pos.y = currTime.map(0, this.bobTime, this.yDelta.low, this.yDelta.high);
			if (this.timer.delta() >= this.bobTime) this.timer.reset();
			
		},
		
		check: function(other) {
			if (this.playSoundOnTouch) this.powerupSound.play();
			this.powerup(other);
			this.parent(other);
		}
	});
});