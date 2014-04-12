/*
 * Copyright 2014 Sean McGeer
 *
 * This file is part of the 40 Year Old Game.
 *
 * The 40 Year Old Game is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The 40 Year Old Game is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with the 40 Year Old Game.  If not, see <http://www.gnu.org/licenses/>.
*/

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
