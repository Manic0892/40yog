ig.module('game.entities.mainMenu').requires('game.entities.menu').defines(function(){
	EntityMainMenu = EntityMenu.extend({
		name: 'mainMenu',
		
		items: [
			{text:'PLAY',exec:function() {
				ig.game.loadLevelDeferred(LevelIntro1);
			}}, {text:'LEVEL SELECT', exec:function() {
				ig.game.loadLevelDeferred(LevelSelectMenu);
			}}, {text:'OPTIONS', exec:function() {
				ig.game.loadLevelDeferred(LevelOptionsMenu);
			}}
		],
		
		initYOffset: 128,
		
		initXOffset: 192
	});
});