//Player used on level 2.  Should inherit from base player entity.

ig.module('game.entities.playerL2').requires('impact.entity', 'game.entities.particleSpawner', 'game.entities.particle', 'game.entities.loopingSoundManager', 'impact.entity-pool').defines(function() {
	EntityPlayerL2 = ig.Entity.extend({
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		checkAgainst: ig.Entity.TYPE.B,
		
		animSheet: new ig.AnimationSheet( 'media/images/sprites/car.png', 261, 128),
		
		maxVel: {x:750,y:400},
		size: {x:261, y:128},
		friction: {x:0,y:2000},
		
		crashSound: new ig.Sound('media/sounds/crash.*'), //Crash sound effect for when the player is injured
		
		carSound: new ig.Sound('media/sounds/inside_car.*', false), //Looping sound effect for driving.  This doesn't loop properly, but will hopefully be fixed in future versions of Impact.
		
		health:3, //3 hits before you die
		gravityFactor:0, //Can't have it moving without the player's input
		
		hitTimer: new ig.Timer(),
		hitFlashDuration: 3,
		hitFlashTick: .5,
		hitFlashCurrTick: 0,
		hitFlashAlpha: .3,
		hitFlashCurrAlpha: 1,
		
		enabled: false, //This allows the cutscenes at the beginning and end of the level.  The cutscene plays, the car is enabled, the level plays through, and the car is disabled through the ending cutscene.
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('damage0', 1, [0]); //Undamaged
			this.addAnim('damage1', 1, [1]); //More damaged
			this.addAnim('damage2', 1, [2]); //Fully damaged
			this.currentAnim = this.anims.damage0; //Start undamaged
			
			if (!ig.global.wm) {
				
				this.loopingSoundManager = ig.game.spawnEntity(EntityLoopingSoundManager, 0, 0); //Spawn a looping sound manager we'll use later for the car driving sound effect
				
				ig.game.spawnEntity(EntitySmokeParticleSpawner, this.pos.x, this.pos.y, {anchor: this, xOffset: this.size.x - 20, yOffset: this.size.y/2}); //Spawn a particle spawner that will start spawning smoke particles when the car's damaged
			}
		},
		
		update: function() {
			if (this.enabled) { //If enabled, handle input
				this.accel.x=100; //Start moving left
				if (ig.input.state('left') || ig.input.state('up')) //Avoid obstacles by going towards the top of the screen
					this.vel.y = -700;
				else if (ig.input.state('right') || ig.input.state('down')) //Avoid obstacles by going towards the bottom of the screen
					this.vel.y = 700;
				else //Otherwise, stop moving up or down
					this.vel.y = 0;
			} else { //If not enabled, keep the car from moving
				this.accel.x = 0;
				this.vel.x = 0;
				this.vel.y = 0;
			}
			
			//Hit flashing code
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
			
			
			this.parent();
		},
		
		check: function(other) {
			if (other.health > 0) { //If the obstacle has health, play the crash sound and destroy the obstacle
				this.crashSound.play();
				if (this.hitTimer.delta() >= 0) { //If the player is vulnerable, damage the player and slow it down slightly
					if (this.health == 3) {
						this.currentAnim = this.anims.damage1;
					}
					if (this.health == 2) {
						this.currentAnim = this.anims.damage2;
					}
					this.receiveDamage(1);
					this.vel.x -= 200;
				}
				other.kill();
			}
		},
		
		receiveDamage: function(amount, other) {
			this.hitTimer.set(this.hitFlashDuration); //Set the player to be invincible
			this.hitTimer.tick();
			this.hitFlashCurrAlpha = this.hitFlashAlpha;
			this.hitFlashCurrTick = 0;
			this.parent(amount, other);
		},
		
		kill: function() {
			this.endOfLevel(); //End the level as lose
		},
		
		triggeredBy: function(triggered, other) {
			if (other.name=='closingCutsceneTrigger') { //Triggered when it hits closingCutsceneTrigger
				var prop = ig.game.getEntityByName("cutsceneProp2"); //Spawn the closing cutscene prop
				//Position the prop
				prop.pos.x = this.pos.x + this.size.x - prop.size.x;
				prop.pos.y = this.pos.y - prop.size.y;
				this.enabled = false; //Shut down the car so it doesn't move anymore
				this.loopingSoundManager.stop(); //Stop the car sound effect since we've stopped
			}
		},
		
		//Start the main movement after the opening cutscene
		enable: function() {
			this.enabled = true;
			this.loopingSoundManager.add(this.carSound);
		},
		
		//End the level with either a win screen or a lose screen
		endOfLevel: function(win) {
			win ? ig.game.loadLevelDeferred(LevelWin2) : ig.game.loadLevelDeferred(LevelLose2);
		}
	});
	
	//Smoke particle that is spawned by EntitySmokeParticleSpawner when the car's damaged.
	EntitySmokeParticle = EntityParticle.extend({
		color: 50, //RGB is set to this at each point to get a grayscale value at a certain darkness
		particleSize: 40, //Size of the particle in pixels
		
		gravityFactor: 0, //Make sure it doesn't go down--this would force it off the screen, which is bad since we're looking top-down
		collides: ig.Entity.COLLIDES.NONE,
		
		lifetime: .4, //Lifetime in seconds
		maxVel: {x:100,y:100},
		friction: {x:0, y:0},
		
		//First initialization
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.particleSize = Math.random()*10 + 40; //Randomize the size so we don't get a bunch of weird-looking circles
			
			this.idleTimer = new ig.Timer(); //Timer that ticks down that we measure lifetime and fadetime against
			
			//Randomize x and y directions
			this.vel.x = Math.random()*200-100;
			this.vel.y = Math.random()*200-100;
			this.color = settings.color; //Set the color to what EntitySmokeParticleSpawner wants--this depends on the health of the car
		},
		
		//Reset when this is pulled out of the entity pool for re-use.  This is essentially just resetting things that might be different from when initially set.
		reset: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			this.idleTimer.reset();
			
			this.color = settings.color;
		},
		
		update: function() {
			 
			 //If the particle has lived past its lifetime, kill it
			if( this.idleTimer.delta() > this.lifetime ) {
				this.kill();
				return;
			}
			//If the particle is completely offsceen, kill it
			if (this.pos.x < ig.game.screen.x - this.particleSize) {
				this.kill();
				return;
			}
			this.parent();
		},
		
		draw: function() {
			this.parent();
			//Get positions in screen context, not game context, since we need to draw them properly using canvas drawing
			var x = this.pos.x - ig.game.screen.x;
			var y = this.pos.y - ig.game.screen.y;
			
			
			//Okay, what the fuck now?  Defining a rect and then drawing makes performance shit its pants, but using fillRect doesn't.  I need to investigate this later.
			if (ig.global.graphics.gradient) {
				var grd = ig.system.context.createRadialGradient(x,y, 0, x, y, this.particleSize);
				grd.addColorStop(0, 'rgba(' + this.color + ',' + this.color + ',' + this.color + ',1)');
				grd.addColorStop(.5, 'rgba(' + this.color + ',' + this.color + ',' + this.color + ',.7)');
				grd.addColorStop(1, 'rgba(' + this.color + ',' + this.color + ',' + this.color + ',0)');
				ig.system.context.fillStyle = grd;
				ig.system.context.fillRect(x-this.particleSize, y-this.particleSize, x+this.particleSize, y+this.particleSize);
			} else {
				ig.system.context.beginPath();
				ig.system.context.arc(x, y, this.particleSize, 0, Math.PI*2, true);
				ig.system.context.fillStyle = 'rgb(' + this.color + ',' + this.color + ',' + this.color + ')';
				ig.system.context.fill();
			}
		}
		
	});
	
	//Particle spawner that continuously spawns smoke particles after the car takes damage.
	EntitySmokeParticleSpawner = EntityParticleSpawner.extend({
		
		timer: 0, //Time in seconds between particles being spawned.  Setting it to zero means that a particle will be spawned every frame.
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.anchor = settings.anchor; //Anchor.  This is the car.
			//Offset to position the spawner above the hood of the car
			this.xOffset = settings.xOffset;
			this.yOffset = settings.yOffset;
		},
		
		update: function() {
			this.parent();
			//Correctly position based on the coordinates of the anchor and the offset
			this.pos.x = this.anchor.pos.x + this.xOffset;
			this.pos.y = this.anchor.pos.y + this.yOffset;
		},
		
		spawnParticleUpdate: function() {
			if (this.anchor.health < 3) {
				if (this.anchor.health == 2) {
					this.particleColor = 35; //Dark gray
				}
				if (this.anchor.health == 1) {
					this.particleColor = 15; //Darker gray, almost black
				}
				this.spawnParticle(); //Spawn the particle if it's damaged
			}
		},
		
		spawnParticle: function() {
			if (this.anchor.enabled) //Stop the car from smoking when stopped.  This both fixes an issue where multiple smoke particles would slow down the game and make the second cutscene take a long time, and makes more sense--why would the car be smoking when it's off?
				ig.game.spawnEntity(EntitySmokeParticle, this.pos.x+(Math.random()*20)-10, this.pos.y+(Math.random()*20)-10, {color: this.particleColor});
		}
	});
	
	ig.EntityPool.enableFor(EntitySmokeParticle); //Add it to the entity pool so we can reset old ones instead of recreating them all the time
});
