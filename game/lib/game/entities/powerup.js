ig.module('game.entities.powerup').requires('impact.entity').defines(function() {
	EntityPowerup = ig.Entity.extend({
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		
		maxX:0,
		maxY:5,
		minX:0,
		minY:-5,
		currX:0,
		currY:0,
		
		xUp : false,
		yUp :false,
		
		_wmIgnore: true,
		
		size: {x:32,y:32},
		offset: {x:0,y:0},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			
			this.currentAnim=this.anims.idle;
			
			this.startX = this.pos.x;
			this.startY = this.pos.y;
		},
		
		update: function() { //this could be a lot cleaner
			if (this.xUp) {
				this.currX++;
				if (this.currX >= this.maxX)
					this.xUp = !this.xUp;
			} else {
				this.currX--;
				if (this.currX <= this.minX)
					this.xUp = !this.xUp;
			}
			
			if (this.yUp) {
				this.currY++;
				if (this.currY >= this.maxY)
					this.yUp = !this.yUp;
			} else {
				this.currY--;
				if (this.currY <= this.minY)
					this.yUp = !this.yUp;
			}
			
			this.pos.x = this.startX + this.currX;
			this.pos.y = this.startY + this.currY;
			
			this.parent();
		}
	});
});