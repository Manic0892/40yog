ig.module(
	'game.entities.enemy'
).requires(
	'game.entities.character'
).defines(function() {
	EntityEnemy = EntityCharacter.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		
		bulletDamage: true
	});
});