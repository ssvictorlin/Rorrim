<html>
<head>
	<title>Magic Mirror</title>
	<style type="text/css">
		<?php include('css/main.css') ?>
	</style>
	<link rel="stylesheet" type="text/css" href="css/weather-icons.css">
	<script type="text/javascript">
		var gitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';
	</script>
	<meta name="google" value="notranslate" />
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
</head>
<body>
	<div id="cf2" class="shadow">
  	<img class="img1" src="img/tumblr_n22xkk96Gu1qei2wfo1_1280.jpg" />
  	<img class="img2" src="img/tumblr_nhnsy4KhX11skrctjo1_1280.jpg" />
  	<img class="img3" src="img/tumblr_n8q3xwbAvn1ri06y7o4_1280.jpg" />
  	<img class="img4" src="img/tumblr_n8q3xwbAvn1ri06y7o5_1280.jpg" />
        </div>
	<div class="top left"><div class="date small dimmed"></div><div class="time"></div><div class="calendar xxsmall"><img src="img/2015-04-15 22.08.42.jpg"/></div></div>
	<div class="top right"><div class="windsun small dimmed"></div><div class="temp"></div><div class="forecast small dimmed"></div></div>
	<div class="center-ver center-hor"><!-- <div class="dishwasher light">Vaatwasser is klaar!</div> --></div>
	<div class="lower-third center-hor"><div class="compliment light"></div></div>
	<div class="bottom center-hor"><div class="news medium"></div></div>
	
</div>

<script src="js/jquery.js"></script>
<!--<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
$(document).ready(function(){
var header = $('body');

var backgrounds = new Array(
    'url(img/tumblr_n22xkk96Gu1qei2wfo1_1280.jpg)'
  , 'url(img/tumblr_nhnsy4KhX11skrctjo1_1280.jpg)'
  , 'url(img/tumblr_n8q3xwbAvn1ri06y7o4_1280.jpg)'
  , 'url(img/tumblr_n8q3xwbAvn1ri06y7o5_1280.jpg)'
);

var current = 0;

function nextBackground() {
    current++;
    current = current % backgrounds.length;
    header.css('background-image', backgrounds[current]);
}
setInterval(nextBackground, 10000);

header.css('background-image', backgrounds[0]);
});
</script> -->
<script src="js/changebackground.js"></script>
<script src="js/jquery.feedToJSON.js"></script>
<script src="js/ical_parser.js"></script>
<script src="js/moment-with-langs.min.js"></script>
<script src="js/config.js"></script>
<script src="js/rrule.js"></script>
<script src="js/main.js?nocache=<?php echo md5(microtime()) ?>"></script>
<!-- <script src="js/socket.io.min.js"></script> -->

</body>
</html>
