ig.module('game.entities.winMenu').requires('game.entities.menu').defines(function(){
	EntityWinMenu = EntityMenu.extend({
		name: 'winMenu',
		
		items: [
			{text:'MAIN MENU',exec:function() {
				ig.game.loadLevel(LevelMainMenu);
			}}
		],
		
		initYOffset: 500,
		
		initXOffset: 0
	});
});