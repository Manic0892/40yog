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

//Menu superclass.  This defines all logic used in menus, such as drawing fonts in the correct location, font switching to indicate selection, and hit detection for cursor-menu option selection.

ig.module('game.entities.menu').requires('impact.entity', 'game.entities.cursor').defines(function() {
	EntityMenu = ig.Entity.extend({
		name: 'menu',
		
		font: new ig.Font( 'media/fonts/bebas_neue_100_black.png' ),
	
		redFont: new ig.Font('media/fonts/bebas_neue_100_red.png'), //The default selected font is red.  This has been changed to white in levelLoseLogic, and so this should potentially be named "selectedFont."
		
		//Text and execution of different menu options
		items: [
			{text:'HELLO, WORLD!',exec:function() {
				console.log("Hello, world!");
			}}
		],
		
		initYOffset: 200, //Initial X offset -- amount you want it to be drawn from the left of the screen
		
		initXOffset: 0, //Initial Y offset -- amount you want it to be drawn from the top of the screen
		
		ySpacing: 100, //Spacing between menu items.  Defaults to 100 since we're using a 100 point font.
		
		alignment: ig.Font.ALIGN.CENTER, //Centered by default
				
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255, 0, 0, 0.4)',
		
		animSheet: new ig.AnimationSheet('media/images/null.png',64,64),
		
		collision: ig.Entity.COLLIDES.NONE,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		size: {x:64, y:64},
		offset: {x:0,y:0},
		
		clearColor: '#fff', //Default the menu to drawing white behind it
		
		defaultCursor: 0, //Default to the regular pointer cursor
		
		menuItems: [], //Array of options in the menu
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			
			
			if (!ig.global.wm) {
				this.spawnMenuItems(settings); //Spawn the individual menu item entities
				
				ig.game.clearColor = this.clearColor; //Set the background color
				
				if (settings && settings.parentLevel) { //If there exist settings, and those settings include a parent level, get the cursor form the parent level
					this.parentLevel = settings.parentLevel;
					this.cursor = this.parentLevel.cursor;
				} else if (ig.game.getEntityByName('cursor')) { //Find the cursor
					this.cursor = ig.game.getEntityByName('cursor');
				} else {
					this.cursor = ig.game.spawnEntity(EntityCursor, 0, 0, {def: this.defaultCursor}); //Spawn a cursor
				}
				this.cursor.def = this.defaultCursor;
			}
		},
		
		spawnMenuItems: function(settings) {
			for (var i = 0; i < this.items.length; i++) { //For all items, spawn a menu item
					var width = this.font.widthForString(this.items[i].text); //Get the width of the text
					var height = this.font.heightForString(this.items[i].text); //Get the height of the text
					
					var xPos = this.initXOffset + ig.system.width/2 - width/2 + ig.game.screen.x; //Set the x position
					var yPos = this.initYOffset+i*this.ySpacing + ig.game.screen.y; //Set the y position
					this.spawnMenuItem(i,width,height,xPos,yPos,settings); //Spawn the new menu item
				}
		},
		
		spawnMenuItem: function(i,width,height,x,y,settings) {
			this.menuItems.push(ig.game.spawnEntity(EntityMenuItem, x, y, {width:width, height:height, text: this.items[i].text, exec: this.items[i].exec, font: this.font, redFont: this.redFont})); //Spawn a new menuItem
		},
		
		update: function() {
			this.parent();
			this.currentAnim = this.anims.idle;
		},
		
		kill: function() {
			if (this.parentLevel)
				this.cursor.def = this.parentLevel.defaultCursor; //If there's a parent level, set the default cursor to be the parent level's default cursor again.  This is mostly used on the pause menu, where we want a pointer for the pause menu but a crosshair or no cursor at all for the gameplay.
			this.parent();
		}
	});
	
	//Menu item superclass.
	EntityMenuItem = ig.Entity.extend({
		zIndex: 1000, //Drawn in front of pretty much everything
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NEVER,
		checkAgainst: ig.Entity.TYPE.get('cursor'), //Check against the cursor, so you can detect mouseovers and clicks
		
		ignorePause: true, //Don't pause, so you can detect mouseovers even on the pause menu
		
		size: {x:0,y:0},
		gravityFactor: 0,
		
		cursor: 2, //Default cursor is the selected pointer
		
		selected: false, //Start out with selected being false, so it draws unselected (usually black)
		
		init: function(x,y,settings) {
			this.size = {x:settings.width, y:settings.height};
			this.parent(x,y,settings);
			
			this.text = settings.text;
			this.exec = settings.exec; //Code to be executed when this is clicked
			this.font = settings.font;
			this.redFont = settings.redFont; //Selected font.  Should be renamed from "redFont."
		},
		
		update: function() {
			if (ig.input.pressed("lbtn") && this.selected) //If the mouse button was pressed and this is selected, execute this option's code
				this.exec();
			this.selected = false; //Reset to false so that if another option is seleted, this no longer is
		},
		
		check: function(other) {
			if (other.isCursor) this.selected = true; //If the cursor touches it, then set selected to true for the update function to do stuff with
		},
		
		draw: function() {
			this.selected ? this.redFont.draw(this.text, this.pos.x - ig.game.screen.x, this.pos.y - ig.game.screen.y, this.alignment) : this.font.draw(this.text, this.pos.x - ig.game.screen.x, this.pos.y - ig.game.screen.y, this.alignment); //If selected, draw the font in the same place as the invisible entity with a special font.  If unseletec, do the same thing but without the special font.
		}
	});
});