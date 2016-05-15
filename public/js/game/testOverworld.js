var preload = function(game){}

preload.prototype = {
	preload: function(){ 
	  this.game.load.image('background', './images/game-background.png');
		this.game.load.spritesheet('player1', './images/player1-sprite.png', 48, 122, 3);
	},
	create: function(){
	  this.game.add.sprite(0, 0, 'background');
		cursors = game.input.keyboard.createCursorKeys();

		player1 = game.add.sprite(game.world.width - 150, game.world.height - 150, 'player1');
		player1.animations.add('left', [0, 1, 0], 10, false);
		player1.animations.add('right', [2, 1, 2], 10, false);

		battle = game.input.keyboard.addKey(Phaser.Keyboard.SPACE);
		// battle.onDown.add(battleStart, this);
	},
	update: function(){
		if (cursors.left.isDown)
		{
	    //  Move to the left
	    player1.x -= 10
			player1.animations.play('left');
		}
		else if (cursors.right.isDown)
		{
	    //  Move to the left
	    player1.x += 10
			player1.animations.play('right');
		}
		else if (cursors.down.isDown)
		{
	    //  Move to the left
	    player1.y += 10
			player1.animations.play('right');
		}
		else if (cursors.up.isDown)
		{
	    //  Move to the left
	    player1.y -= 10
			player1.animations.play('left');
		}
		else
		{
	    //  Stand still
	    player1.animations.stop();
	    player1.frame = 1;
		}
	}
}

// function battleStart() {
// 	game.state.start("Battle");
// }