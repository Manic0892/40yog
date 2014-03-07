//Powerup base entity.  Inherited by things like weapon and health pickups.

ig.module('game.entities.powerup').requires('impact.entity').defines(function() {
	EntityPowerup = ig.Entity.extend({
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NONE,
		checkAgainst: ig.Entity.TYPE.A, //Activate when touched by player
		
		powerupSound: new ig.Sound('media/sounds/yrrt.*'), //Yrrt sound effect plays for any powerup pickup
		playSoundOnTouch: true, //Play the sound when the powerup is touched
		
		_wmIgnore: true,
		
		size: {x:32,y:32},
		offset: {x:0,y:0},
		gravityFactor: 0,
		
		xDelta: 0, //How much the powerup should move from side to side
		yDelta: 20, //How much the poewrup should move up and down
		bobTime: .5, //How long it should take to complete its movement
		
		timer: null,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			
			this.currentAnim=this.anims.idle;
			
			//Find the positions that the powerup will move through
			this.xDelta = {low: this.pos.x, high: this.pos.x - this.xDelta};
			this.yDelta = {low: this.pos.y, high: this.pos.y - this.yDelta};
			
			this.timer = new ig.Timer();
			
			this.timer.set(this.bobTime);
		},
		
		update: function() {
			this.parent();
			var currTime = Math.abs(this.timer.delta()); //Current time it's been bobbing
			//Map the x and y positions based on the current bob time
			this.pos.x = currTime.map(0, this.bobTime, this.xDelta.low, this.xDelta.high);
			this.pos.y = currTime.map(0, this.bobTime, this.yDelta.low, this.yDelta.high);
			if (this.timer.delta() >= this.bobTime) this.timer.reset();
			
		},
		
		check: function(other) {
			if (this.playSoundOnTouch) this.powerupSound.play(); //This ensures that powerups like the health powerup don't play the sound constantly after not being picked up for one reason or another
			this.powerup(other);
			this.parent(other);
		}
	});
});