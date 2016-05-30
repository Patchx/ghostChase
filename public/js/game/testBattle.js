var preload = function(game){}

preload.prototype = {

	preload: function(){ 
	  this.game.load.image('background', './images/game-background.png');
		this.game.load.spritesheet('player1', './images/stuntman.png', 37, 52, 15);
	},

	create: function(){

		// Sprites

	  this.game.add.sprite(0, 0, 'background');

		player1 = game.add.sprite(game.world.width * 0.5, game.world.height * 0.5, 'player1', 9);
		player1.scale.setTo(3, 3);

		// Animation Settings

		playerSpeed = 6;
		playerDist = 30;

		player1.animations.add('dodge', [9,10], playerSpeed, false);
		player1.animations.add('attack1', [9,12], playerSpeed, false);
		player1.animations.add('attack2', [13], playerSpeed, false);
		player1.animations.add('attack3', [14,13], playerSpeed, false);
		player1.animations.add('spAtk', [11], playerSpeed, false);

		// Controls

		backArrow = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		upArrow = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		downArrow = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		frontArrow = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);

		backArrow.onDown.add(dodge, {dir: 'back'});
		upArrow.onDown.add(dodge, {dir: 'up'});
		downArrow.onDown.add(dodge, {dir: 'down'});
		frontArrow.onDown.add(attack1, this);

		spAtkBtn = game.input.keyboard.addKey(Phaser.Keyboard.F);
		spAtkBtn.onDown.add(spAtk);

		pauseBtn = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		pauseBtn.onDown.add(pause);
	},

	update: function(){
	}
}


function pause() {
	if( game.paused !== true) {
		game.paused = true;
	} else {
		game.paused = false;
	}
}

function returnPos() {
	var tween = game.add.tween(arguments[0]);
	tween.to({ x: game.world.width * 0.5, y: game.world.height * 0.5 }, playerSpeed, Phaser.Easing.Linear.None, true, 150);
	player1.frame = 9;
	frontArrow.onDown.removeAll();
	frontArrow.onDown.add(attack1, this);
	enableFighter();
}

function enableFighter() {
	enableDodge();
	enableAtks();
}

function enableDodge() {
	backArrow.enabled = true;
	upArrow.enabled = true;
	downArrow.enabled = true;
}

function disableDodge() {
	backArrow.enabled = false;
	upArrow.enabled = false;
	downArrow.enabled = false;
}

function enableAtks() {
	frontArrow.enabled = true;
	spAtkBtn.enabled = true;
}

function disableAtks() {
	frontArrow.enabled = false;
	spAtkBtn.enabled = false;
}

function dodge(dir) {
	disableDodge();
	disableAtks();

	var tweenDodge = game.add.tween(player1);
	switch (this.dir) {
		case 'up':
			var dodgeHash = { y: player1.y - playerDist};
			break;
		case 'down':
			var dodgeHash = { y: player1.y + playerDist};
			break;
		case 'back':
			var dodgeHash = { x: player1.x + playerDist};
			break;
	}
	player1.animations.play('dodge');
	tweenDodge.to(dodgeHash, playerSpeed, Phaser.Easing.Linear.None, true, 0);

	player1.events.onAnimationComplete.add(function(){
		returnPos(player1);
	},this);
}

function attack1() {
	disableDodge();

	var tweenAttack = game.add.tween(player1);
	tweenAttack.to({ x: player1.x - playerDist }, playerSpeed, Phaser.Easing.Linear.None, true, 0);
	player1.animations.play('attack1');
	frontArrow.onDown.addOnce(attack2, this);

	player1.events.onAnimationComplete.add(function(){
		returnPos(player1);
	},this);
}

function attack2() {
	player1.animations.play('attack2');
	frontArrow.onDown.addOnce(attack3, this);
}

function attack3() {
	disableAtks();
	player1.animations.play('attack3');
}

function spAtk() {
	disableDodge();
	disableAtks();

	var tweenAttack = game.add.tween(player1);
	tweenAttack.to({ x: player1.x - (playerDist * 1.75), y: player1.y - playerDist }, playerSpeed, Phaser.Easing.Linear.None, true, 0);
	player1.animations.play('spAtk');

	player1.events.onAnimationComplete.add(function(){
		returnPos(player1);
	},this);
}
