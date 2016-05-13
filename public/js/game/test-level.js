var divX = $("#game").width();
var divY = $("#game").width() / 1.5;

var game = new Phaser.Game(divX, divY, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('background', './images/game-background.png');
	game.load.spritesheet('player1', './images/player1-sprite.png', 48, 122, 3);
}

function create() {
  game.add.sprite(0, 0, 'background');
	player = game.add.sprite(game.world.width - 150, game.world.height - 150, 'player1');
}

function update() {
}