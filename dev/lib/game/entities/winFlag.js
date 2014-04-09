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

//Win flag used on first level.  Represents the final part of the level that the player is trying to get to.  Inherits from staticImage.

ig.module('game.entities.winFlag').requires('game.entities.staticImage').defines(function() {
	EntityWinFlag = EntityStaticImage.extend({
		_wmIgnore: false,
		
		animSheet: new ig.AnimationSheet('media/images/sprites/winFlag.png',64,64) //Little flag that says "Win!" on it.  This should be changed.
	});
});
