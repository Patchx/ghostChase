var preload = function(game){}

preload.prototype = {

	preload: function(){ 
	  this.game.load.image('background', './images/game-background.png');
		this.game.load.spritesheet('player1', './images/stuntman.png', 37, 52, 15);
    this.game.load.spritesheet('arrow-left', './images/arrow-left.png', 128, 128);
    this.game.load.spritesheet('arrow-right', './images/arrow-right.png', 128, 128);
    this.game.load.spritesheet('arrow-up', './images/arrow-up.png', 128, 128);
    this.game.load.spritesheet('arrow-down', './images/arrow-down.png', 128, 128);
    this.game.load.spritesheet('F-btn', './images/F-button.png', 128, 128);
    this.game.load.spritesheet('D-btn', './images/D-button.png', 128, 128);
		this.game.load.spritesheet('classImage', './images/classChange.png', 20, 24, 4);
	},

	create: function(){

		// Battle Settings

		spriteScale = game.world.width * 0.004;
		arrowScale = game.world.width * 0.00064;
		p1Location = {x: game.world.width * 0.65, y: game.world.height * 0.35};
		playerSpeed = 6;
		playerDist = 30;

		// Sprites

	  this.game.add.sprite(0, 0, 'background');

		player1 = game.add.sprite(p1Location['x'], p1Location['y'], 'player1', 9);
		player1.scale.setTo(spriteScale, spriteScale);

		classImage = game.add.sprite(game.world.width * 0.45, game.world.height * 0.84, 'classImage', 3);
		classImage.scale.setTo(spriteScale, spriteScale);

		btnLeft = game.add.button(game.world.width * 0.74, game.world.height * 0.73, 'arrow-left');
		btnRight = game.add.button(game.world.width * 0.9, game.world.height * 0.73, 'arrow-right');
		btnUp = game.add.button(game.world.width * 0.82, game.world.height * 0.62, 'arrow-up');
		btnDown = game.add.button(game.world.width * 0.82, game.world.height * 0.85, 'arrow-down');
		btnD = game.add.button(game.world.width * 0.01, game.world.height * 0.82, 'D-btn');
		btnF = game.add.button(game.world.width * 0.11, game.world.height * 0.82, 'F-btn');

		btnLeft.scale.setTo(arrowScale, arrowScale);
		btnRight.scale.setTo(arrowScale, arrowScale);
		btnUp.scale.setTo(arrowScale, arrowScale);
		btnDown.scale.setTo(arrowScale, arrowScale);
		btnF.scale.setTo(spriteScale * 0.19, spriteScale * 0.19);
		btnD.scale.setTo(spriteScale * 0.19, spriteScale * 0.19);

		// Animations

		player1.animations.add('dodge', [9,10], playerSpeed, false);
		player1.animations.add('attack1', [9,12], playerSpeed, false);
		player1.animations.add('attack2', [13], playerSpeed * 0.5, false);
		player1.animations.add('attack3', [14,13], playerSpeed * 0.7, false);
		player1.animations.add('spAtk', [11], playerSpeed * 1.2, false);

		// Controls

		backArrow = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		upArrow = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		downArrow = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		frontArrow = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);

		backArrow.onDown.add(dodge, {dir: 'back'});
		upArrow.onDown.add(dodge, {dir: 'up'});
		downArrow.onDown.add(dodge, {dir: 'down'});
		frontArrow.onDown.add(attack1, this);

		btnRight.onInputDown.add(dodge, {dir: 'back'});
		btnUp.onInputDown.add(dodge, {dir: 'up'});
		btnDown.onInputDown.add(dodge, {dir: 'down'});
		btnLeft.onInputDown.add(attack1, this);

		spAtkKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
		spAtkKey.onDown.add(spAtk);
		btnF.onInputDown.add(spAtk);

		classKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		classKey.onDown.add(classChange);
		btnD.onInputDown.add(classChange);

		pauseBtn = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		pauseBtn.onDown.add(pause);
	},

	update: function(){
	}
}

function classChange() {
	classImage.frame = classImage.frame + 1;
	classImage.frame = classImage.frame % 4;
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
	tween.to({ x: p1Location['x'], y: p1Location['y'] }, playerSpeed, Phaser.Easing.Linear.None, true, 150);
	player1.frame = 9;
	frontArrow.onDown.removeAll();
	frontArrow.onDown.add(attack1, this);
	btnLeft.onInputDown.add(attack1, this);
	enableFighter();
}

function enableFighter() {
	enableDodge();
	enableAtks();
}

function enableDodge() {
	backArrow.enabled = true;
	btnRight.inputEnabled = true;
	upArrow.enabled = true;
	btnUp.inputEnabled = true;
	downArrow.enabled = true;
	btnDown.inputEnabled = true;
}

function disableDodge() {
	backArrow.enabled = false;
	btnRight.inputEnabled = false;
	upArrow.enabled = false;
	btnUp.inputEnabled = false;
	downArrow.enabled = false;
	btnDown.inputEnabled = false;
}

function enableAtks() {
	frontArrow.enabled = true;
	btnLeft.inputEnabled = true;
	spAtkKey.enabled = true;
	btnF.inputEnabled = true;
}

function disableAtks() {
	frontArrow.enabled = false;
	btnLeft.inputEnabled = false;
	spAtkKey.enabled = false;
	btnF.inputEnabled = false;
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
	btnLeft.onInputDown.addOnce(attack2, this);

	player1.events.onAnimationComplete.add(function(){
		returnPos(player1);
	},this);
}

function attack2() {
	player1.animations.play('attack2');
	frontArrow.onDown.addOnce(attack3, this);
	btnLeft.onInputDown.addOnce(attack3, this);
}

function attack3() {
	disableAtks();
	player1.animations.play('attack3');
}

function spAtk() {
	disableDodge();
	disableAtks();
	spAtkKey.enabled = false;
	btnF.inputEnabled = false;

	var tweenAttack = game.add.tween(player1);
	tweenAttack.to({ x: player1.x - (playerDist * 1.75), y: player1.y - playerDist }, playerSpeed, Phaser.Easing.Linear.None, true, 0);
	player1.animations.play('spAtk');

	player1.events.onAnimationComplete.add(function(){
		returnPos(player1);
	},this);
}
