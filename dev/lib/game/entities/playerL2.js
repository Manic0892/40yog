ig.module('game.entities.playerL2').requires('impact.entity', 'game.entities.particleSpawner', 'game.entities.particle', 'impact.entity-pool').defines(function() {
	EntityPlayerL2 = ig.Entity.extend({
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		checkAgainst: ig.Entity.TYPE.B,
		
		animSheet: new ig.AnimationSheet( 'media/car.png', 261, 128),
		
		maxVel: {x:750,y:400},
		size: {x:261, y:128},
		friction: {x:0,y:2000},
		
		carSound: new ig.Sound('media/sound/engine.*'),
		
		health:3,
		gravityFactor:0,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('damage0', 1, [0]);
			this.addAnim('damage1', 1, [1]);
			this.addAnim('damage2', 1, [2]);
			this.currentAnim = this.anims.damage0;
			this.accel.x=100;
			
			if (!ig.global.wm) {
				ig.music2 = new ig.Music();
				ig.music2.add(this.carSound);
				ig.music2.volume = 0.1;
				ig.music2.play();
			}
			ig.game.spawnEntity(EntitySmokeParticleSpawner, this.pos.x, this.pos.y, {anchor: this, xOffset: this.size.x - 40, yOffset: this.size.y/2});
		},
		
		update: function() {
			//this.accel = {x:0,y:0};
			//if (ig.input.state('left') && this.vel.y < 0)
			//	this.accel.x = -400;
			//if (ig.input.state('right') && this.vel.y < 0)
			//	this.accel.x = 400;
			//if (ig.input.state('up'))
			//	this.accel.y = -200;
			//if (ig.input.state('down') && this.vel.y < 0)
			//	this.accel.y = 300;
			//if (this.vel.y > 0)
			//	this.vel.y = 0;
			//if (this.vel.y >= 0)
			//	this.vel.x = 0;
			if (ig.input.state('left') || ig.input.state('up'))
				this.vel.y = -700;
			else if (ig.input.state('right') || ig.input.state('down'))
				this.vel.y = 700;
			else
				this.vel.y = 0; //fuck dealing with acceleration and friction amirite?
			this.parent();
			//if (this.vel.x == this.maxVel.x)
			//	this.accel.x = 0;
			//else
			//	this.accel.x = 100;
		},
		
		draw: function() {
			this.parent();
		},
		
		check: function(other) {
			if (other.health > 0) {	
				this.receiveDamage(1);
				if (this.health == 2) {
					this.currentAnim = this.anims.damage1;
				}
				if (this.health == 1) {
					this.currentAnim = this.anims.damage2;
				}
				//this.vel.y += 500;
				this.vel.x -= 200;
				//this.pos.y += 50;
				other.kill();
			}
		},
		
		kill: function() {
			ig.game.loadLevelDeferred(LevelMainMenu);
			ig.music2.stop();
			ig.music.stop();
		},
		
		triggeredBy: function(triggered, other) {
			if (other.name=='winTrigger') {
				ig.music.stop();
				ig.game.loadLevelDeferred(LevelWin);
				ig.music2.stop();
			}
		}
	});
	
	EntitySmokeParticle = EntityParticle.extend({
		color: 50,
		particleSize: 40,
		
		gravityFactor: 0,
		collides: ig.Entity.COLLIDES.NONE,
		
		lifetime: 1.3,
		maxVel: {x:100,y:100},
		friction: {x:0, y:0},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.particleSize = Math.random()*10 + 40;
			
			this.idleTimer = new ig.Timer();
			
			this.vel.x = Math.random()*80-40;
			this.vel.y = Math.random()*200-100;
			this.color = settings.color;
		},
		
		reset: function( x, y, settings ) {
			// This function is called when an instance of this class is
			// resurrected from the entity pool.
			// The parent implementation of reset() will reset the .pos to 
			// the given x, y and will reset the .vel, .accel, .health and 
			// some other properties.
			this.parent( x, y, settings );
			
			this.idleTimer = new ig.Timer();
			this.particleSize = Math.random()*10 + 40;
			
			this.vel.x = Math.random()*80-40;
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
			//Old, deprecated way without gradients.
			//Keeping it around in case it comes in handy later
			
			//ig.system.context.beginPath();
			//ig.system.context.arc(x, y, this.particleSize, 0, Math.PI*2, true);
			//ig.system.context.fillStyle = 'rgb(' + this.color + ',' + this.color + ',' + this.color + ')';
			//ig.system.context.fill();
			
			
			
			//Okay, what the fuck now?  Defining a rect and then drawing makes performance shit its pants, but using fillRect doesn't.  I need to investigate this later.
			
			
			//ig.system.context.rect(x-this.particleSize, y-this.particleSize, x+this.particleSize, y+this.particleSize);
			var grd = ig.system.context.createRadialGradient(x,y, 0, x, y, this.particleSize);
			grd.addColorStop(0, 'rgba(' + this.color + ',' + this.color + ',' + this.color + ',1)');
			grd.addColorStop(.5, 'rgba(' + this.color + ',' + this.color + ',' + this.color + ',.7)');
			grd.addColorStop(1, 'rgba(' + this.color + ',' + this.color + ',' + this.color + ',0)');
			ig.system.context.fillStyle = grd;
			ig.system.context.fillRect(0,0,ig.system.width,ig.system.height);
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
					this.particleColor = 50;
				}
				if (this.anchor.health == 1) {
					this.particleColor = 25;
				}
				this.spawnParticle();
			}
		},
		
		spawnParticle: function() {
				ig.game.spawnEntity(EntitySmokeParticle, this.pos.x+(Math.random()*10), this.pos.y+(Math.random()*10), {color: this.particleColor});
		},
		
		draw: function() {
			this.parent();
		}
	});
	
	ig.EntityPool.enableFor(EntitySmokeParticle);
});