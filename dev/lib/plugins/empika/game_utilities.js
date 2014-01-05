/*
Plugin Name: Game utilities
Plugin URI: https://github.com/empika/ImpactJS-Plugins
Description: Some general helper methods
Version: 0.2
Revision Date: 20-05-2012
Requires: ImpactJS
Author: Edward Parris
Author URI: http://www.nixonmcinnes.co.uk/people/edward/
Changelog
---------
0.2: Namespace the plugin.
0.1: Initial release.
*/
ig.module(
  'plugins.empika.game_utilities'
)
.requires(
  'impact.game'
)
.defines(function() {
  ig.Game.inject({
    
    // Return an array of entities that are under the mouse
    entitiesUnderMouse: function(){
      var mouse_x = ig.input.mouse.x + ig.game.screen.x;
      var mouse_y = ig.input.mouse.y + ig.game.screen.y;

      var entities = this.entities;
      var under_mouse = [];
      for(var x = 0; x < entities.length; x = x+1){
        var entity = entities[x];
        var pos_x = entity.pos.x;
        var pos_y = entity.pos.y;
        var isDetectable = !entity.undetectableByMouse;
        if( pos_x <= mouse_x && mouse_x <= pos_x + entity.size.x &&
            pos_y <= mouse_y && mouse_y <= pos_y + entity.size.y && isDetectable){
          under_mouse.push(entity);
        }
      }
      return under_mouse;
    }
  });
});