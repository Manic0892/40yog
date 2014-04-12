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

//Base slider class.

ig.module('game.entities.slider').requires('impact.entity').defines(function() {
	EntitySlider = ig.Entity.extend({
		minLabel: '0%', //Default minimum label for the left side
		maxLabel: '100%', //Default maximum label for the right side
		title: 'Slider', //Displayed above the slider.  Explains what it does.
		height: 30,
		width: 300,
		strokeWidth: 4,
		useGradient: true, //Whether or not to use barColor as a solid fill or barColorGradient to create a linear gradient from low->high
		barColor: '#afafaf',
		barColorGradient: {low: '#000', high:'#fff'}, //Black->White
		strokeColor: '#000', //Color of the stroke around the slider bar
		handleColor: '#afafaf', //Color of the handle that's used for drag-and-drop value changes
		
		labelFont: new ig.Font('media/fonts/bebas_neue_40_black.png'),
		titleFont: new ig.Font('media/fonts/bebas_neue_40_black.png'),
		textYOffset: 3, //Amount to offset the text on the y axis to keep it aligned nicely
		
		_wmDrawBox: true,
		_wmBoxColor: "rgba(255,255,255,0.3)",
		size:{x:64,y:64},
		
		zIndex:10000, //Drawn on top of everything else
		gravityFactor:0,
		ignorePause: true, //Can't be disabled by pausing or the pause menu wouldn't work
		
		init: function(x,y,settings) {
			x -= this.width/2;
			this.parent(x,y,settings);
			if (!ig.global.wm) {
				this.handle = ig.game.spawnEntity(EntitySliderHandle, this.pos.x, this.pos.y, {slider:this}); //Spawn the handle that's used for drag-and-drop value changes
				ig.game.sortEntitiesDeferred(); //Sort entities so the handle is guaranteed to be on top
			}
		},
		
		update: function() {
			this.sliderLogic();
			this.parent();
		},
		
		draw: function() {
			var x = this.pos.x;
			var y = this.pos.y;
			x -= ig.game.screen.x;
			y -= ig.game.screen.y;
			ig.system.context.beginPath();
			ig.system.context.rect(x,y,this.width, this.height);
			if (this.useGradient) { //Use a linear gradient for low->high, or left->right
				var grd = ig.system.context.createLinearGradient(x,y,x+this.width,y+this.height);
				grd.addColorStop(0, this.barColorGradient.low);
				grd.addColorStop(1, this.barColorGradient.high);
				ig.system.context.fillStyle = grd;
			} else { //Use solid fill color
				ig.system.context.fillStyle = this.barColor;
			}
			ig.system.context.fill();
			ig.system.context.lineWidth = this.strokeWidth;
			ig.system.context.strokeStyle= this.strokeColor;
			ig.system.context.stroke();
			
			//Get the label width and height and draw the labels in the correct areas
			var minLabelWidth = this.labelFont.widthForString(this.minLabel);
			var labelHeight = this.labelFont.heightForString(this.minLabel);
			this.labelFont.draw(this.minLabel, x-minLabelWidth - this.strokeWidth, y+this.height/2-labelHeight/2);
			this.labelFont.draw(this.maxLabel, x + this.width + this.strokeWidth, y+this.height/2-labelHeight/2);
			
			//Get the title height and draw it in the correct area
			var titleHeight = this.titleFont.heightForString(this.title);
			this.titleFont.draw(this.title, x, y-titleHeight);
		},
		
		//Main slider logic code goes here.  Called every tick.  Used to change slider values into game or engine options.  Doesn't do anything by default.
		sliderLogic: function() {
		},
		
		kill: function() {
			this.handle.kill(); //Despawn the handle
			this.parent();
		}
	});
	
	//Slider handle.  Spawned to actually allow control over the slider.
	EntitySliderHandle = ig.Entity.extend({
		height:45,
		width:10,
		strokeWidth: 1,
		handleColor: '#afafaf', //Color of handle
		strokeColor: '#000', //Color of border surrounding handle
		val:1, //Initial value--defaults to 100%
		zIndex:10001, //Draw on top of slider
		size:{x:16,y:16},
		gravityFactor: 0,
		ignorePause:true,
		
		type: ig.Entity.TYPE.A,
		
		cursor: 2, //Pointer cursor
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.slider = settings.slider; //Create link to parent slider
			//Get max and min x positions, and the only y position since it shouldn't move on the y axis
			this.finalY = this.pos.y;
			this.minX = this.pos.x + this.strokeWidth;
			this.maxX = this.pos.x + this.slider.width - this.strokeWidth - this.width;
			this.size.x = this.width + this.strokeWidth/2;
			this.size.y = this.height + this.strokeWidth/2;
			
			this.pos.x = (this.slider.initVal * (this.maxX - this.minX)) + this.minX;
		},
		
		update: function() {
			this.dragAndDrop(false,false);
			this.pos.y = this.finalY;
			if (this.pos.x < this.minX) this.pos.x = this.minX;
			if (this.pos.x > this.maxX) this.pos.x = this.maxX;
			//Translate position into value from 0 to 1.  We can use this in the main slider class to do other stuff.
			this.val = (this.pos.x).map(this.minX,this.maxX,0,1);
			this.parent();
		},
		
		draw: function() {
			var x = this.pos.x;
			var y = this.pos.y;
			//Get correct x and y positions for drawing on canvas, instead of game positioning
			x -= ig.game.screen.x;
			y -= ig.game.screen.y;
			ig.system.context.beginPath();
			ig.system.context.rect(x,y,this.width, this.height);
			ig.system.context.fillStyle = this.handleColor;
			ig.system.context.fill();
			ig.system.context.lineWidth = this.strokeWidth;
			ig.system.context.strokeStyle= this.strokeColor;
			ig.system.context.stroke();
		}
	});
});
