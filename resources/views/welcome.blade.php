@extends('layouts.master')

@section('title', '- Main')

@section('content')

<div class="inner cover">
  <h1 class="cover-heading">spriteBattle Battle Sim</h1>
  <p class="lead">Controls: </p>
  <div class="inner cover" id="game"></div>
</div>

<script src="./js/game/phaser.min.js"></script>
<script src="./js/game/test-level.js"></script>


@endsection