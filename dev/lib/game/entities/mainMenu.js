ig.module('game.entities.mainMenu').requires('game.entities.menu').defines(function(){
	EntityMainMenu = EntityMenu.extend({
		name: 'mainMenu',
		
		items: [
			{text:'PLAY',exec:function() {
				ig.game.loadLevel(Level1);
			}}, /*{text:'OPTIONS', exec:function() {
				console.log('clicked options');
			}}, {text:'HOW TO PLAY', exec:function() {
				ig.game.loadLevel(LevelHowToPlay)
			}}, {text: 'L2_DEBUG', exec:function() {
				ig.game.loadLevel(Level2);
			}}*/
		],
		
		initYOffset: 64,
		
		initXOffset: 192
	});
});