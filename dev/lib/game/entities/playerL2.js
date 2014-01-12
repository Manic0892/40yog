ig.module('game.entities.playerL2').requires('impact.entity', 'game.entities.particleSpawner', 'game.entities.particle', 'game.entities.loopingSoundManager', 'impact.entity-pool').defines(function() {
	EntityPlayerL2 = ig.Entity.extend({
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		checkAgainst: ig.Entity.TYPE.B,
		
		animSheet: new ig.AnimationSheet( 'media/images/sprites/car.png', 261, 128),
		
		maxVel: {x:750,y:400},
		size: {x:261, y:128},
		friction: {x:0,y:2000},
		
		crashSound: new ig.Sound('media/sounds/crash.*'),
		
		carSound: new ig.Sound('media/sounds/inside_car.*', false),
		
		health:3,
		gravityFactor:0,
		
		
		
		hitTimer: new ig.Timer(),
		hitFlashDuration: 3,
		hitFlashTick: .5,
		hitFlashCurrTick: 0,
		hitFlashAlpha: .3,
		hitFlashCurrAlpha: 1,
		
		
		
		enabled: false,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('damage0', 1, [0]);
			this.addAnim('damage1', 1, [1]);
			this.addAnim('damage2', 1, [2]);
			this.currentAnim = this.anims.damage0;
			
			if (!ig.global.wm) {
				
				this.loopingSoundManager = ig.game.spawnEntity(EntityLoopingSoundManager, 0, 0);
				
				ig.game.spawnEntity(EntitySmokeParticleSpawner, this.pos.x, this.pos.y, {anchor: this, xOffset: this.size.x - 20, yOffset: this.size.y/2});
			}
		},
		
		update: function() {
			if (this.enabled) {
				this.accel.x=100;		
				if (ig.input.state('left') || ig.input.state('up'))
					this.vel.y = -700;
				else if (ig.input.state('right') || ig.input.state('down'))
					this.vel.y = 700;
				else
					this.vel.y = 0; //fuck dealing with acceleration and friction amirite?
			} else {
				this.accel.x = 0;
				this.vel.x = 0;
				this.vel.y = 0;
			}
			
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
			
			
			this.parent();
		},
			
		
		draw: function() {
			this.parent();
		},
		
		check: function(other) {
			if (other.health > 0) {
				this.crashSound.play();
				if (this.hitTimer.delta() >= 0) {
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
			this.hitTimer.set(this.hitFlashDuration);
			this.hitTimer.tick();
			this.hitFlashCurrAlpha = this.hitFlashAlpha;
			this.hitFlashCurrTick = 0;
			this.parent(amount, other);
		},
		
		kill: function() {
			this.endOfLevel();
		},
		
		triggeredBy: function(triggered, other) {
			if (other.name=='closingCutsceneTrigger') {
				//this.endOfLevel(true);
				var prop = ig.game.getEntityByName("cutsceneProp2");
				prop.pos.x = this.pos.x + this.size.x - prop.size.x;
				prop.pos.y = this.pos.y - prop.size.y;
				this.enabled = false;
				this.loopingSoundManager.stop();
			}
		},
		
		enable: function() {
			this.enabled = true;
			this.loopingSoundManager.add(this.carSound);
		},
		
		endOfLevel: function(win) {
			win ? ig.game.loadLevelDeferred(LevelWin2) : ig.game.loadLevelDeferred(LevelLose2);
		}
	});
	
	EntitySmokeParticle = EntityParticle.extend({
		color: 50,
		particleSize: 40,
		
		gravityFactor: 0,
		collides: ig.Entity.COLLIDES.NONE,
		
		lifetime: .4,
		emptyString: '',
		maxVel: {x:100,y:100},
		friction: {x:0, y:0},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.particleSize = Math.random()*10 + 40;
			
			this.idleTimer = new ig.Timer();
			
			this.vel.x = Math.random()*200-100;
			this.vel.y = Math.random()*200-100;
			this.color = settings.color;
		},
		
		reset: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			this.idleTimer = new ig.Timer();
			this.particleSize = Math.random()*10 + 40;
			
			this.vel.x = Math.random()*200-100;
			this.vel.y = Math.random()*200-100;
			this.color = settings.color;
		},
		
		update: function() {
			
			if( this.idleTimer.delta() > this.lifetime ) {
				this.kill();
				return;
			}
			if (this.pos.x < ig.game.screen.x - this.particleSize) {
				this.kill();
				return;
			}
			this.parent();
		},
		
		draw: function() {
			this.parent();
			var x = this.pos.x - ig.game.screen.x;
			var y = this.pos.y - ig.game.screen.y;
			//Okay, what the fuck now?  Defining a rect and then drawing makes performance shit its pants, but using fillRect doesn't.  I need to investigate this later.
			
			
			if (ig.global.graphics.gradient) {
				//ig.system.context.rect(x-this.particleSize, y-this.particleSize, x+this.particleSize, y+this.particleSize);
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
	
	EntitySmokeParticleSpawner = EntityParticleSpawner.extend({
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.anchor = settings.anchor;
			this.xOffset = settings.xOffset;
			this.yOffset = settings.yOffset;
		},
		
		update: function() {
			this.parent();
			this.pos.x = this.anchor.pos.x + this.xOffset;
			this.pos.y = this.anchor.pos.y + this.yOffset;
			
			if (this.anchor.health < 3) {
				if (this.anchor.health == 2) {
					this.particleColor = 35;
				}
				if (this.anchor.health == 1) {
					this.particleColor = 15;
				}
				this.spawnParticle();
			}
		},
		
		spawnParticle: function() {
				ig.game.spawnEntity(EntitySmokeParticle, this.pos.x+(Math.random()*20)-10, this.pos.y+(Math.random()*20)-10, {color: this.particleColor});
		},
		
		draw: function() {
			this.parent();
		}
	});
	
	ig.EntityPool.enableFor(EntitySmokeParticle);
});