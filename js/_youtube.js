
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
          height: '360',
          width: '480',
          videoId: 'O4vgaXf__k0',
           events: {
             'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
           }
        });
		document.getElementById('player').style.position= "absolute";
		document.getElementById('player').style.left= 0 +"px" ;
		document.getElementById('player').style.top= 0 +"px" ;
		//console.log(x);
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }
	  
	  function getPlayState(){
		console.log(player.getPlayerState());
		player.getPlayerState();
		
	  }
	  
	  function play_pauseVideo() {
		var stateNumber = player.getPlayerState();
		if(stateNumber == 1) player.pauseVideo();
		if(stateNumber == 2) player.playVideo();
	  }

    function page_pause(){
      var _stateNumber = player.getPlayerState();
      if(_stateNumber==1) player.pauseVideo();

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