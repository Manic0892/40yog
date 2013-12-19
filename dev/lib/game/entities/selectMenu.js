ig.module('game.entities.selectMenu').requires('game.entities.menu').defines(function(){
	EntitySelectMenu = EntityMenu.extend({
		name: 'levelSelectMenu',
		
		items: [
			{text:'Level 1',exec:function() {
				ig.game.loadLevelDeferred(LevelIntro1);
			}}
		],
		
		initYOffset: 64,
		
		initXOffset: 192,
		
		init: function(x,y,settings) {
			if ($.cookie("l1") == "beat") {
				this.items.push({text:'Level 2', exec: function() {
					ig.game.loadLevelDeferred(LevelIntro2);
				}});
			}
			
			
			this.items.push({text:'Main Menu', exec: function() {
				ig.game.loadLevelDeferred(LevelMainMenu);
			}});
			
			this.parent(x,y,settings);
		}
	});
});