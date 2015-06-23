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

        display.textContent =  seconds; 
        if (seconds == -1) {clearTimeout(s);display.textContent ="";}

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
            var fiveMinutes = 10,
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
		      		detector = new objectdetect.detector(width, height, 1.1, objectdetect.frontalface_alt);
		      	}
          		
          		// Perform the actual detection:
				var coords = detector.detect(video, 1);
				if (coords[0]) {
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
		
		[].slice.call(document.getElementById('list').children).forEach(function(e) {
			e.addEventListener('click', function() {
				glasses.src = e.src;
			}, false);
		});
	};
	