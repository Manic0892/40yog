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

//Level win logic.  Displays the win screen and lets you load the next level.

ig.module('game.entities.levelWinLogic').requires('impact.entity', 'game.entities.menu').defines(function(){
	EntityLevelWinLogic = ig.Entity.extend({
		font: new ig.Font( 'media/fonts/bebas_neue_50_black.png' ),
		
		initYOffset: 25,
		
		initXOffset: 0,
				
		alignment: ig.Font.ALIGN.CENTER,
				
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 125, 125, 0.4)',
		
		animSheet: new ig.AnimationSheet('media/images/null.png',64,64),
		
		text: "Congratulations!\nYou won!\nPlay again?", //Default win message
		
		collision: ig.Entity.COLLIDES.NONE,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		size: {x:64, y:64},
		offset: {x:0,y:0},
		
		beat: "l0", //The cookie name to set.  "l1" for level 1, "l2" for level 2, etc.
		
		nextLevel:null, //The next level to load.  This is actually the intro for the next full level.
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
			
			if (!ig.global.wm) {
				ig.game.spawnEntity(EntityWinMenu,0,0,{nextLevel:this.nextLevel}); //Spawn the next level screen
				ig.game.clearColor = '#fff'; //White screen
				$.cookie(this.beat, "beat", {expires: 99999, path:'/'}); //Sets the cookie.  Later used for unlocking levels for the level select menu.
			}
		},
		
		update: function() {
			this.parent();
			if (ig.input.pressed('enter')) ig.game.loadLevelDeferred(this.nextLevel); //Load the next level when enter is pressed
			if (ig.input.pressed('esc')) ig.game.loadLevelDeferred(LevelMainMenu); //Load the main menu when escape is pressed
		},
		
		draw: function() {
			this.parent();
			
			if (!ig.global.wm) {
				this.font.draw(this.text, this.initXOffset + ig.system.width/2, this.initYOffset, this.alignment); //Draw the win text
			}
		}
	});
	
	EntityWinMenu = EntityMenu.extend({
		name: 'winMenu',
		
		items: [
			{text:'MAIN MENU',exec:function() {
				ig.game.loadLevel(LevelMainMenu);
			}}
		],
		
		initYOffset: 500,
		
		initXOffset: 0,
		
		init:function(x,y,settings) {
			if (settings.nextLevel != null) { //If there's a next level, place a link to it at the top of the menu
				this.items.unshift({text:'NEXT LEVEL', exec:function() {
					ig.game.loadLevel(settings.nextLevel);
				}});
				this.initYOffset -= 100;
			}
			this.parent(x,y,settings);
		}
	});
});