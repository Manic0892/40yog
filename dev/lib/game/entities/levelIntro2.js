ig.module('game.entities.levelIntro2').requires('game.entities.levelIntro').defines(function(){
	EntityLevelIntro2 = EntityLevelIntro.extend({
		titleText: 'TRAVIS BARBECUE',
		
		descriptionText: 'Mike needs to deliver food--and he drives like a maniac while doing it.',
		
		levelToLoad: 'Level2'
	});
});