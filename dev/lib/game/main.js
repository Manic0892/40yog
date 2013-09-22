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
	'game.levels.mainMenu',
	'game.levels.win',
	
	//'plugins.gui',
	'plugins.pause'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	gravity:500,
	
	clearColor: '#ffffff',
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	scale: 1,
	
	
	init: function() {
		ig.soundManager.volume = .1;
		this.loadLevel(LevelMainMenu);
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
		this.parent();
		
		
		// Add your own drawing code here
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}
	}
});

//ig.setNocache(true);

ig.main( '#canvas', MyGame, 60, 800, 600, 1 );

});