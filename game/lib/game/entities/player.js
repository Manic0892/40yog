ig.module(
	'game.entities.player'
).requires(
	'game.entities.character'
).defines(function() {
	EntityPlayer = EntityCharacter.extend({
		
		size:{x:32,y:64},
		
		maxVel: {x: 400, y: 400},
		friction: {x: 500, y: 0},
		
		animSheet: new ig.AnimationSheet( 'media/player.png', 32, 64 ),
		
		//arm: new EntityArm(this.x,this.y, {attachee: this}),
		
		type:ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		
		flip: false,
		accelGround: 700,
		accelAir: 400,
		jump: 600,
		health: 100,
		maxHealth: 100,
		cooldown: 40,
		
		zIndex: -9,
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			if (!ig.global.wm)
				this.spawnArm();
			
			// Add the animations
			this.addAnim( 'idle', .5, [0,1,2,3] );
			this.addAnim( 'run', 0.25, [4,5,6,7,8,9] );
			console.log('init');
		},
		
		spawnArm: function() {
			this.arm = ig.game.spawnEntity(EntityArm, this.pos.x,this.pos.y, {attachee: this});
		},
		
		update: function() {
			// move left or right
			var accel = this.standing ? this.accelGround : this.accelAir;
			if( ig.input.state('left') ) {
				this.accel.x = -accel;
				this.flip = true;
			}
			else if( ig.input.state('right') ) {
				this.accel.x = accel;
				this.flip = false;
			}
			else {
				this.accel.x = 0;
			}
			
			
			// jump
			if( this.standing && ig.input.state('jump') ) {
				this.vel.y = -this.jump;
			}
			
			// shoot
			if( ig.input.state('shoot') && this.cooldown == 0) {
				this.shoot();
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
			
			if (this.cooldown > 0)
				this.cooldown--;
							
			// move!
			this.parent();
			
			this.arm.attacheeUpdate(this.pos.x, this.pos.y, this.flip);
			//console.log(this.arm.pos, this.pos);
			
			
			
			var collisionMapRef = ig.game.collisionMap;
			
			if (this.pos.y > collisionMapRef.height*collisionMapRef.tilesize + 400) {
				ig.music.stop();
				ig.game.loadLevelDeferred(LevelMainMenu);
			}
		},
		
		receiveDamage: function(amount, other) {
			if (this.health - amount <= 0) {
				ig.music.stop();
				ig.game.loadLevelDeferred(LevelMainMenu);
			}
			this.parent(amount, other);
		},
		
		healthPowerup: function(amount) {
			this.health += amount;
		},
		
		shoot: function() {
			console.log('shooting...');
		//	ig.game.spawnEntity( EntityBullet, this.pos.x+this.size.x/2, this.pos.y+this.size.y/2, {flip:this.flip, d:{x:ig.input.mouse.x, y:ig.input.mouse.y}} );
		//	this.gunshot.play();
		//	this.cooldown = 20;
		//	this.arm.fire();
		},
		
		pickup: function(other) {
			console.log('picked up' + other);
		}
	});
	
	EntityArm = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/arm.png', 32, 8),
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
		
		update: function() {
			//console.log(this.currentAnim);
			//if (this.currentAnim) {
			//	this.currentAnim.flip.x = this.flip;
			//	
			//	if (this.firingAnimCD < 0) {
			//		this.currentAnim = this.anims.notShooting;
			//	} else {
			//		this.currentAnim = this.anims.shooting;
			//	}			
			//	
			//	var angle = Math.atan2(ig.input.mouse.y - this.pos.y + ig.game.screen.y, ig.input.mouse.x - this.pos.x + ig.game.screen.x);
			//	
			//	if (this.flip) {
			//		this.pos.x -= this.attachedTo.size.x - 10;
			//		this.currentAnim.pivot.x = this.size.x;
			//		angle += Math.PI;
			//	} else {
			//		this.currentAnim.pivot.x = 0;
			//	}
			//	
			//	this.currentAnim.angle = angle;
			//}
			
			
			this.parent();
		},
		
		attacheeUpdate: function(x,y, shouldFlip) { //you can't just set the pos of the arm to the pos of the attachee.  What the fuck?
			this.pos = {x:x+10, y:y+25};
			this.flip = shouldFlip;
		},
		
		draw: function() {
			this.parent();
		}
	});
});