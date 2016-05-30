var preload = function(game){}

preload.prototype = {
	preload: function(){ 
	  this.game.load.image('background', './images/game-background.png');
		this.game.load.spritesheet('player1', './images/stuntman.png', 37, 52, 15);
	},
	create: function(){
	  this.game.add.sprite(0, 0, 'background');

		player1 = game.add.sprite(game.world.width * 0.5, game.world.height * 0.5, 'player1');
		player1.scale.setTo(2.5, 2.5);
		player1.animations.add('dodge-b', [10, 6, 10], 100, false);

		rArrow = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		rArrow.onDown.add(dodge, {dir: 'back'});
		upArrow = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		upArrow.onDown.add(dodge, {dir: 'up'});
		downArrow = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		downArrow.onDown.add(dodge, {dir: 'down'});
	},
	update: function(){

	}
}

function dodge(dir) {
	var tweenDodge = game.add.tween(player1);
	switch (this.dir) {
		case 'up':
			var dodgeHash = { y: player1.y - 60, repeatDelay: 3000 };
			break;
		case 'down':
			var dodgeHash = { y: player1.y + 60, repeatDelay: 3000 };
			break;
		case 'back':
			var dodgeHash = { x: player1.x + 60, repeatDelay: 3000 };
			break;
	}

	tweenDodge.to(dodgeHash, 100, Phaser.Easing.Linear.None, true, 0);
	player1.animations.play('dodge-b');
	returnPos(player1);
}

function returnPos() {
	var tween = game.add.tween(arguments[0]);
	tween.to({ x: game.world.width * 0.5, y: game.world.height * 0.5 }, 100, Phaser.Easing.Linear.None, true, 150);
}
