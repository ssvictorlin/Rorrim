
function selfieMode() {
	youtubePage = false;
	if(youtubepageLoaded)
		page_pause();

	if (!selfiePage) {
		$('div').hide();
		//$('#player').css("display", "none");

		$('.demo-container').show();
		if (!selfiepageLoaded) {
			selfiepageLoaded = true;
			$('.toggle4').load("gesture.htm");
		}
		//$('.toggle4').load("gesture.htm");
		$('.toggle4').fadeIn('slow');
		selfiePage = true;
	}
	load = false;
	return false;
};
function youtubeMode() {
	selfiePage = false;
	if (!youtubePage) {
		$('div').hide();
		//$('#player').css("display","block");
		$('.container').show();
		if (!youtubepageLoaded) {
			youtubepageLoaded = true;
			$('.toggle3').load("youtube_api.htm");
		}
		$('.toggle3').fadeIn('slow');
		
		youtubePage = true;
	}
	load = false;
	return false;
};
function mainMode() {
	$('.toggle4').hide();
    $('.toggle4').fadeOut('slow');
	$('div').fadeIn();
	$("#camera").fadeOut();
    $("#home").fadeOut();
    $("#phone").fadeOut();
    $("#youtube").fadeOut();
    $("#thecanvas").hide();
    $("#player").hide();
    if(youtubepageLoaded)
		page_pause();
    inside=false;
	selfiePage = false;
	youtubePage = false;

	load = false;
	return false;
};

