var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
	mix.sass('app.scss');
	mix.copy('vendor/twbs/bootstrap/dist/css', 'public/css/bootstrap');
	mix.copy('vendor/twbs/bootstrap/dist/js', 'public/js/bootstrap');
	mix.copy('vendor/twbs/bootstrap/docs/assets/css', 'public/css/bootstrap');
	mix.copy('vendor/twbs/bootstrap/docs/assets/js', 'public/js/bootstrap');
});
