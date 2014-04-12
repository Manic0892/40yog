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

//Level intro for level 1 -- BEDBUGS

ig.module('game.entities.levelIntro1').requires('game.entities.levelIntro', 'game.levels.1').defines(function(){
	EntityLevelIntro1 = EntityLevelIntro.extend({
		titleText: 'BEDBUGS',
		
		descriptionText: "Los Angeles is infested with bedbugs, and they prove an unkillable menace.\nOnly extreme heat, like the ancient power of the sun, can hurt them.\nHowever, Lil' Schmitty decides to take the fight to the bedbugs.",
		
		levelToLoad: Level1,
		
		clip: new ig.Sound('media/sounds/level1_intro_bedbug.*') //Sound clip from the podcast talking about bedbugs.  Should be shorter.
	});
});