<html>
<head>
	<title>Magic Mirror</title>
	<style type="text/css">
		<?php include('css/main.css') ?>
	</style>
	<link rel="stylesheet" type="text/css" href="css/weather-icons.css">
	<link rel="stylesheet" href="css/demo.css">
	<script type="text/javascript">
		var gitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';
	</script>
	<meta name="google" value="notranslate" />
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
</head>
<body>
	<div id="cycler">
		<img class="active" src="img/tumblr_n22xkk96Gu1qei2wfo1_1280.jpg" />
	  	<img class="img2" src="img/tumblr_nhnsy4KhX11skrctjo1_1280.jpg" />
	  	<img class="img3" src="img/tumblr_n8q3xwbAvn1ri06y7o4_1280.jpg" />
	  	<img class="img4" src="img/tumblr_n8q3xwbAvn1ri06y7o5_1280.jpg" />
  	</div>
  	<div id="container"> </div>

  	<div class="demo-container">		
	  <video id="myVideo" preload autoplay loop muted controls></video> 
	</div>
	<canvas id="canvas" width="1920px" height="955px" ></canvas>
	<div class="top left"><div class="date small dimmed"></div><div class="time"></div><div class="calendar xxsmall"></div></div>
	<div class="top right"><div class="windsun small dimmed"></div><div class="temp"></div><div class="forecast small dimmed"></div></div>
	<div class="center-ver center-hor"><!-- <div class="dishwasher light">Vaatwasser is klaar!</div> --></div>
	<div class="lower-third center-hor"><div class="compliment light"></div></div>
	<div class="bottom center-hor"><div class="news medium"></div></div>
	<div style="position:relative;z-index:5; width:100%;margin-right:auto;margin-left:auto;"><p id="time" style="font-size:400px; text-align:center; color:#0099FF;"></p></div>
    <video id="video" style="float: left; margin-right: 1em; display:none"></video> 


<script src="js/tracking-min.js"></script>
<script src="js/jquery.js"></script>
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="js/changebackground.js"></script>
<script src="js/jquery.feedToJSON.js"></script>
<script src="js/ical_parser.js"></script>
<script src="js/moment-with-langs.min.js"></script>
<script src="js/config.js"></script>
<script src="js/rrule.js"></script>
<script src="js/main.js?nocache=<?php echo md5(microtime()) ?>"></script>
<script src="js/compatibility.js"></script>
<script src="js/smoother.js"></script>
	
<script src="js/objectdetect.js"></script>
<script src="js/objectdetect.frontalface.js"></script>

<script>
	    var state = false;
        var s;
        var display;
	function changeBackGround(){
        }
        
        function startTimer(duration, display) {
          var start = Date.now(),
          diff,
          minutes,
          seconds;
        function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        
        //seconds = seconds < 10 ? "0" + seconds : seconds;

        
        if (seconds == -1) {clearTimeout(s);
        	$(function(){
     		$("#container").css("display","none");
  			});}

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            //start = Date.now() + 1000;
        }
        
        };
        // we don't want to wait a full second before the timer starts
        timer();
        s=setInterval(timer, 1000);
        }

        function countdown() {
          if(!state){
	    	state = true; 
            var fiveMinutes = 2,
            display = document.querySelector('#time');
            startTimer(fiveMinutes, display);
          }
        };



	window.onload = function() {
	
		var smoother = new Smoother([0.9999999, 0.9999999, 0.999, 0.999], [0, 0, 0, 0]),
			video = document.getElementById('video'),
			glasses = document.getElementById('glasses'),
			detector;
				
		try {
			compatibility.getUserMedia({video: true}, function(stream) {
				try {
					video.src = compatibility.URL.createObjectURL(stream);
				} catch (error) {
					video.src = stream;
				}
				compatibility.requestAnimationFrame(play);
			}, function (error) {
				alert('WebRTC not available');
			});
		} catch (error) {
			alert(error);
		}
		
		function play() {
			compatibility.requestAnimationFrame(play);
			if (video.paused) video.play();
          	
			if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0) {
	          	
	          	// Prepare the detector once the video dimensions are known:
	          	if (!detector) {
		      		var width = ~~(60 * video.videoWidth / video.videoHeight);
					var height  =60;
		      		detector = new objectdetect.detector(width, height, 1.1, objectdetect.frontalface);
		      	}
          		
          		// Perform the actual detection:
				var coords = detector.detect(video, 1);
				if (coords[0]) { console.log("OMG");
										$(function(){$("#container").css("display","block");});
                                        clearTimeout(s);
                                        state=false;
					var coord = coords[0];
					coord = smoother.smooth(coord);
					
					// Rescale coordinates from detector to video coordinate space:
					coord[0] *= video.videoWidth / detector.canvas.width;
					coord[1] *= video.videoHeight / detector.canvas.height;
					coord[2] *= video.videoWidth / detector.canvas.width;
					coord[3] *= video.videoHeight / detector.canvas.height;
					
					// Display glasses overlay: 
					glasses.style.left    = ~~(coord[0] + coord[2] * 1.0/8 + video.offsetLeft) + 'px';
					glasses.style.top     = ~~(coord[1] + coord[3] * 0.8/8 + video.offsetTop) + 'px';
					glasses.style.width   = ~~(coord[2] * 6/8) + 'px';
					glasses.style.height  = ~~(coord[3] * 6/8) + 'px';
					glasses.style.opacity = 1;
					
				} else {
                    countdown();
					var opacity = glasses.style.opacity - 0.2;
					glasses.style.opacity = opacity > 0 ? opacity : 0;
				}
			}
		}
		
		
	};
	


</script>
<!-- <script src="js/socket.io.min.js"></script> -->
<script>
    $("#up").click(function(){
     $("#container").css("display","block");
  });
</script>
<script src="js/my_color_tracking.js"></script>
<img id="glasses" src="" style="position: absolute; display: none; opacity: 0">
</body>
</html>
