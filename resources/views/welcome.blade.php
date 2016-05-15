@extends('layouts.master')

@section('title', '- Main')

@section('sidebar')
<p class="lead sideDiv">Controls: </p>
@endsection

@section('content')

<div class="inner cover">
  <h1 class="cover-heading">spriteBattle Battle Sim</h1>
  <div class="lead" id="game"></div>
</div>

<script src="./js/game/phaser.min.js"></script>
<script src="./js/game/testOverworld.js"></script>
<!-- <script src="./js/game/testBattle.js"></script>
 -->
<script>
	var divX = $("#game").width();
	var divY = $("#game").width() / 1.5;

	var game = new Phaser.Game(divX, divY, Phaser.AUTO, 'game');

	game.state.add("Overworld",preload);
	// game.state.add("Battle",preload);
	game.state.start("Overworld");

</script>


@endsection