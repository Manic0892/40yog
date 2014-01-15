//Base character class.  This includes NPCs and player characters.  This could probably be removed without too much being lost.

ig.module('game.entities.character').requires('impact.entity').defines(function() {
	EntityCharacter = ig.Entity.extend({
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		
		collides: ig.Entity.COLLIDES.NONE
	});
});