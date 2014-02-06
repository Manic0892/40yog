//Main Menu.  Appears as the first interactive part of the game, with entries to play from level 1, select a level, or change options.

ig.module('game.entities.mainMenu').requires('game.entities.menu').defines(function(){
	EntityMainMenu = EntityMenu.extend({
		name: 'mainMenu',
		
		items: [
			{text:'PLAY',exec:function() {
				ig.game.loadLevelDeferred(LevelIntro1); //Load the intro for the first level
			}}, {text:'LEVEL SELECT', exec:function() {
				ig.game.loadLevelDeferred(LevelSelectMenu); //Load the level select menu
			}}, {text:'OPTIONS', exec:function() {
				ig.game.loadLevelDeferred(LevelOptionsMenu); //Load the options menu
			}}
		],
		
		initYOffset: 96,
		
		initXOffset: 256
	});
});