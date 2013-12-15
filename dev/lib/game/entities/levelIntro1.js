/*
 *MAIN KEYS
 *titleText
 *descriptionText
 *levelToLoad
 */
ig.module('game.entities.levelIntro1').requires('game.entities.levelIntro').defines(function(){
	EntityLevelIntro1 = EntityLevelIntro.extend({
		titleText: 'BEDBUGS',
		
		descriptionText: 'Mike hates bedbugs, and bedbugs live in couches.\nThe only way to kill bedbugs is with fire.',
		
		levelToLoad: 'Level1'
	});
});