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

//Text entity.  Displays text when triggered.  Mostly obsolete, since sticking the text into the tilesheet works better.  Because of this the code won't be commented until it's actively used.

ig.module('game.entities.text').requires('impact.entity').defines(function() {
	EntityText = ig.Entity.extend({
		size: {x:64,y:64},
		
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0,255,0,0.4)',
		
		ignorePause: false,
		
		font: new ig.Font( 'media/fonts/bebas_neue_25_black.png' ),
		alignment: ig.Font.ALIGN.CENTER,
		
		time: 2,
		timer: null,
		
		name: 'Text box',
		val: 'Hello, world!',
		
		activated: false,
		
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NEVER,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
		},
		
		update: function() {
			this.parent();
			if (this.activated && this.timer != null && this.timer.delta() >= 0) {
				this.kill();
			} else if (this.activated && this.timer == null) {
				this.timer = new ig.Timer(this.time);
			}
		},
		
		draw: function() {
			this.parent();
			if (this.activated && !ig.global.wm) {
				this.font.draw(this.val, ig.system.width/2, 50, this.alignment);
			}
		},
		
		
		triggeredBy: function(triggered, other) {
			console.log(this.val);
			this.activated = true;
		}
	});
});