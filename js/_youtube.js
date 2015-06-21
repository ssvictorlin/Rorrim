
     // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
	  var x = 1;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'O4vgaXf__k0',
           events: {
             'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
           }
        });
		document.getElementById('player').style.position= "absolute";
		document.getElementById('player').style.left= 50 +"px" ;
		document.getElementById('player').style.top= 0 +"px" ;
		//console.log(x);
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }
	
	  function pauseVideo(){
		player.pauseVideo()
	  }
	  function playvideo() {
		player.playVideo();
	  }
      function stopVideo() {
        player.stopVideo();
      }