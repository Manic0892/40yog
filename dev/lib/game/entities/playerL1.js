//Player used on level 1.  Inherits from the base player entity

ig.module('game.entities.playerL1').requires('game.entities.player', 'game.entities.fireParticleDamage').defines(function() {
	EntityPlayerL1 = EntityPlayer.extend({
		fireSound: new ig.Sound('media/sounds/fire2.*'), //Played when shooting
		soundTimer: new ig.Timer(35/60), //Time limit for when the fire sound shold play
		shootTimer: .001, //Shoot very quickly
		
		gruntSound: new ig.Sound('media/sounds/grunt.*'), //Hurt sound
		splatSound: new ig.Sound('media/sounds/splat.*'), //Death sound
		
		flameActive: false,
		
		maxVel: {x: 400, y: 10000000000000},
		accelGround: 2000,
		friction: {x:2000, y:0},
		accelAir: 1000,
		jump: 800,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			if (!ig.global.wm) {
				this.fireSound.volume = 1;
			}
		},
		
		spawnArm: function() {
			this.arm = ig.game.spawnEntity(EntityArmL1, this.pos.x,this.pos.y, {attachee: this});
		},
		
		update: function() {
			this.parent();
			
			var collisionMapRef = ig.game.collisionMap;
			
			if (this.pos.y > collisionMapRef.height*collisionMapRef.tilesize + 400) {
				ig.music.stop();
				this.splatSound.play();
				this.endOfLevel(false);
			}
		},
		
		triggeredBy: function(triggered, other) {
			if (other.name=='winTrigger') {
				ig.music.stop();
				this.endOfLevel(true);
			}
		},
		
		shoot: function() {
			if (this.flameActive) {
				ig.game.spawnEntity( EntityFireParticleDamage, this.pos.x+this.size.x/2, this.pos.y+this.size.y/2, {flip:this.flip, d:{x:ig.input.mouse.x, y:ig.input.mouse.y}, vel:this.vel} );
				if (this.soundTimer.delta() >= 0) {
					this.fireSound.play();
					this.soundTimer.reset();
				}
			}
		},
		
		pickup: function(other) {
			if (other == 10210897109101) {
				this.arm.pickupFlame();
				this.flameActive = true;
			}
		},
		
		receiveDamage: function(amount, from) {
			this.parent(amount, from);
			this.gruntSound.play();
		},
		
		endOfLevel: function(win) {
			win ? ig.game.loadLevelDeferred(LevelWin1) : ig.game.loadLevelDeferred(LevelLose1);
		}
	});
	
	EntityArmL1 = EntityArm.extend({
		animSheet: new ig.AnimationSheet('media/images/sprites/arm_l1.png',24,8),
		size: {x:24,y:8},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('empty', 1, [0]);
			this.addAnim('blowtorch', 1, [1]);
			
			this.currentAnim = this.anims.empty;
		},
		
		update: function() {
			this.currentAnim.flip.x = this.flip;	
			
			var angle = Math.atan2(ig.input.mouse.y - this.pos.y + ig.game.screen.y, ig.input.mouse.x - this.pos.x + ig.game.screen.x);
			
			if (this.flip) {
				this.pos.x -= this.attachedTo.size.x - 10;
				this.currentAnim.pivot.x = this.size.x;
				angle += Math.PI;
			} else {
				this.currentAnim.pivot.x = 0;
			}
			
			this.currentAnim.angle = angle;
			
			
			this.parent();
		},
		
		pickupFlame: function() {
			this.currentAnim = this.anims.blowtorch;
		}
	});
});