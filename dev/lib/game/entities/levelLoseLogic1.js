ig.module('game.entities.levelLoseLogic1').requires('game.entities.levelLoseLogic', 'game.levels.1').defines(function(){
	EntityLevelLoseLogic1 = EntityLevelLoseLogic.extend({
		text: "You succumbed.\nPlay again?",
		
		thisLevel:Level1
	});
});