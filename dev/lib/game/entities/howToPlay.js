ig.module('game.entities.howToPlay').requires('game.entities.menu').defines(function(){
	EntityHowToPlay = EntityMenu.extend({
		name: 'howToPlay',
		
		items: [
			{text:'MAIN MENU',exec:function() {
				ig.game.loadLevel(LevelMainMenu);
			}}
		],
		
		initYOffset: 500,
		
		initXOffset: 0
	});
});