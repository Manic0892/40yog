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
		
		clickCD: .25,
		
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
		
		menuItems: [],
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			
			
			if (!ig.global.wm) {
				for (var i = 0; i < this.items.length; i++) {
					var width = this.font.widthForString(this.items[i].text);
					var height = this.font.heightForString(this.items[i].text);
					
					var xPos = this.initXOffset + ig.system.width/2 - width/2 + ig.game.screen.x;
					var yPos = this.initYOffset+i*this.ySpacing + ig.game.screen.y;
					this.spawnMenuItem(i,width,height,xPos,yPos,settings);
				}
				
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
		
		spawnMenuItem: function(i,width,height,x,y,settings) {
			this.menuItems.push(ig.game.spawnEntity(EntityMenuItem, x, y, {width:width, height:height, text: this.items[i].text, exec: this.items[i].exec, clickCD: this.clickCD, font: this.font, redFont: this.redFont}));
		},
		
		update: function() {
			this.parent();
			this.currentAnim = this.anims.idle;
		},
		
		kill: function() {
			if (this.parentLevel)
				this.cursor.def = this.parentLevel.defaultCursor;
			this.parent();
		}
	});
	
	EntityMenuItem = ig.Entity.extend({
		zIndex: 1000,
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NEVER,
		checkAgainst: ig.Entity.TYPE.BOTH,
		
		ignorePause: true,
		
		size: {x:0,y:0},
		gravityFactor: 0,
		
		cursor: 2,
		
		selected: false,
		
		init: function(x,y,settings) {
			this.size = {x:settings.width, y:settings.height};
			this.parent(x,y,settings);
			
			this.text = settings.text;
			this.exec = settings.exec;
			this.font = settings.font;
			this.redFont = settings.redFont;
			this.clickCD = new ig.Timer(settings.clickCD);
		},
		
		update: function() {
			if (ig.input.pressed("lbtn") && this.selected)
				this.exec();
			this.selected = false;
		},
		
		check: function(other) {
			if (other.isCursor) this.selected = true;
		},
		
		draw: function() {
			this.selected ? this.redFont.draw(this.text, this.pos.x - ig.game.screen.x, this.pos.y - ig.game.screen.y, this.alignment) : this.font.draw(this.text, this.pos.x - ig.game.screen.x, this.pos.y - ig.game.screen.y, this.alignment);
		}
	});
});