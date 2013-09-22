ig.module('game.entities.couch').requires('impact.entity', 'game.entities.enemyBedbug').defines(function() {
	EntityCouch = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/couch.png', 128, 64),
		
		size: {x:128,y: 64},
		
		offset:{x:0,y:0},
		
		type: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NONE,
		
		health: 100,
		
		zIndex: -1,
		
		bulletDamage: false,
		
		spawnCD: 200,
				
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('init', 1, [0]);
			this.addAnim('damaged', 1, [1]);
			this.addAnim('dead', 1, [2]);
			
			this.currentAnim = this.anims.init;
			this.currSpawnCD = this.spawnCD;
		},
		
		update: function() {
			this.parent();
			
			if (this.health >50) {
				this.currentAnim = this.anims.init;
			} else if (this.health > 0) {
				this.currentAnim = this.anims.damaged;
			} else if (this.health <= 0) {
				this.currentAnim = this.anims.dead;
			}
			
			this.currSpawnCD--;
			if (this.currSpawnCD < 0 && this.health > 0) {
				var playerPos = ig.game.getEntitiesByType(EntityPlayer)[0].pos;
				if (Math.random() > .5 && playerPos.x > this.pos.x - 500 && playerPos.x < this.pos.x + 500 && playerPos.y > this.pos.y - 500 && playerPos.y < this.pos.y + 500) {
					this.spawnEnemy();
				}
				this.currSpawnCD = this.spawnCD;
			}
		},
		
		spawnEnemy: function() {
			ig.game.spawnEntity(EntityEnemyBedbug, this.pos.x, this.pos.y+32);
		},
		
		kill: function() {
			//just keeps you from losing the couch when it's dead
			this.dead = true;
			console.log(this.health);
			console.log('triggered');
		},
		
		receiveSunDamage: function(damage, other) {
			damage *= 4;
			this.receiveDamage(damage, other);
			if (this.health > 0) {
				for (i = 0; i < 1; i++) {
					ig.game.spawnEntity(EntityAshParticle, this.pos.x, this.pos.y, {width: this.size.x, height: this.size.y});
				}
			}
		}
	});
});