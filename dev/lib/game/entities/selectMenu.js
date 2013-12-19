ig.module('game.entities.selectMenu').requires('game.entities.menu').defines(function(){
	EntitySelectMenu = EntityMenu.extend({
		name: 'levelSelectMenu',
		
		items: [
			{text:'Level 1',exec:function() {
				ig.game.loadLevelDeferred(LevelIntro1);
			}}, {text:'Level 2', exec: function() {
				ig.game.loadLevelDeferred(LevelIntro2);
			}},
			{text:'Main Menu', exec: function() {
				ig.game.loadLevelDeferred(LevelMainMenu);
			}}
		],
		
		initYOffset: 64,
		
		initXOffset: 192
	});
});