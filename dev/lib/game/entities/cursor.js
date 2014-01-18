//Cursor entity.  Used to draw the cursor, including the pointer and crosshair.

ig.module('game.entities.cursor').requires('impact.entity').defines(function() {
	EntityCursor = ig.Entity.extend({
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.NEVER,
		type: ig.Entity.TYPE.get('cursor'), //Custom type.  This prevents bugs from occurring, such as on level 2 where the cursor can trigger the ending cutscene.
		
		name:'cursor',
		
		size: {x:0, y:0},
		offset: {x:16,y:16},
		
		ignorePause:true,
		
		_wmIgnore: true,
		
		undetectableByMouse: true, //Fix for drag and drop plugin
		isCursor: true, //In case entities that check against it need to tell if it's a cursor.  This should be deprecated by the type property above.
		
		animSheet: new ig.AnimationSheet('media/images/cursor.png', 32, 32),
		
		zIndex: 99999999999, //This absurdly high zIndex makes sure it's drawn on top of everything else
		
		init: function(x,y,settings) {
			this.addAnim('normal', 1, [0]);
			this.addAnim('crosshair', 1, [1]);
			this.addAnim('pointer', 1, [2]);
			this.currentAnim = this.anims.normal;
			this.parent(x,y,settings);
			ig.game.sortEntitiesDeferred(); //Sort entities on spawn to make sure this is drawn on top of all others
			this.def = settings.def; //Default cursor type.  This makes it so that it is correct for the level or entity calling it (crosshair for game levels, pointer for menus, etc.).
			this.curr = this.def; //Set cursor type to default cursor types
		},
		
		update: function() {
			//Correct mouse x and y for screen position to allow for entity checks.  This later needs to be re-corrected by the draw function.
			this.pos.x = ig.input.mouse.x + ig.game.screen.x;
			this.pos.y = ig.input.mouse.y + ig.game.screen.y;
			
			//Change the cursor animation for the current cursor type needed--this switches it to being a pointer for clickable items, etc.
			switch(this.curr) {
				case 0:
					this.currentAnim = this.anims.normal;
					break;
				case 1:
					this.currentAnim = this.anims.crosshair;
					break;
				case 2:
					this.currentAnim = this.anims.pointer;
					break;
				case null:
					this.currentAnim = null;
					break;
				default:
					this.currentAnim = this.anims.normal;
					break;
			}
			this.curr = this.def; //Set current type back to default type.  Since the animation has been switched, we now want to set it back to default in case the cursor later moves off of the entity with a special cursor type.
		},
		
		check: function(other) {
			//Set current cursor type to the cursor type the entity needs.  This would be a pointer for menu items.
			if (other.cursor) {
				this.curr = other.cursor;
			}
		},
		
		draw: function() {
			//Override draw function to draw the cursor at the MOUSE position.
			if(this.currentAnim) {
				this.currentAnim.draw(ig.input.mouse.x-this.offset.x, ig.input.mouse.y-this.offset.y);
			}
		}
	});
});