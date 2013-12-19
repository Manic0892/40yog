ig.module( 'game.levels.selectMenu' )
.requires( 'impact.image','game.entities.selectMenu' )
.defines(function(){
LevelSelectMenu=/*JSON[*/{
	"entities": [
		{
			"type": "EntitySelectMenu",
			"x": 556,
			"y": 180
		}
	],
	"layer": [
		{
			"name": "bgLayer",
			"width": 16,
			"height": 10,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/menu.jpg",
			"repeat": false,
			"preRender": true,
			"distance": "1",
			"tilesize": 64,
			"foreground": false,
			"data": [
				[33,34,35,36,37,38,39,40,41,41,42,43,44,45,45,45],
				[48,49,50,51,52,53,54,55,56,56,57,58,59,60,60,60],
				[63,64,65,66,67,68,69,70,71,71,72,73,74,75,75,75],
				[78,79,80,81,82,83,84,85,86,86,87,88,89,90,90,90],
				[93,94,95,96,97,98,99,100,101,101,102,103,104,105,105,105],
				[108,109,110,111,112,113,114,115,116,116,117,118,119,120,120,120],
				[123,124,125,126,127,128,129,130,131,131,132,133,134,135,135,135],
				[138,139,140,141,142,143,144,145,146,146,147,148,149,150,150,150],
				[153,154,155,156,157,158,159,160,161,161,162,163,164,165,165,165],
				[168,169,170,171,172,173,174,175,176,176,177,178,179,180,180,180]
			]
		}
	]
}/*]JSON*/;
LevelSelectMenuResources=[new ig.Image('media/menu.jpg')];
});