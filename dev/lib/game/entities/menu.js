ig.module('game.entities.menu').requires('impact.entity', 'game.entities.cursor').defines(function() {
	EntityMenu = ig.Entity.extend({
		name: 'menu',
		
		font: new ig.Font( 'media/bebas_neue_100_black.png' ),
	
		redFont: new ig.Font('media/bebas_neue_100_red.png'),
		
		items: [
			{text:'HELLO, WORLD!',exec:function() {
				console.log("Hello, world!");
			}}
		],
		
		clickCD: [], //*See below
		defClickCD: .25,
		
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
		
		clearColor: '#fff',
		
		defaultCursor: 0,
		
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
					
					ig.game.spawnEntity(EntityHitbox, pos1.x + ig.game.screen.x, pos1.y+ig.game.screen.y, {width:width, height:height}); //This should eventually be expanded to replace the other hitbox system.
					
					this.clickCD.push(new ig.Timer(this.defClickCD)); //*See below
				}
				
				ig.input.initMouse();
				ig.input.bind(ig.KEY.MOUSE1, 'lbtn');
				
				ig.game.clearColor = this.clearColor;
				
				if (settings && settings.parentLevel) {
					this.parentLevel = settings.parentLevel;
					this.cursor = this.parentLevel.cursor;
				} else if (ig.game.getEntityByName('cursor')) {
					this.cursor = ig.game.getEntityByName('cursor').def;
				} else {
					this.cursor = ig.game.spawnEntity(EntityCursor, 0, 0, {def: this.defaultCursor});
				}
				this.cursor.def = this.defaultCursor;
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
			
			if (ig.input.state('lbtn') && this.currSelected != null && this.clickCD[this.currSelected].delta() >= 0) {
				this.clickCD[this.currSelected].reset(); //*I fucking hate this shit which is only here to prevent spamming unintentionally.  It's impossible to click for fewer than a few frames.  This should hackishly fix the issue, though.
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
		},
		
		kill: function() {
			if (this.parentLevel)
				this.cursor.def = this.parentLevel.defaultCursor;
			this.parent();
		}
	});
	
	//This should eventually be expanded to replace the other hitbox system.
	EntityHitbox = ig.Entity.extend({
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NEVER,
		
		size: {x:0,y:0},
		gravityFactor: 0,
		
		cursor: 2,
		
		init: function(x,y,settings) {
			this.size = {x:settings.width, y:settings.height};
			this.parent(x,y,settings);
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