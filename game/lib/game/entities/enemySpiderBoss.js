ig.module(
	'game.entities.enemySpiderBoss'
).requires(
	'game.entities.enemySpider'/*,'plugins.perpixel'*/
).defines(function() {
	EntityEnemySpiderBoss = EntityEnemySpider.extend({
		size:{x:256,y:256},
		
		health:500,
		
		animSheet: new ig.AnimationSheet( 'media/spiderBoss.png', 256,256 ),
		
		perPixel: true
	});
});