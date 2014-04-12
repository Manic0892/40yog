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

//Static image.  Just displays an image that's not animated and doesn't collide.  Extended by other static images, like winFlag.

ig.module('game.entities.staticImage').requires('impact.entity').defines(function() {
	EntityStaticImage = ig.Entity.extend({
		size:{x:64, y:64},
		
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.TYPE.NEVER,
		
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255,224,122,0.4)',
		_wmIgnore: true,
		
		animSheet: new ig.AnimationSheet('media/images/null.png',64,64),
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
		}
	});
});