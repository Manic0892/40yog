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

//Main game file.  Loads the rest of the game.

ig.module('game.main').requires(
	'plugins.perpixel',  //Per pixel collision plugin
	'plugins.entitytype', //Allow for more entity types than just A and B
	
	//Empika utils
	'plugins.empika.entity_utilities',
	'plugins.empika.game_utilities',
	'plugins.pause', //Allow for game loop pausing
	'plugins.manic.betterLoadLevel', //Simple plugin that calls a function on every entity before loading the next level.  Used to stop sound effects from playing.
	
	'impact.debug.debug', //Debug display.  Should be removed in final release.
	
	//Game levels
	'game.levels.intro',
	'game.levels.mainMenu',
	'game.levels.selectMenu',
	'game.levels.optionsMenu',
	'game.levels.intro1',
	'game.levels.1',
	'game.levels.lose1',
	'game.levels.win1',
	'game.levels.intro2',
	'game.levels.2',
	'game.levels.lose2',
	'game.levels.win2'
).defines(function(){
	game_40yog = ig.Game.extend({
		gravity:2000,
		zoomLevel: 1,
		
		clearColor: '#fff', //Set background to default to white
		
		scale: 1,
		
		//Bind keys and load intro screen--shows Manic Studios splash screen.  Also read preferences from saved cookies.
		init: function() {
			this.loadLevel(LevelIntro);
			ig.input.bind(ig.KEY.A, 'left');
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.D, 'right');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.W, 'up');
			ig.input.bind(ig.KEY.UP_ARROW, 'up')
			ig.input.bind(ig.KEY.S, 'down');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.SPACE, 'jump');
			ig.input.bind(ig.KEY.ESC, 'esc');
			ig.input.bind(ig.KEY.ENTER, 'enter');
			ig.input.bind(ig.KEY.MOUSE1, 'lbtn');
			
			if ($.cookie("music")) ig.music.volume = Number($.cookie("music"));
			if ($.cookie("sound")) ig.soundManager.volume = Number($.cookie("sound"));
			
			ig.global.graphics = {};
			
			if ($.cookie("gradient"))
				ig.global.graphics.gradient = ($.cookie("gradient") == "true");
			else
				ig.global.graphics.gradient = true;
		},
		
		update: function() {
			this.parent();
			
			//Center the camera on the player.  This should be done with a camera trap or something similar, instead of a dead-on look straight at the player.
			var player = this.getEntitiesByType( EntityPlayer )[0];
			if( player ) {
				this.screen.x = player.pos.x - ig.system.width/2;
				this.screen.y = player.pos.y - ig.system.height/2;
			}
		},
		
		draw: function() {
			//Zoom code.  Unused at this time, unless you change the zoom level in the console.  Reason: things get janky fast.
			if (this.zoomLevel != 1) {
				ig.system.context.save();
				ig.system.context.scale(this.zoomLevel, this.zoomLevel);
				
				this.parent();
				
				ig.system.context.restore();
			} else { //Defaults to normal zoom level
				this.parent();
			}
			
		},
		
		zoom: function(zoomLevel) {
			ig.system.width = ig.system.realWidth / zoomLevel;
			ig.system.height = ig.system.realHeight / zoomLevel;
				
			this.zoomLevel = zoomLevel;
		}
	});
	
	//10 sound channels--this means that each sound can be played 10 times concurrently
	ig.Sound.channels = 10;
	
	ig.main( '#canvas', game_40yog, 60, 1024, 640, 1 ); //FPS=60 Res=1024/640 Scale=1

});