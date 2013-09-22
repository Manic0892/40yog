ig.module(
	'game.entities.enemyBedbug'
).requires(
	'game.entities.enemy'/*,'plugins.perpixel' */
).defines(function() {
	EntityEnemyBedbug = EntityEnemy.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		
		collides: ig.Entity.COLLIDES.PASSIVE,
		
		maxVel: {x: 400, y: 400},
		friction: {x: 300, y: 0},
		size:{x:64,y:64},
		offset:{x:0,y:0},
		speed:100,
		
		health:50,
		
		animSheet: new ig.AnimationSheet( 'media/bedbug.png', 64, 64 ),
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			this.addAnim('walk', .3, [0,1]);
			this.currentAnim = this.anims.walk;
		},
		
		update: function() {
			if( !ig.game.collisionMap.getTile(
					this.pos.x + (this.flip ? +4 : this.size.x -4),
					this.pos.y + this.size.y+1
				)
			) {
				this.flip = !this.flip;
			}
			if(ig.game.collisionMap.getTile(this.pos.x + (this.flip ?- 4 : this.size.x+4),this.pos.y + 10)) {
				this.flip = !this.flip;
			}
			
			var xdir = this.flip ? -1 : 1;
			this.vel.x = this.speed * xdir;
			
			this.parent();
		},
		
		receiveSunDamage: function(damage, other) {
			this.receiveDamage(damage, other);
			for (i = 0; i < 1; i++) {
				ig.game.spawnEntity(EntityAshParticle, this.pos.x, this.pos.y, {width: this.size.x, height: this.size.y});
			}
		},
		
		check: function( other ) {
			other.receiveDamage( 10, this );
			this.kill();
		}
	});
});