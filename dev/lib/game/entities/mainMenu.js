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

//Main Menu.  Appears as the first interactive part of the game, with entries to play from level 1, select a level, or change options.

ig.module('game.entities.mainMenu').requires('game.entities.menu').defines(function(){
	EntityMainMenu = EntityMenu.extend({
		name: 'mainMenu',
		
		items: [
			{text:'PLAY',exec:function() {
				ig.game.loadLevelDeferred(LevelIntro1); //Load the intro for the first level
			}}, {text:'LEVEL SELECT', exec:function() {
				ig.game.loadLevelDeferred(LevelSelectMenu); //Load the level select menu
			}}, {text:'OPTIONS', exec:function() {
				ig.game.loadLevelDeferred(LevelOptionsMenu); //Load the options menu
			}}
		],
		
		initYOffset: 96,
		
		initXOffset: 256
	});
});