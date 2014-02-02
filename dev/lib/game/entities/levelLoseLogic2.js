//Level 2 lose logic.

ig.module('game.entities.levelLoseLogic2').requires('game.entities.levelLoseLogic', 'game.levels.2').defines(function(){
	EntityLevelLoseLogic2 = EntityLevelLoseLogic.extend({
		text: "You crashed.\nPlay again?", //Crashed the car
		
		thisLevel:Level2 //Reload level 2
	});
});