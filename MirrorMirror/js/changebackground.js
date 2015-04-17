$(document).ready(function(){
var header = $('body');

var backgrounds = new Array(
    'url(http://24.media.tumblr.com/0f4793bd8048fedfb976dd18bebe327e/tumblr_n22xkk96Gu1qei2wfo1_1280.jpg)'
  , 'url(http://36.media.tumblr.com/1838867f440122ade920df736feb3646/tumblr_nhnsy4KhX11skrctjo1_1280.jpg)'
  , 'url(http://38.media.tumblr.com/69582f635fb8b2dd4d87f3f7ce2895f2/tumblr_n8q3xwbAvn1ri06y7o4_1280.jpg)'
  , 'url(http://33.media.tumblr.com/feac08723232bdd7e09b47704ff7410c/tumblr_n8q3xwbAvn1ri06y7o5_1280.jpg)'
);

var current = 0;

function nextBackground() {
    current++;
    current = current % backgrounds.length;
    header.css('background-image', backgrounds[current]);
}
setInterval(nextBackground, 1000);

header.css('background-image', backgrounds[0]);
});

