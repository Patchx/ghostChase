var preload = function(game){}

preload.prototype = {

	preload: function(){ 
	  this.game.load.image('background', './images/game-background.png');
		this.game.load.spritesheet('stuntman', './images/stuntman.png', 37, 52, 15);
		this.game.load.spritesheet('gen', './images/gen.png', 39, 58, 15);
		this.game.load.spritesheet('healer', './images/healer.png', 47, 60, 15);
    this.game.load.spritesheet('arrow-left', './images/arrow-left.png', 128, 128);
    this.game.load.spritesheet('arrow-right', './images/arrow-right.png', 128, 128);
    this.game.load.spritesheet('arrow-up', './images/arrow-up.png', 128, 128);
    this.game.load.spritesheet('arrow-down', './images/arrow-down.png', 128, 128);
    this.game.load.spritesheet('F-btn', './images/F-button.png', 128, 128);
    this.game.load.spritesheet('D-btn', './images/D-button.png', 128, 128);
		this.game.load.spritesheet('classImage', './images/classChange.png', 19, 24, 3);
	},

	create: function(){

		// Visual Settings

		var spriteScale = game.world.width * 0.004;
		var arrowScale = game.world.width * 0.00064;

		// Battle Settings

		var playerSpeed = 6;
		var playerDist = 30;
		var p1Location = {x: game.world.width * 0.65, y: game.world.height * 0.35};
		var p1Class = 0;

		// Sprites

	  this.game.add.sprite(0, 0, 'background');

		var player1 = game.add.sprite(p1Location['x'], p1Location['y'], 'stuntman', 9);
		player1.scale.setTo(spriteScale, spriteScale);

		var classImage = game.add.sprite(game.world.width * 0.45, game.world.height * 0.84, 'classImage', 3);
		classImage.scale.setTo(spriteScale, spriteScale);

		var btnLeft = game.add.button(game.world.width * 0.74, game.world.height * 0.73, 'arrow-left');
		var btnRight = game.add.button(game.world.width * 0.9, game.world.height * 0.73, 'arrow-right');
		var btnUp = game.add.button(game.world.width * 0.82, game.world.height * 0.62, 'arrow-up');
		var btnDown = game.add.button(game.world.width * 0.82, game.world.height * 0.85, 'arrow-down');
		var btnD = game.add.button(game.world.width * 0.01, game.world.height * 0.82, 'D-btn');
		var btnF = game.add.button(game.world.width * 0.11, game.world.height * 0.82, 'F-btn');

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

		var backArrow = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		var upArrow = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		var downArrow = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		var frontArrow = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);

		backArrow.onDown.add(dodge, {dir: 'back'});
		upArrow.onDown.add(dodge, {dir: 'up'});
		downArrow.onDown.add(dodge, {dir: 'down'});
		frontArrow.onDown.add(classChange, {playerClass: p1Class});

		btnRight.onInputDown.add(dodge, {dir: 'back'});
		btnUp.onInputDown.add(dodge, {dir: 'up'});
		btnDown.onInputDown.add(dodge, {dir: 'down'});
		btnLeft.onInputDown.add(classChange, {playerClass: p1Class});

		var spAtkKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		spAtkKey.onDown.add(spAtk);
		btnD.onInputDown.add(spAtk);

		var atkKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
		atkKey.onDown.add(attack1, this);
		btnF.onInputDown.add(attack1, this);

		var pauseBtn = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		pauseBtn.onDown.add(pause);

		// Functions

		function classChange(playerClass) {
			classImage.frame = (classImage.frame + 1) % 3;
			this.playerClass = (this.playerClass + 1) % 3;
			switch(this.playerClass) {
				case 2:
					player1.loadTexture('gen', 9);
					break;
				case 1:
					player1.loadTexture('healer', 9);
					break;
				case 0:
					player1.loadTexture('stuntman', 9);
					break;
				default:
					break;
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
			tween.to({ x: p1Location['x'], y: p1Location['y'] }, playerSpeed, Phaser.Easing.Linear.None, true, 150);
			player1.frame = 9;
			atkKey.onDown.removeAll();
			btnF.onInputDown.removeAll();
			atkKey.onDown.add(attack1, this);
			btnF.onInputDown.add(attack1, this);
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
			atkKey.enabled = true;
			btnF.inputEnabled = true;
			spAtkKey.enabled = true;
			btnD.inputEnabled = true;
		}

		function disableAtks() {
			atkKey.enabled = false;
			btnF.inputEnabled = false;
			spAtkKey.enabled = false;
			btnD.inputEnabled = false;
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
			atkKey.onDown.addOnce(attack2, this);
			btnF.onInputDown.addOnce(attack2, this);

			player1.events.onAnimationComplete.add(function(){
				returnPos(player1);
			},this);
		}

		function attack2() {
			player1.animations.play('attack2');
			atkKey.onDown.addOnce(attack3, this);
			btnF.onInputDown.addOnce(attack3, this);
		}

		function attack3() {
			disableAtks();
			player1.animations.play('attack3');
		}

		function spAtk() {
			disableDodge();
			disableAtks();
			spAtkKey.enabled = false;
			btnD.inputEnabled = false;

			var tweenAttack = game.add.tween(player1);
			tweenAttack.to({ x: player1.x - (playerDist * 1.75), y: player1.y - playerDist }, playerSpeed, Phaser.Easing.Linear.None, true, 0);
			player1.animations.play('spAtk');

			player1.events.onAnimationComplete.add(function(){
				returnPos(player1);
			},this);
		}

	},

	update: function(){
	}
}