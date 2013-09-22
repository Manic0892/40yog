ig.module('game.entities.playerL1').requires('game.entities.player', 'game.entities.fireParticleDamage', 'game.entities.sunSpark').defines(function() {
	EntityPlayerL1 = EntityPlayer.extend({
		sun: 100,
		maxSun: 100,
		
		sunSound: new ig.Sound('media/sound/sun.*'),
		sunSoundTrack: new ig.Music(),
		sunSoundPlaying: false,
		cooldown: 5,
		
		flameActive: false,
		sunActive: false,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			if (!ig.global.wm) {
				this.sunProp = ig.game.spawnEntity(EntitySun, this.pos.x, this.pos.y, {attachee: this});
				
				this.sunSoundTrack.add(this.sunSound);
				this.sunSoundTrack.volume = 1;
			}
		},
		
		spawnArm: function() {
			this.arm = ig.game.spawnEntity(EntityArmL1, this.pos.x,this.pos.y, {attachee: this});
		},
		
		update: function() {
			this.parent();
			
			if (ig.input.state('sun') && this.sun > 0 && this.sunActive) {
				var distanceFromPlayer = 700;
				var enemies = ig.game.getEntitiesByType(EntityEnemy);
				//var enemies = [];
				//if (EntityEnemySpider)
				//	enemies = ig.game.getEntitiesByType(EntityEnemySpider);
				//if (EntityEnemySpider)
				//	enemies = enemies.concat(ig.game.getEntitiesByType(EntityEnemyBedbug));
				//if (EntityEnemySpider)
				//	enemies = enemies.concat(ig.game.getEntitiesByType(EntityCouch));
				for (var i = 0; i < enemies.length; i++) {
					if (enemies[i].pos.x < this.pos.x+distanceFromPlayer && enemies[i].pos.x > this.pos.x - distanceFromPlayer && enemies[i].pos.y < this.pos.y+distanceFromPlayer && enemies[i].pos.y > this.pos.y - distanceFromPlayer) {
						enemies[i].receiveSunDamage(1, this);
					}
				}
				this.sun--;
				this.sunProp.active = true;
				if (!this.sunSoundPlaying) {
					this.sunSoundTrack.play();
					this.sunSoundPlaying = true;
				}
			} else {
				this.sunProp.active = false;
				if (this.sunSoundPlaying) {
					this.sunSoundTrack.stop();
					this.sunSoundPlaying = false;
				}
			}
			
			this.sunProp.attacheeUpdate(this.pos.x, this.pos.y, this.size.x, this.size.y);
		},
		
		triggeredBy: function(triggered, other) {
			if (other.name=='winTrigger') {
				ig.music.stop();
				ig.game.loadLevelDeferred(LevelWin);
			}
		},
		
		sunPowerup: function(amount) {
			this.sun += amount;
		},
		
		shoot: function() {
			if (this.flameActive) {
				ig.game.spawnEntity( EntityFireParticleDamage, this.pos.x+this.size.x/2, this.pos.y+this.size.y/2, {flip:this.flip, d:{x:ig.input.mouse.x, y:ig.input.mouse.y}, vel:this.vel} );
				this.cooldown = 2;
			}
		},
		
		pickup: function(other) {
			if (other == 10210897109101) {
				this.arm.pickupFlame();
				this.flameActive = true;
			}
			
			if (other == 8301115117110) {
				console.log('heya');
				ig.game.spawnEntity(EntitySunSpark, this.pos.x - 100,this.pos.y - 100,{target:this});
				
			}
		}
	});
	
	EntityArmL1 = EntityArm.extend({
		animSheet: new ig.AnimationSheet('media/arm_l1.png',24,8),
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
	
	EntitySun = ig.Entity.extend({
		size: {x:64, y:16},
		type: ig.Entity.TYPE.NONE,
		//checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NONE,
		gravityFactor: 0,
		
		zIndex: 99999,
		
		active: false,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.pos.x = x;
			this.pos.y = y;

			this.attachedTo = settings.attachee;
		},
		
		attacheeUpdate: function(x,y,width,height) {
			this.pos = {x:x+(width/2), y:y+(height/2)};
		},
		
		draw: function() {
			this.parent();
			
			if (this.active) {				
				var x = this.attachedTo.pos.x - ig.game.screen.x+this.attachedTo.size.x/2;
				var y = this.attachedTo.pos.y - ig.game.screen.y+this.attachedTo.size.y/2;
				
				ig.system.context.rect(0,0,ig.system.width,ig.system.height);
				var grd = ig.system.context.createRadialGradient(x,y, 40, x, y, 1000);
				grd.addColorStop(0, 'rgba(255,255,0,1)');
				grd.addColorStop(.1, 'rgba(255,255,0,.3)');
				grd.addColorStop(1, 'rgba(255,255,0,0)');
				ig.system.context.fillStyle = grd;
				ig.system.context.fill();
			}
		}
	});
});