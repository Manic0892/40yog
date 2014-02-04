//Win logic for level 2

ig.module('game.entities.levelWinLogic2').requires('game.entities.levelWinLogic').defines(function(){
	EntityLevelWinLogic2 = EntityLevelWinLogic.extend({
		text: "Congratulations!\nYou beat the game.\n", //Level 2 is the last level currently
		
		nextLevel:null, //Level 2 is the last level currently
		
		beat: "l2" //Cookie for level select menu
	});
	
	
});