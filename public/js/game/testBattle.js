var preload = function(game){}

preload.prototype = {

	preload: function(){ 
	  this.game.load.image('background', './images/game-background.png');
		this.game.load.spritesheet('player1', './images/stuntman.png', 37, 52, 15);
	},

	create: function(){

		// Sprites

	  this.game.add.sprite(0, 0, 'background');

		player1 = game.add.sprite(game.world.width * 0.5, game.world.height * 0.5, 'player1');
		player1.scale.setTo(2.5, 2.5);

		// Animation Settings

		playerSpeed = 10;
		playerDist = 20;
		player1.animations.add('dodge', [10, 6, 10], playerSpeed, false);
		player1.animations.add('attack', [10, 12, 10], playerSpeed, false);
		player1.events.onAnimationComplete.add(function(){
			returnPos(player1);
		},this);

		// Controls

		backArrow = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		backArrow.onDown.add(dodge, {dir: 'back'});
		upArrow = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		upArrow.onDown.add(dodge, {dir: 'up'});
		downArrow = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		downArrow.onDown.add(dodge, {dir: 'down'});

		frontArrow = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		frontArrow.onDown.add(attack, this);
	},

	update: function(){
	}
}

function returnPos() {
	var tween = game.add.tween(arguments[0]);
	tween.to({ x: game.world.width * 0.5, y: game.world.height * 0.5 }, playerSpeed, Phaser.Easing.Linear.None, true, 150);
}

function dodge(dir) {
	var tweenDodge = game.add.tween(player1);
	switch (this.dir) {
		case 'up':
			var dodgeHash = { y: player1.y - playerDist, repeatDelay: 3000 };
			break;
		case 'down':
			var dodgeHash = { y: player1.y + playerDist, repeatDelay: 3000 };
			break;
		case 'back':
			var dodgeHash = { x: player1.x + playerDist, repeatDelay: 3000 };
			break;
	}
	player1.animations.play('dodge');
	tweenDodge.to(dodgeHash, playerSpeed, Phaser.Easing.Linear.None, true, 0);
}

function attack() {
	var tweenAttack = game.add.tween(player1);
	tweenAttack.to({ x: player1.x - playerDist, repeatDelay: 3000 }, playerSpeed, Phaser.Easing.Bounce.In, true, 0);
	player1.animations.play('attack');
}
