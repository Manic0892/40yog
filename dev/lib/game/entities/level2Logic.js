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

//Level 2 logic.  Handles all the custom, non-Impact logic, such as centering on cutscenes.

ig.module('game.entities.level2Logic').requires('game.entities.levelLogic').defines(function() {
	EntityLevel2Logic = EntityLevelLogic.extend({
		zIndex: 9999, //Ensures it's drawn last every frame
		
		defaultCursor: null, //Don't draw the cursor at all
		
		updateScreenPos: function() {
			var player = ig.game.getEntitiesByType( EntityPlayerL2 )[0]; //Get the player
			var cutsceneProp = ig.game.getEntitiesByType(EntityPlayerL2IntroCutsceneProp); //Get the cutscene prop, even if it doesn't currently exist
			if( player && player.enabled) { //If the player exists and is enabled (that is, a cutscene is not going on), put it on the left side of the screen
				ig.game.screen.x = player.pos.x;
				ig.game.screen.y = 0;
			} else if (cutsceneProp.length != 0) { //Check if the cutscene prop exists
				if (cutsceneProp.length > 1) { //If there's more than one cutscene prop, use the "opening" version.  This is the cutscene prop used at the beginning of the level, not the end.
					for (var i = 0; i < cutsceneProp.length; i++) {
						if (cutsceneProp[i].opening) {
							cutsceneProp = cutsceneProp[i];
							break;
						}
					}
				} else { //Else, use the second cutscene prop
					cutsceneProp = ig.game.getEntityByName("cutsceneProp2");
				}
				//Center the prop on the screen
				ig.game.screen.x = cutsceneProp.pos.x - ig.system.width/2;
				ig.game.screen.y = cutsceneProp.pos.y - ig.system.height/2;
			}
			var maxX = ig.game.collisionMap.width * ig.game.collisionMap.tilesize - ig.system.width; //Get the last X coordinate of the level minus the screen width.  This is the last X coordinate that's acceptable to draw.
			if (ig.game.screen.x < 0) ig.game.screen.x = 0; //Make sure the screen doesn't go too high
			if (ig.game.screen.x > maxX) ig.game.screen.x = maxX; //Make sure the screen doesn't go too low
		}
	});
});