//Enemy entity.  Every enemy inherits from this.  This basically just tells every enemy to be type B (enemy type), and to check against type A (player type).

ig.module('game.entities.enemy').requires('game.entities.character').defines(function() {
	EntityEnemy = EntityCharacter.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		
		bulletDamage: true  //Probably deprecated, unless a player shooting bullets is re-integrated
	});
});