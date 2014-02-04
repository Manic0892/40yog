//Win logic for level 1

ig.module('game.entities.levelWinLogic1').requires('game.entities.levelWinLogic', 'game.levels.intro2').defines(function(){
	EntityLevelWinLogic1 = EntityLevelWinLogic.extend({
		text: "Lil' Schmitty defeated the bedbugs.\nNow it's time to make some money.", //Sets up the next level, where you're a barbecue delivery guy
		
		nextLevel:LevelIntro2, //The next level to load.  It's the intro for the next full level.
		
		beat: "l1" //Cookie for level select menu
	});
	
	
});