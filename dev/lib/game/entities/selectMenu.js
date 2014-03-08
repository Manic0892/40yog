//Level select menu.  Lists all levels the player's unlocked.

ig.module('game.entities.selectMenu').requires('game.entities.menu').defines(function(){
	EntitySelectMenu = EntityMenu.extend({
		name: 'levelSelectMenu',
		
		//Level one should always be added by default
		items: [
			{text:'Level 1',exec:function() {
				ig.game.loadLevelDeferred(LevelIntro1);
			}}
		],
		
		initYOffset: 96,
		
		initXOffset: 256,
		
		init: function(x,y,settings) {
			//Check if the person has beat the preceding levels and then allow them to load the next one if they have
			if ($.cookie("l1") == "beat") {
				this.items.push({text:'Level 2', exec: function() {
					ig.game.loadLevelDeferred(LevelIntro2);
				}});
			}
			
			//Add link to go back to the main menu
			this.items.push({text:'Main Menu', exec: function() {
				ig.game.loadLevelDeferred(LevelMainMenu);
			}});
			
			this.parent(x,y,settings);
		}
	});
});
