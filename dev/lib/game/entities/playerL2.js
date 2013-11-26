ig.module('game.entities.playerL2').requires('impact.entity', 'game.entities.particleSpawner', 'game.entities.particle').defines(function() {
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
					ig.game.spawnEntity(EntitySmokeParticleSpawner, this.pos.x, this.pos.y, {anchor: this, xOffset: this.size.x - 20, yOffset: this.size.y/2});
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
		//Should use entity pool
		
		color: 0,
		particleSize: 40,
		
		deathTimer: 40,
		
		
		
		gravityFactor: 0,
		
		update: function() {
			this.deathTimer--;
			if (this.deathTimer == 0) {
				this.kill;
			}
		},
		
		draw: function() {
			this.parent();
			var x = this.pos.x - ig.game.screen.x;
			var y = this.pos.y - ig.game.screen.y;
			ig.system.context.beginPath();
			ig.system.context.arc(x, y, this.particleSize, 0, Math.PI*2, true);
			ig.system.context.fillStyle = 'rgba(' + this.color + ',' + this.color + ',' + this.color + ',' + this.alpha + ')';
			ig.system.context.fill();
		}
		
	});
	
	EntitySmokeParticleSpawner = EntityParticleSpawner.extend({
		particleSpawnCD: 10,
		currSpawnCD: 5,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			console.log(settings);
			this.anchor = settings.anchor;
			this.xOffset = settings.xOffset;
			this.yOffset = settings.yOffset;
		},
		
		update: function() {
			this.parent();
			this.pos.x = this.anchor.pos.x + this.xOffset;
			this.pos.y = this.anchor.pos.y + this.yOffset;
			console.log(this.pos);
			
			this.currSpawnCD--;
			if (this.currSpawnCD == 0) {
				this.spawnParticle();
				this.currSpawnCD = this.particleSpawnCD;
			}
		},
		
		spawnParticle: function() {
			ig.game.spawnEntity(EntitySmokeParticle, this.pos.x, this.pos.y);
		},
		
		draw: function() {
			this.parent();
		}
	});
});