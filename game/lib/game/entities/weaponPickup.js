ig.module('game.entities.weaponPickup').requires('impact.entity').defines(function() {
	EntityWeaponPickup = ig.Entity.extend({
		size:{x:64, y:64},
		
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.TYPE.NEVER,
		
		_wmDrawBox: false,
		_wmBoxColor: 'rgba(255,224,122,0.4)',
		_wmIgnore: true,
		
		animSheet: new ig.AnimationSheet('media/null.png',64,64),
		
		checkAgainst: ig.Entity.TYPE.A,
		
		maxXDelta: 0,
		maxYDelta: 20,
		currXDiff: 1,
		currYDiff: 1,
		
		startPos:{x:0,y:0},
		
		//This method causes the image to load when the entity is declared.  Perhaps should switch to multiple entities, each of which extends this class with different animsheets?
				
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.startPos.x = this.pos.x;
			this.startPos.y = this.pos.y;
			this.addAnim('idle', 1, [0]);
		},
		
		//should really use null entities as targets for moving up and down.  TODO...
		update: function() {
			if (this.maxXDelta > 0) {
				this.pos.x += this.currXDiff;
				if (this.pos.x > this.startPos.x+this.maxXDelta || this.pos.x < this.startPos.x - this.maxXDelta)
					this.currXDiff *= -1;
			}
			if (this.maxYDelta > 0) {
				this.pos.y += this.currYDiff;
				if (this.pos.y > this.startPos.y+this.maxYDelta || this.pos.y < this.startPos.y - this.maxYDelta)
					this.currYDiff *= -1;
			}
		},
		
		check: function(other) {
			if (other.pickup) {
				other.pickup(this.weaponType);
				this.kill();
			}
		}
	});
});