<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
  <meta name="description" content="">
  <meta name="author" content="">

  <title>spriteBattle @yield('title')</title>

  <!-- JQuery CDN -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

  <!-- Bootstrap core CSS -->
  <link href="./css/bootstrap/bootstrap.min.css" rel="stylesheet">

  <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
  <link href="./css/bootstrap/ie10-viewport-bug-workaround.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="./css/master.css" rel="stylesheet">

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->
</head>
<body>

  <div class="site-wrapper">
    <div class="site-wrapper-inner">
      <div class="container-fluid">

        <div class="row">
          <div class="masthead clearfix">
            <div class="inner">
              <h3 class="masthead-brand"><a href="#">Ghost Chase</a></h3>
              <nav>
                <ul class="nav masthead-nav">
                  <li><a href="#">Login</a></li>
                  <li><a href="#">Register</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div><!-- Row end -->

        <div class="row">
          <div class="col-xs-12">
            <div class="cover-container">
              @yield('content')
            </div>
          </div>
        </div><!-- Row end -->

        <div class="row">
          <div class="mastfoot">
            <div class="inner">
              <p>Site designed by Robert Anderson using <a href="http://getbootstrap.com">Bootstrap</a></p>
            </div>
          </div>
        </div><!-- Row end -->

      </div><!-- container-fluid end -->
    </div><!-- site-wrapper-inner end -->
  </div><!-- site-wrapper end -->

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script>window.jQuery || document.write('<script src="./js/vendor/jquery.min.js"><\/script>')</script>
    <script src="./js/bootstrap/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="./js/bootstrap/ie10-viewport-bug-workaround.js"></script>

  </body>
</html>
