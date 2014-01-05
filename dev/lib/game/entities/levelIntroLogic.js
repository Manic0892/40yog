ig.module('game.entities.levelIntroLogic').requires('impact.entity', 'impact.image').defines(function() {
		EntityLevelIntroLogic = ig.Entity.extend({
			animSheet: new ig.AnimationSheet('media/Manic_Studios.png', 976, 235),
			
			size: {x:976, y:235},
			
			gravityFactor: 0,
			time:1.25,
			
			init: function(x,y,settings) {
				this.parent(x,y,settings);
				this.addAnim('idle', 1, [0]);
				this.currentAnim = this.anims.idle;
				if (!ig.global.wm) {
					ig.game.clearColor = '#000';
				}
				this.pos.x = 0;
				this.pos.y = 0;
				this.pos.x = ig.system.width/2 - this.size.x/2;
				this.pos.y = ig.system.height/2 - this.size.y/2;
				this.currentAnim.alpha = 0;
				this.timer = new ig.Timer(this.time);
			},
			
			update: function() {
				this.parent();
				this.currentAnim.alpha = Math.abs(this.timer.delta()).map(this.time,0,0,1);
				this.currentAnim.alpha = this.currentAnim.alpha.limit(0,1);
				if (this.timer.delta() >= this.time) ig.game.loadLevelDeferred(LevelMainMenu);
				if (ig.input.pressed('space') || ig.input.pressed('lbtn') || ig.input.pressed('esc')) ig.game.loadLevelDeferred(LevelMainMenu);
			},
			
			draw: function() {
				this.parent();
			}
		});
});