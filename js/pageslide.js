
function selfieMode() {
	if (!selfiePage) {
		$('div').hide();
		$('.demo-container').show();
		$('.toggle4').load("gesture.htm");
		$('.toggle4').fadeIn('slow');
		selfiePage = true;
	}
	load = false;
	return false;
};
function youtubeMode() {
	if (!youtubePage) {
		$('div').hide();$('.container').show();
		$('.toggle3').load("youtube_api.htm");
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
    inside=false;
	selfiePage = false;
	

	load = false;
	return false;
};

