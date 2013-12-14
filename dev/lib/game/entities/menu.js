ig.module('game.entities.menu').requires('impact.entity').defines(function() {
	EntityMenu = ig.Entity.extend({
		//STUB--should replace mainMenu, winMenu and howToPlay menus
		//TODO
		
		name: 'menu',
		
		font: new ig.Font( 'media/impact_bitmap.png' ),
	
		redFont: new ig.Font('media/impact_bitmap_red.png'),
		
		items: [
			{text:'HELLO, WORLD!',exec:function() {
				console.log("Hello, world!");
			}}
		],
		
		clickCD: [], //*See below
		
		hitboxList: [],
		
		initYOffset: 200,
		
		initXOffset: 0,
		
		ySpacing: 100,
		
		alignment: ig.Font.ALIGN.CENTER,
		
		currSelected: null,
		
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255, 0, 0, 0.4)',
		
		animSheet: new ig.AnimationSheet('media/null.png',64,64),
		
		collision: ig.Entity.COLLIDES.NONE,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		size: {x:64, y:64},
		offset: {x:0,y:0},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			
			
			if (!ig.global.wm) {
				for (var i = 0; i < this.items.length; i++) {
					var width = this.font.widthForString(this.items[i].text);
					var height = this.font.heightForString(this.items[i].text);
					
					var pos1 = {x:ig.system.width/2 - width/2 + this.initXOffset, y:this.initYOffset+i*this.ySpacing};
					var pos2 = {x:ig.system.width/2 + width/2 + this.initXOffset, y:this.initYOffset+i*this.ySpacing+height};
					
					this.hitboxList.push(new hitbox(pos1, pos2, i));
					
					this.clickCD.push(0); //*See below
				}
				
				ig.input.initMouse();
				ig.input.bind(ig.KEY.MOUSE1, 'shoot');
				
				ig.game.clearColor = '#ffffff';
			}
		},
		
		update: function() {
			this.parent();
			
			this.currentAnim = this.anims.idle;
			
			this.currSelected = null;
			
			for (var i = 0; i < this.hitboxList.length; i++) {
				if (this.hitboxList[i].isTouching(ig.input.mouse.x, ig.input.mouse.y)) {
					this.currSelected = this.hitboxList[i].key;
				}
			}
			
			for (var i = 0; i < this.clickCD.length; i++) {
				this.clickCD[i]--; //*See below
			}
			
			if (ig.input.state('shoot') && this.currSelected != null && this.clickCD[this.currSelected] <= 0) {
				this.clickCD[this.currSelected] = 60; //*I fucking hate this shit which is only here to prevent spamming unintentionally.  It's impossible to click for fewer than a few frames.  This should hackishly fix the issue, though.
				this.items[this.currSelected].exec();
			}
		},
		
		draw: function() {
			this.parent();
			
			if (!ig.global.wm) {
				for (var i = 0; i < this.items.length; i++) {
					if (i != this.currSelected)
						this.font.draw(this.items[i].text, this.initXOffset + ig.system.width/2, this.initYOffset + i*this.ySpacing, this.alignment);
					else
						this.redFont.draw(this.items[i].text, this.initXOffset + ig.system.width/2, this.initYOffset + i*this.ySpacing, this.alignment);
				}
			}
		},
		
		
		createHitbox: function(xy1,xy2,key) {
			this.hitboxList.push(new hitbox(xy1,xy2,key));
		}
	});
});

var hitbox = function(xy1,xy2,key) {
	this.pos1 = {};
	this.pos2 = {};
	this.pos1.x = xy1.x;
	this.pos1.y = xy1.y;
	this.pos2.x = xy2.x;
	this.pos2.y = xy2.y;
	
	this.key = key;
	
	this.isTouching = function(x,y) {
		return (x > this.pos1.x && x < this.pos2.x && y > this.pos1.y && y < this.pos2.y);
	}
}


/*
 *
 *This could all be done better with entities and using native hitbox detection--but this might work better for text, so I'm trying it out this way
 *
 */