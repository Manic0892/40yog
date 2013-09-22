ig.module('game.entities.text').requires('impact.entity').defines(function() {
	EntityText = ig.Entity.extend({
		size: {x:64,y:64},
		
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0,255,0,0.4)',
		
		ignorePause: false,
		
		font: new ig.Font( 'media/impact_bitmap_25pt.png' ),
		alignment: ig.Font.ALIGN.CENTER,
		
		time: 2,
		timer: null,
		
		name: 'Text box',
		val: 'Hello, world!',
		
		activated: false,
		
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NEVER,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
		},
		
		update: function() {
			this.parent();
			if (this.activated && this.timer != null) {
				if (this.timer.delta() >= 0) {
					this.activated = false;
					this.timer = null;
				}
			} else if (this.activated && this.timer == null) {
				this.timer = new ig.Timer(this.time);
			}
		},
		
		draw: function() {
			this.parent();
			if (this.activated && !ig.global.wm) {
				this.font.draw(this.val, ig.system.width/2, 50, this.alignment);
			}
		},
		
		
		triggeredBy: function(triggered, other) {
			console.log(this.val);
			this.activated = true;
		}
	});
});