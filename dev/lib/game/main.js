ig.module( 
	'game.main' 
)
.requires(
	'plugins.perpixel',
	
	'impact.game',
	'impact.font',
	'impact.debug.debug',
	
	'game.entities.bloodParticle',
	'game.entities.ashParticle',
	
	'game.levels.1',
	'game.levels.2',
	'game.levels.intro',
	'game.levels.mainMenu',
	'game.levels.win',
	'game.levels.howToPlay',
	
	//'plugins.gui',
	'plugins.pause',
	'plugins.betterLoadLevel'
)
.defines(function(){

	MyGame = ig.Game.extend({
		
		gravity:2000,
		zoomLevel: 1,
		
		clearColor: '#ffffff',
		
		// Load a font
		font: new ig.Font( 'media/04b03.font.png' ),
		scale: 1,
		
		
		init: function() {
			this.loadLevel(LevelIntro);
		},
		
		update: function() {
			// Update all entities and backgroundMaps
			this.parent();
			
			// Add your own, additional update code here
			
			var player = this.getEntitiesByType( EntityPlayer )[0];
			if( player ) {
				this.screen.x = player.pos.x - ig.system.width/2;
				this.screen.y = player.pos.y - ig.system.height/2;
			}
		},
		
		draw: function() {
			// Draw all entities and backgroundMaps
			//this.parent();
			
			
			// Add your own drawing code here
			if (this.zoomLevel != 1) {
				ig.system.context.save();
				ig.system.context.scale(this.zoomLevel, this.zoomLevel);
				
				this.parent();
				
				ig.system.context.restore();
			} else {
				this.parent();
			}
			
		},
		
		zoom: function(zoomLevel) {
			ig.system.width = ig.system.realWidth / zoomLevel;
			ig.system.height = ig.system.realHeight / zoomLevel;
				
			this.zoomLevel = zoomLevel;
		},
		
		muteSound: function() {
			ig.soundManager.volume = 0;
		},
		
		unMuteSound: function() {
			ig.soundManager.volume = 1;
		},
		
		toggleSound: function() {
			if (ig.soundManager.volume == 0)
				this.unMuteSound();
			else
				this.muteSound();
		},
		
		muteMusic: function() {
			ig.music.volume = 0;
		},
		
		unMuteMusic: function() {
			ig.music.volume = 1;
		},
		
		toggleMusic: function() {
			if (ig.music.volume == 0)
				this.unMuteMusic();
			else
				this.muteMusic();
		}
	});
	
	//ig.setNocache(true);
	
	ig.Sound.channels = 10;
	
	ig.main( '#canvas', MyGame, 60, 1024, 640, 1 );

});