	var state = false;
	function takePhoto(video) {
      	   var photo = document.getElementById('photo'),
           context = photo.getContext('2d');
   
  	       photo.width = video.clientWidth;
           photo.height = video.clientHeight; 

           context.drawImage(video, 10, 10, window.innerWidth/5 , window.innerHeight/5);
	   	   state=false;
        }

	function countDown() {
	  if(!state){
	    state = true;
	    setTimeout("takePhoto(canvas)",4200);
        countdown();
	  }
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
       	var fiveMinutes = 3,
        display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
    };

	function displayMode(mode) {
		display = document.querySelector('#time');
		display.textContent = mode;
	}
	function changeWindow(){
//	   window.location.href="http://192.168.48.128/Rorrim/index.php";
	   window.location.href="http://www.google.com";
	}

	var timeoutHandle=null;
	window.onload = function() {
		var smoother = new Smoother([0.9995, 0.9995], [0, 0], 0),
			canvas = document.getElementById('canvas'),
			context = canvas.getContext('2d'),
			video = document.createElement('video'),
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
				alert("WebRTC not available");
			});
		} catch (error) {
			alert(error);
		}
	
		var fist_pos_old, angle = [0, 0];
		
		function play() {

			compatibility.requestAnimationFrame(play);
			if (video.paused) video.play();
	        
	        // Draw video overlay:
			canvas.width = window.innerWidth;//~~(600 * video.videoWidth / video.videoHeight);
			canvas.height = window.innerHeight;
			context.scale(-1,1);
			context.drawImage(video,0,0, -canvas.width, canvas.height);
			
			if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0) {
			
				// Prepare the detector once the video dimensions are known:
	          	if (!detector) {
		      		var width = ~~(100 * video.videoWidth / video.videoHeight);
				var height = 100;
		      		detector = new objectdetect.detector(width, height, 1.1, objectdetect.handfist);
		      	}
	
          		// Perform the actual detection:
				var coords = detector.detect(video, 1);
				
				// If find fist
				if (coords[0]) {
					var coord = coords[0];
					
					// Rescale coordinates from detector to video coordinate space:
					coord[0] *= video.videoWidth / detector.canvas.width;
					coord[1] *= video.videoHeight / detector.canvas.height;
					coord[2] *= video.videoWidth / detector.canvas.width;
					coord[3] *= video.videoHeight / detector.canvas.height;
	
					var fist_pos = [coord[0] + coord[2] / 2, coord[1] + coord[3] / 2];
					
					if (fist_pos_old) {
						var dx = (fist_pos[0] - fist_pos_old[0]) / video.videoWidth,
				                    dy = (fist_pos[1] - fist_pos_old[1]) / video.videoHeight;
//						console.log(fist_pos[0]);
						   timeoutHandle = setTimeout("changeWindow()",3000);
						
						if (fist_pos[0]>video.videoWidth*0.75 &&fist_pos[1]>video.videoHeight*0.75){
						   //countDown();
						   timeoutHandle = setTimeout("displayMode(1)",3000);
						}else if (fist_pos[0]<video.videoWidth*0.25 &&fist_pos[1]>video.videoHeight*0.75){
						   timeoutHandle = setTimeout("changeWindow()",3000);
						   //timeoutHandle = setTimeout("displayMode(2)",3000);
						}else if (fist_pos[0]>video.videoWidth*0.75 &&fist_pos[1]<video.videoHeight*0.25){
						   timeoutHandle = setTimeout("displayMode(3)",3000);
						}else if (fist_pos[0]<video.videoWidth*0.25 &&fist_pos[1]<video.videoHeight*0.25){
						   timeoutHandle = setTimeout("displayMode(4)",3000);
						}else {
						   clearTimeout(timeoutHandle);
						   displayMode(0);
						   clearTimeout(timeoutHandle);
						} 			      
						fist_pos_old = fist_pos;
					} else if (coord[4] > 2) {
						fist_pos_old = fist_pos;						
					}
				
					// Draw coordinates on video overlay:
					context.beginPath();
					context.lineWidth = '2';
					context.fillStyle = fist_pos_old ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 0, 0, 0)';
					context.fillRect(
						coord[0] / video.videoWidth * canvas.clientWidth-video.videoWidth*3,
						coord[1] / video.videoHeight * canvas.clientHeight,
						coord[2] / video.videoWidth * canvas.clientWidth,
						coord[3] / video.videoHeight * canvas.clientHeight);
					context.stroke();
				} else {
					fist_pos_old = null;
					clearTimeout(timeoutHandle);
					displayMode(5);
				}
			}
		}
	};
