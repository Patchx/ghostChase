var divX = $("#game").width();
var divY = $("#game").width() / 1.5;

var game = new Phaser.Game(divX, divY, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('background', './images/game-background.png');
}

function create() {
  game.add.sprite(0, 0, 'background');
}

function update() {
}