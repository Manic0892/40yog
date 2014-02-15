//Player base entity class.  Should b used for any player.

ig.module('game.entities.player').requires('game.entities.character').defines(function() {
	EntityPlayer = EntityCharacter.extend({
		
		size:{x:32,y:64},
		
		maxVel: {x: 400, y: 400},
		
		animSheet: new ig.AnimationSheet( 'media/images/sprites/player.png', 32, 64 ), //Default spritesheet.  Lil' Schmitty with one arm.
		
		type:ig.Entity.TYPE.A, //Player type
		collides: ig.Entity.COLLIDES.PASSIVE,
		
		flip: false, //Boolean for if it's facing the default direction (left) or flipped (right)
		accelGround: 2000, //X acceleration rate when moving on ground
		friction: {x:2000, y:0}, //Friction.  We want to slow down when moving left-right but not when jumping.
		accelAir: 1000, //X acceleration rate when moving through the air
		jump: 1000, //Velocity to apply when the jump key is pressed
		health: 100,
		maxHealth: 100, //maxHealth is used to draw the percentage of health in the healthbar, as well as to make sure the player is not healed past a certain point by healthPowerUp
		shootTimer: 40/60, //Time between shots
		
		hitTimer: new ig.Timer(), //Time between hits
		hitFlashDuration: 3, //Time the player should be flashing when hit.  The player is also invincible during this time.
		hitFlashTick: .5, //Time between flashes
		hitFlashCurrTick: 0, //Current time between flashes
		hitFlashAlpha: .3, //Alpha for the flash
		hitFlashCurrAlpha: 1, //Current alpha for the flash
		
		zIndex: -9, //Drawn before most things
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			if (!ig.global.wm) {
				this.spawnArm();
				this.shootTimer = new ig.Timer(this.shootTimer);
			}
			
			// Add the default animations
			this.addAnims();
		},
		
		//Add the default animations
		addAnims: function() {
			this.addAnim( 'idle', .5, [0,1,2,3] );
			this.addAnim( 'run', 0.25, [4,5,6,7,8,9] );
		},
		
		spawnArm: function() {
			this.arm = ig.game.spawnEntity(EntityArm, this.pos.x,this.pos.y, {attachee: this});
		},
		
		update: function() {
			// move left or right
			var accel = this.standing ? this.accelGround : this.accelAir;
			if( ig.input.state('left') ) {
				if (this.vel.x > 0) {
					this.vel.x -= this.friction.x/60;
				}
				this.accel.x = -accel;
				this.flip = true;
			}
			else if( ig.input.state('right') ) {
				if (this.vel.x < 0) {
					this.vel.x += this.friction.x/60;
				}
				this.accel.x = accel;
				this.flip = false;
			}
			else {
				this.accel.x = 0;
			}
			
			
			// jump
			if( this.standing && (ig.input.pressed('jump') || ig.input.pressed('up')) ) {
				this.vel.y = -this.jump;
			}
			
			// shoot
			if( ig.input.state('lbtn') && this.shootTimer.delta() >= 0) {
				this.shoot();
				this.shootTimer.reset();
			}
			
			
			// set the current animation, based on the player's speed
			if( this.vel.y < 0 ) {
				this.currentAnim = this.anims.run;
			}
			else if( this.vel.y > 0 ) {
				this.currentAnim = this.anims.run;
			}
			else if( this.vel.x != 0 ) {
				this.currentAnim = this.anims.run;
			}
			else {
				this.currentAnim = this.anims.idle;
			}
			
			this.currentAnim.flip.x = this.flip;
				
			//hit flashing code
			if (this.hitTimer.delta() < 0) {
				this.hitFlashCurrTick += this.hitTimer.tick();
				if (this.hitFlashCurrTick >= this.hitFlashTick) {
					this.hitFlashCurrAlpha == this.hitFlashAlpha ? this.hitFlashCurrAlpha = 1 : this.hitFlashCurrAlpha = this.hitFlashAlpha;
					this.hitFlashCurrTick = 0;
				}
				this.currentAnim.alpha = this.hitFlashCurrAlpha;
			} else {
				this.currentAnim.alpha = 1;
			}
			// move!
			this.parent();
			
			this.arm.attacheeUpdate(this.pos.x, this.pos.y, this.flip, this.currentAnim.alpha);
			//console.log(this.arm.pos, this.pos);
		},
		
		receiveDamage: function(amount, other) {
			if (this.hitTimer.delta() >= 0) {
				if (this.health - amount <= 0) {
					ig.music.stop();
					this.endOfLevel(false);
				}
				this.hitTimer.set(this.hitFlashDuration);
				this.hitTimer.tick();
				this.hitFlashCurrAlpha = this.hitFlashAlpha;
				this.hitFlashCurrTick = 0;
				this.parent(amount, other);
			}
		},
		
		healthPowerup: function(amount) {
			this.health += amount;
			if (this.health > this.maxHealth)
				this.health = this.maxHealth;
		},
		
		shoot: function() {
			console.log('shooting...');
		},
		
		pickup: function(other) {
			console.log('picked up' + other);
		},
		
		endOfLevel: function(win) {
			console.log("No end of level logic supplied.");
		}
	});
	
	EntityArm = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/images/sprites/arm.png', 32, 8),
		size: {x:32, y:8},
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NONE,
		gravityFactor: 0,
		
		flip: false,
		
		zIndex: -8,
		
		receiveDamage: function(amount, other) {
			this.attachedTo.receiveDamage(amount,other);
		},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.pos.x = x;
			this.pos.y = y;

			this.attachedTo = settings.attachee;
		},
		
		attacheeUpdate: function(x,y, shouldFlip, alpha) { //you can't just set the pos of the arm to the pos of the attachee.  What the fuck?
			this.pos = {x:x+10, y:y+25};
			this.flip = shouldFlip;
			this.currentAnim.alpha = alpha;
		},
		
		draw: function() {
			this.parent();
		}
	});
});