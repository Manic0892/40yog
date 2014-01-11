ig.module('game.entities.characters.character').requires('impact.entity').defines(function() {
	EntityCharacter = ig.Entity.extend({
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		
		collides: ig.Entity.COLLIDES.NONE
	});
});