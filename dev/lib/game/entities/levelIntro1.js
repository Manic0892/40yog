ig.module('game.entities.levelIntro1').requires('game.entities.levelIntro', 'game.levels.1').defines(function(){
	EntityLevelIntro1 = EntityLevelIntro.extend({
		titleText: 'BEDBUGS',
		
		descriptionText: "Los Angeles is infested with bedbugs, and they prove an unkillable menace.\nOnly extreme heat, like the ancient power of the sun, can hurt them.\nHowever, Lil' Schmitty decides to take the fight to the bedbugs.",
		
		levelToLoad: Level1,
		
		clip: new ig.Sound('media/sounds/level1_intro_bedbug.*')
	});
});