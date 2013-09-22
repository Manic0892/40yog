//CURRENTLY UNUSED.  This is just the basic player that actually works and which you'd want in most levels for testing.

ig.module(
	'game.entities.gunPlayer'
).requires(
	'game.entities.player'
).defines(function() {
	EntityGunPlayer = EntityPlayer.extend({
		
		size:{x:32,y:64},
		
		maxVel: {x: 400, y: 400},
		friction: {x: 500, y: 0},
		
		animSheet: new ig.AnimationSheet( 'media/player.png', 32, 64 ),
		
		gunshot: new ig.Sound('media/sound/gun.*'),
		
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
			ig.game.spawnEntity( EntityBullet, this.pos.x+this.size.x/2, this.pos.y+this.size.y/2, {flip:this.flip, d:{x:ig.input.mouse.x, y:ig.input.mouse.y}} );
			this.gunshot.play();
			this.cooldown = 20;
			this.arm.fire();
		},
		
		pickup: function(other) {
			console.log('picked up' + other);
		}
	});
	
	EntityArm = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/arm.png', 32, 8),
		size: {x:32, y:8},

		firingAnimCD: 0,

		init: function(x,y,settings) {;
			this.addAnim('notShooting', 1, [0]);
			this.addAnim('shooting', 1, [1]);
		},
		
		update: function() {
			this.currentAnim.flip.x = this.flip;
			
			this.firingAnimCD -= 1;
			if (this.firingAnimCD < 0) {
				this.currentAnim = this.anims.notShooting;
			} else {
				this.currentAnim = this.anims.shooting;
			}			
			
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
		
		fire: function() {
			this.firingAnimCD = 10;
		},
		
		draw: function() {
			this.parent();
		}
	});
	
	EntityBullet = ig.Entity.extend({
		size:{x:8, y:8},
		animSheet: new ig.AnimationSheet('media/bullet2.png',8,8),
		gravityFactor: 0,
		
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
		collides: ig.Entity.COLLIDES.PASSIVE,
		
		maxVel: {x:10000000, y:10000000}, //default 10000000
		
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			this.pos.x = x;
			this.pos.y = y;
			
			//this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			//this.vel.y = -50;
			
			this.vel.x = ig.game.screen.x+settings.d.x - this.pos.x; 
			this.vel.y = settings.d.y+ ig.game.screen.y- this.pos.y;
			var vectorLength = Math.sqrt(this.vel.x*this.vel.x + this.vel.y*this.vel.y);
			this.vel.x /= vectorLength;
			this.vel.y /= vectorLength;
			this.vel.x*=2000; //default 2000
			this.vel.y*=2000;
			//this.vel.x*=3000;
			//this.vel.y*=3000;
			//var angle = Math.atan2(settings.d.y - this.pos.y + ig.game.screen.y, settings.d.x - this.pos.x + ig.game.screen.x);
			this.addAnim( 'idle', 1, [0] );
			//this.anims.idle.pivot.x = 0;
			//this.anims.idle.angle = angle;
			this.pos.y -= this.animSheet.height/2;
		},
		
		handleMovementTrace: function( res ) {
			this.parent( res );
			if( res.collision.x || res.collision.y || res.collision.slope) {
				this.kill();
			}
		},
		
		update: function() {
			var mapWidth = ig.game.collisionMap.width*ig.game.collisionMap.tilesize;
			var mapHeight = ig.game.collisionMap.height*ig.game.collisionMap.tilesize;
			
			if (this.pos.x > mapWidth+ig.system.width || this.pos.x < 0-ig.system.width || this.pos.y > mapHeight+ig.system.height || this.pos.y < 0-ig.system.height ) {
				this.kill();
			}
			
			this.parent();
		},
		
		// This function is called when this entity overlaps anonther entity of the
		// checkAgainst group. I.e. for this entity, all entities in the B group.
		check: function( other ) {
			if (!other.bulletDamage)
				return;
			other.receiveDamage( 10, this );
			for (var i = 0; i < 40;i++) {
				ig.game.spawnEntity(EntityBloodParticle, this.pos.x, this.pos.y, {dx: this.vel.x, dy: this.vel.y});
			}
			this.kill();
		}
	});
});