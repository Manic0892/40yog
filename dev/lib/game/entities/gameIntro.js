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

//Entity that handles the introduction for the game;  This entails fading the Manic Studios logo in and out.

ig.module('game.entities.gameIntro').requires('impact.entity', 'impact.image').defines(function() {
		EntityGameIntro = ig.Entity.extend({
			animSheet: new ig.AnimationSheet('media/images/Manic_Studios.png', 1000, 250),
			
			size: {x:1000, y:250},
			
			gravityFactor: 0,
			time:1.25, //Time for the total loop of fade in to out
			
			init: function(x,y,settings) {
				this.parent(x,y,settings);
				this.addAnim('idle', 1, [0]);
				this.currentAnim = this.anims.idle;
				if (!ig.global.wm) {
					ig.game.clearColor = '#000'; //Make the background black
				}
				//Center the logo on the screen
				this.pos.x = 0;
				this.pos.y = 0;
				this.pos.x = ig.system.width/2 - this.size.x/2;
				this.pos.y = ig.system.height/2 - this.size.y/2;
				this.currentAnim.alpha = 0; //Start faded out
				this.timer = new ig.Timer(this.time);
			},
			
			update: function() {
				this.parent();
				this.currentAnim.alpha = Math.abs(this.timer.delta()).map(this.time,0,0,1);
				this.currentAnim.alpha = this.currentAnim.alpha.limit(0,1);
				if (this.timer.delta() >= this.time) ig.game.loadLevelDeferred(LevelMainMenu); //When the timer has popped, the logo has faded in and out and it's time to load the main menu
				if (ig.input.pressed('space') || ig.input.pressed('lbtn') || ig.input.pressed('esc')) ig.game.loadLevelDeferred(LevelMainMenu); //Skip the intro logo
			}
		});
});