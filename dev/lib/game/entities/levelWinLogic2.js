/*
 * Copyright 2014 Manic Studios
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

//Win logic for level 2

ig.module('game.entities.levelWinLogic2').requires('game.entities.levelWinLogic').defines(function(){
	EntityLevelWinLogic2 = EntityLevelWinLogic.extend({
		text: "Congratulations!\nYou beat the game.\n", //Level 2 is the last level currently
		
		nextLevel:null, //Level 2 is the last level currently
		
		beat: "l2" //Cookie for level select menu
	});
	
	
});