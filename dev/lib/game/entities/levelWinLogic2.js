ig.module('game.entities.levelWinLogic2').requires('game.entities.levelWinLogic').defines(function(){
	EntityLevelWinLogic2 = EntityLevelWinLogic.extend({
		text: "Congratulations!\nYou beat the game.\n",
		
		nextLevel:null
	});
	
	
});