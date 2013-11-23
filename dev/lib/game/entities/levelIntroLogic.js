ig.module('game.entities.levelIntroLogic').requires('impact.entity', 'impact.image').defines(function() {
		EntityLevelIntroLogic = ig.Entity.extend({
			animSheet: new ig.AnimationSheet('media/Manic_Studios.png', 976, 235),
			
			size: {x:976, y:235},
			
			gravityFactor: 0,
			alphaIterator: .005,
			
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
			},
			
			update: function() {
				this.parent();
				this.currentAnim.alpha += this.alphaIterator;
				if (this.currentAnim.alpha > 1){
					this.alphaIterator *= -1;
				} else if (this.currentAnim.alpha < 0) {
					ig.game.loadLevel(LevelMainMenu);
					this.currentAnim.alpha = 0;
				}
			},
			
			draw: function() {
				this.parent();
			}
		});
});