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

//Basic level logic entity.  Handles things like playing music and setting the cursor.

ig.module('game.entities.levelLogic').requires('impact.entity', 'game.entities.pauseMenu', 'game.entities.cursor').defines(function() {
	EntityLevelLogic = ig.Entity.extend({
		size:{x:64,y:64},
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 0, 255, 0.4)',
		
		ignorePause: true,
		safetyTimer: .25,
		
		levelMusic: new ig.Sound('media/sounds/rock_loop.*', false),
		
		defaultCursor: 1, //Crosshair
		
		zIndex: -999, //Updated and drawn before everything else
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			if (!ig.global.wm) {
				ig.music.add(this.levelMusic);
				ig.music.play();
				
				this.safetyTimer = new ig.Timer(this.safetyTimer);
				
				this.cursor = ig.game.spawnEntity(EntityCursor, 0, 0, {def:this.defaultCursor});
			}
		},
		
		update: function() {
			this.parent();
			if (ig.input.pressed('esc') && !ig.game.paused && this.safetyTimer.delta() >= 0) { //Pause the game and display the pause menu
				ig.game.togglePause();
				ig.game.spawnEntity(EntityPauseMenu, 0, 0, {parentLevel: this});
			}
			this.updateScreenPos();
		},
		
		updateScreenPos: function() { //Put the player in the center of the screen.  Should be updated with a better camera that pans when the player gets to level edges.
			var player = ig.game.getEntitiesByType( EntityPlayer )[0];
			if( player ) {
				ig.game.screen.x = player.pos.x - ig.system.width/2;
				ig.game.screen.y = player.pos.y - ig.system.height/2;
			}
		},
		
		loadLevel: function() { //Stop the music when the next level is loaded
			ig.music.stop();
		}
	});
	
	//Healthbar entity.  Draws the player's health in a red bar in the upper left corner.
	EntityHealthbar = ig.Entity.extend({
		_wmIgnore: true,
		
		draw: function() {
			var playerEnt = (ig.game.getEntitiesByType(EntityPlayer)[0]); //Get the player
			
			if (playerEnt) { //If it exists, calculate the health percentage
				newhp = playerEnt.health;
				maxhp = playerEnt.maxHealth;
				if (newhp > maxhp)
					newhp = maxhp;
				
				var width = 150;
				var height = 30;
				var x = 10;
				var y = 10;
				
				//Draw it in a bar in the top left corner
				var rectWidth = newhp/maxhp * width;
				ig.system.context.beginPath();
				ig.system.context.rect(x, y, rectWidth, height);
				ig.system.context.fillStyle = 'red';
				ig.system.context.fill();
				ig.system.context.beginPath();
				ig.system.context.rect(x, y, width, height);
				ig.system.context.strokeStyle = 'black';
				ig.system.context.lineWidth = 1;
				ig.system.context.stroke();
			}
		}
	});
});