
function selfiemode() {
	if (!pageIsOpen) {
		$('div').hide();
		$('.toggle4').load("gesture.htm");
		$('.toggle4').fadeIn('slow');
		pageIsOpen = true;
	}
	else {

		$('.toggle4').hide();
     	$('.toggle4').fadeOut('slow');
		$('div').fadeIn();
		
		pageIsOpen = false;

	}

	return false;
});

