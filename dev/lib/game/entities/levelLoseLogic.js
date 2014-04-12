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

//Logic for the level lose screen displayed whenever the player dies.

ig.module('game.entities.levelLoseLogic').requires('impact.entity', 'game.entities.menu', 'game.levels.mainMenu').defines(function(){
	EntityLevelLoseLogic = ig.Entity.extend({
		font: new ig.Font( 'media/fonts/bebas_neue_50_black.png' ),
		
		initYOffset: 25,
		
		initXOffset: 0,
				
		alignment: ig.Font.ALIGN.CENTER,
				
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 125, 125, 0.4)',
		
		animSheet: new ig.AnimationSheet('media/images/null.png',64,64),
		
		text: "Oh no!\nYou lost!\nPlay again?",
		
		collision: ig.Entity.COLLIDES.NONE,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		size: {x:64, y:64},
		offset: {x:0,y:0},
		
		thisLevel:LevelMainMenu, //Level that was lost
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
			
			if (!ig.global.wm) {
				ig.game.spawnEntity(EntityLoseMenu,0,0,{thisLevel:this.thisLevel});
				ig.game.clearColor = '#500';
			}
		},
		
		update: function() {
			this.parent();
			//Shortcut keys so the player doesn't have to click ont he menu.  If enter, load the lost level.  If escape, back out to the main menu.
			if (ig.input.pressed('enter')) ig.game.loadLevelDeferred(this.thisLevel);
			if (ig.input.pressed('esc')) ig.game.loadLevelDeferred(LevelMainMenu);
		},
		
		draw: function() {
			this.parent();
			
			if (!ig.global.wm) {
				this.font.draw(this.text, this.initXOffset + ig.system.width/2, this.initYOffset, this.alignment);
			}
		}
	});
	
	//Custom menu for the level lose screen.
	EntityLoseMenu = EntityMenu.extend({
		name: 'loseMenu',
		
		redFont: new ig.Font('media/fonts/bebas_neue_100_white.png'), //Use white font instead of red font for the menu.  This is because the background for the level lose screen is red.
		
		items: [
			{text:'MAIN MENU',exec:function() {
				ig.game.loadLevel(LevelMainMenu);
			}}
		],
		
		initYOffset: 400,
		
		initXOffset: 0,
		
		init:function(x,y,settings) {
			//Add the replay option to the menu
			this.items.unshift({text:'REPLAY', exec:function() {
				ig.game.loadLevel(settings.thisLevel);
			}});
			this.parent(x,y,settings);
		}
	});
});