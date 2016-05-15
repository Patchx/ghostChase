var preload = function(game){}

preload.prototype = {
	preload: function(){ 
	  this.game.load.image('background', './images/game-background.png');
		this.game.load.spritesheet('player1', './images/player1-sprite.png', 48, 122, 3);
	},
	create: function(){
	  this.game.add.sprite(0, 0, 'background');

		player1 = game.add.sprite(game.world.width - 150, game.world.height - 150, 'player1');
		player1.animations.add('dodge-b', [0, 1, 0], 10, false);

		rArrow = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		rArrow.onDown.add(dodge, this);
	},
	update: function(){

	}
}

function dodge() {
	var tween = game.add.tween(player1);
	tween.to({ x: player1.x + 60, repeatDelay: 1000 }, 100, Phaser.Easing.Linear.None, true, 0);
	player1.animations.play('dodge-b');
	returnPos(player1);
}

function returnPos() {
	var tween = game.add.tween(arguments[0]);
	tween.to({ x: game.world.width - 150, y: game.world.height - 150 }, 100, Phaser.Easing.Linear.None, true, 150);
}
