ig.module('game.entities.cursor').requires('impact.entity').defines(function() {
	EntityCursor = ig.Entity.extend({
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.NEVER,
		type: ig.Entity.TYPE.get('cursor'),
		
		name:'cursor',
		
		size: {x:0, y:0},
		offset: {x:16,y:16},
		
		ignorePause:true,
		
		_wmIgnore: true,
		
		undetectableByMouse: true, //fix for drag and drop plugin
		isCursor: true,
		
		animSheet: new ig.AnimationSheet('media/images/cursor.png', 32, 32),
		
		zIndex: 99999999999,
		
		init: function(x,y,settings) {
			this.addAnim('normal', 1, [0]);
			this.addAnim('crosshair', 1, [1]);
			this.addAnim('pointer', 1, [2]);
			this.currentAnim = this.anims.normal;
			this.parent(x,y,settings);
			ig.game.sortEntitiesDeferred();
			this.def = settings.def;
			this.curr = this.def;
		},
		
		update: function() {
			this.pos.x = ig.input.mouse.x + ig.game.screen.x;
			this.pos.y = ig.input.mouse.y + ig.game.screen.y;
			
			switch(this.curr) {
				case 0:
					this.currentAnim = this.anims.normal;
					break;
				case 1:
					this.currentAnim = this.anims.crosshair;
					break;
				case 2:
					this.currentAnim = this.anims.pointer;
					break;
				case null:
					this.currentAnim = null;
					break;
				default:
					this.currentAnim = this.anims.normal;
					break;
			}
			this.curr = this.def;
		},
		
		check: function(other) {
			if (other.cursor) {
				this.curr = other.cursor;
			}
		},
		
		draw: function() {
			if(this.currentAnim) {
				this.currentAnim.draw(ig.input.mouse.x-this.offset.x, ig.input.mouse.y-this.offset.y);
			}
		}
	});
});