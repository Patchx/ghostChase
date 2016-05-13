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
<script src="./js/game/test-level.js"></script>


@endsection