/*
 * Copyright 2014 Sean McGeer
 *
 * This file is part of the 40 Year Old Game.
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

//Level intro for level 2 -- TRAVIS BARBECUE

ig.module('game.entities.levelIntro2').requires('game.entities.levelIntro', 'game.levels.2').defines(function(){
	EntityLevelIntro2 = EntityLevelIntro.extend({
		titleText: 'TRAVIS BARBECUE',
		
		descriptionText: "Lil' Schmitty needs to deliver food--and he drives like a maniac while doing it.",
		
		levelToLoad: Level2
	});
});