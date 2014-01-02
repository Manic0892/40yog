ig.module('game.entities.slider').requires('impact.entity').defines(function() {
	EntitySlider = ig.Entity.extend({
		minLabel: '0%',
		maxLabel: '100%',
		height: 10,
		width: 200,
		strokeWidth: 4,
		barColor: '#afafaf',
		strokeColor: '#000',
		handleColor: '#afafaf',
		
		font: new ig.Font('media/04b03.font.png'),
		textYOffset: 3,
		
		_wmDrawBox: true,
		_wmBoxColor: "rgba(255,255,255,0.3)",
		size:{x:64,y:64},
		
		zIndex:1,
		gravityFactor:0,
		ignorePause: true,
		
		init: function(x,y,settings) {
			x -= this.width/2;
			this.parent(x,y,settings);
			this.absolute = settings.absolute;
			if (!ig.global.wm) {
				this.handle = ig.game.spawnEntity(EntitySliderHandle, this.pos.x, this.pos.y, {range:this.width, strokeWidth: this.strokeWidth});
				ig.game.sortEntitiesDeferred();
			}
		},
		
		update: function() {
			this.sliderLogic();
			this.parent();
		},
		
		draw: function() {
			var x = this.pos.x;
			var y = this.pos.y;
			if (!this.absolute) {
				x -= ig.game.screen.x;
				y -= ig.game.screen.y;
			}
			ig.system.context.beginPath();
			ig.system.context.rect(x,y,this.width, this.height);
			ig.system.context.fillStyle = this.barColor;
			ig.system.context.fill();
			ig.system.context.lineWidth = this.strokeWidth;
			ig.system.context.strokeStyle= this.strokeColor;
			ig.system.context.stroke();
			var minLabelWidth = this.font.widthForString(this.minLabel);
			var labelHeight = this.font.heightForString(this.minLabel);
			this.font.draw(this.minLabel, x-minLabelWidth - this.strokeWidth, y + this.strokeWidth);
			this.font.draw(this.maxLabel, x + this.width + this.strokeWidth, y + this.strokeWidth);
		},
		
		sliderLogic: function() {
			//console.log(this.handle.val);
		},
		
		kill: function() {
			this.handle.kill();
			this.parent();
		}
	});
	
	EntitySliderHandle = ig.Entity.extend({
		height:40,
		width:10,
		strokeWidth: 1,
		barColor: '#afafaf',
		strokeColor: '#f2f2f2',
		handleColor: '#afafaf',
		val:1,
		zIndex:2,
		size:{x:16,y:16},
		gravityFactor: 0,
		ignorePause:true,
		

		
		init: function(x,y,settings) {
			//this.maxVel.x = this.speed;
			//this.maxVel.y = this.speed;
			this.parent(x,y,settings);
			this.finalY = this.pos.y - settings.strokeWidth/2;
			this.minX = this.pos.x + this.strokeWidth;
			this.maxX = this.pos.x + settings.range - this.strokeWidth - this.width;
			this.size.x = this.width + this.strokeWidth;
			this.size.y = this.height + this.strokeWidth;
		},
		
		update: function() {
			this.dragAndDrop(false,false);
			this.pos.y = this.finalY;
			if (this.pos.x < this.minX) this.pos.x = this.minX;
			if (this.pos.x > this.maxX) this.pos.x = this.maxX;
			this.val = (this.pos.x-this.minX) / (this.maxX - this.minX);
			this.parent();
		},
		
		draw: function() {
			var x = this.pos.x;
			var y = this.pos.y;
			if (!this.absolute) {
				x -= ig.game.screen.x;
				y -= ig.game.screen.y;
			}
			ig.system.context.beginPath();
			ig.system.context.rect(x,y,this.width, this.height);
			ig.system.context.fillStyle = this.barColor;
			ig.system.context.fill();
			ig.system.context.lineWidth = this.strokeWidth;
			ig.system.context.strokeStyle= this.strokeColor;
			ig.system.context.stroke();
		}
	});
});