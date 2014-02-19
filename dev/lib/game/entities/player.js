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
				this.spawnArm(); //Spawn the arm
				this.shootTimer = new ig.Timer(this.shootTimer); //Set the timer for shots.  This is used to dtermine how much time should occur between shots.
			}
			
			// Add the default animations
			this.addAnims();
		},
		
		//Add the default animations
		addAnims: function() {
			this.addAnim( 'idle', .5, [0,1,2,3] );
			this.addAnim( 'run', 0.25, [4,5,6,7,8,9] );
		},
		
		//Spawn the arm.  Player should probably have a subclass, playerWithArm, which should be used by all the players that use arms, like the one on level 1.
		spawnArm: function() {
			this.arm = ig.game.spawnEntity(EntityArm, this.pos.x,this.pos.y, {attachee: this});
		},
		
		update: function() {
			var accel = this.standing ? this.accelGround : this.accelAir; //Set the acceleration that will be applied based on if it's in the air or on the ground
			if( ig.input.state('left') ) { //If the player wants to go left, go left
				if (this.vel.x > 0) { //If moving right, apply friction.  Otherwise, the acceleration would negate friction.
					this.vel.x -= this.friction.x/60;
				}
				this.accel.x = -accel; //Set the accel to go left
				this.flip = true; //Set the character to flip the correct way
			}
			else if( ig.input.state('right') ) { //If the player wants to go right go right
				if (this.vel.x < 0) {//If moving left, apply friction.  Otherwise, the acceleration would negate friction.
					this.vel.x += this.friction.x/60;
				}
				this.accel.x = accel; //Set the accel to go right
				this.flip = false;
			}
			else {
				this.accel.x = 0; //If no key was pressed, set the acceleration to zero
			}
			
			this.currentAnim.flip.x = this.flip; //Flip the current animation based on the flip variable that we checked for
			
			//If the player presses jump or up and is standing on the ground, apply a velocity to make them go into the air
			if( this.standing && (ig.input.pressed('jump') || ig.input.pressed('up')) ) {
				this.vel.y = -this.jump;
			}
			
			//If the player presses the shoot key and the current time between shots has been met, then shoot
			if( ig.input.state('lbtn') && this.shootTimer.delta() >= 0) {
				this.shoot();
				this.shootTimer.reset(); //Reset the timer for the next time we check
			}
			
			
			//Set the current animation, based on the current speed
			if( this.vel.y < 0 ) {
				this.currentAnim = this.anims.run; //Jump animation.  Should be a real animation instead of just the run animation.
			}
			else if( this.vel.y > 0 ) {
				this.currentAnim = this.anims.run; //Fall animation.  Should be a real animation instead of just the run animation.
			}
			else if( this.vel.x != 0 ) { //If not standing still, play the run animation
				this.currentAnim = this.anims.run;
			}
			else { //If not moving at all, stand still
				this.currentAnim = this.anims.idle;
			}
				
			//Make the player flash when hit by an enemy or enemy projectile.  This lets the player know that they were just hurt and are currently invulnerable.
			if (this.hitTimer.delta() < 0) {
				this.hitFlashCurrTick += this.hitTimer.tick(); //Get the tick of the current alpha of the hit flash by checking the tick of the hit timer
				if (this.hitFlashCurrTick >= this.hitFlashTick) { //If the current accumulated tick is greater than a set amount, change the alpha and reset the current flash tick
					this.hitFlashCurrAlpha == this.hitFlashAlpha ? this.hitFlashCurrAlpha = 1 : this.hitFlashCurrAlpha = this.hitFlashAlpha;
					this.hitFlashCurrTick = 0;
				}
				this.currentAnim.alpha = this.hitFlashCurrAlpha; //Set the alpha so we get a nice little flash going on
			} else {
				this.currentAnim.alpha = 1; //However, if the crrent hit timer has run out and the player is vulnerable to hits again, set to full alpha
			}
			this.parent();
			
			this.arm.attacheeUpdate(this.pos.x, this.pos.y, this.flip, this.currentAnim.alpha); //Update the arm based on the new paramaters we just set
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