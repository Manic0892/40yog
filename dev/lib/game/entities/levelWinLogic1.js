ig.module('game.entities.levelWinLogic1').requires('game.entities.levelWinLogic', 'game.levels.intro2').defines(function(){
	EntityLevelWinLogic1 = EntityLevelWinLogic.extend({
		text: "Lil' Schmitty defeated the bedbugs.\nNow it's time to make some money.",
		
		nextLevel:LevelIntro2,
		
		beat: "l1"
	});
	
	
});