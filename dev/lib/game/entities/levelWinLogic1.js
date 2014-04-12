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

//Win logic for level 1

ig.module('game.entities.levelWinLogic1').requires('game.entities.levelWinLogic', 'game.levels.intro2').defines(function(){
	EntityLevelWinLogic1 = EntityLevelWinLogic.extend({
		text: "Lil' Schmitty defeated the bedbugs.\nNow it's time to make some money.", //Sets up the next level, where you're a barbecue delivery guy
		
		nextLevel:LevelIntro2, //The next level to load.  It's the intro for the next full level.
		
		beat: "l1" //Cookie for level select menu
	});
	
	
});