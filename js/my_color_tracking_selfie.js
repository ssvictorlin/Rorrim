  /*tracking.ColorTracker.registerColor('green', function(r, g, b) {
  if (Math.abs(r-212) < 10 && Math.abs(g-212) < 10 && Math.abs(b-112) < 10) {
    return true;
  }
  return false;
  });

  var colors = new tracking.ColorTracker(['yellow']);
  var canvas= document.getElementById('canvas');
  var context = canvas.getContext('2d');
  //context.translate(canvas.width,0);
  //context.scale(-1,1);*/
  var current_area =1;
  var last_area = 1;
  var last_last_area = 1;
  
  var current_position = [0,0];
  var last_position = [0,0];
  var last_last_position = [0,0];
  var distance = [0,0];
  var change_ratio = [last_area/ last_last_area, current_area / last_area] ;
  
  var _log = true;
  var disappear = false;
function changelog(){_log = true;};
  
  colors.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
	
	last_last_area = last_area;
	last_area = current_area ;
	last_last_position = last_position;
	last_position = current_position;
	
	//console.log(change_ratio);
	
    if (event.data.length === 0) {
      // No colors were detected in this frame.
	  disappear = true;
    } else {
      event.data.forEach(function(rect) {
        console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        //console.log(rect.height*rect.width);
		disappear = false;
        context.strokeStyle = rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
		
		current_area = rect.height*rect.width;
		current_position = [rect.x, rect.y];
		
      });
    }
	
	
	change_ratio = [ last_area/last_last_area, current_area / last_area] ;
	//console.log(change_ratio);
	
	//if(change_ratio < 0.5 ) countDown();
	distance[0] = distance[1];
	distance[1] =Math.sqrt( (current_position[0]-last_position[0])*(current_position[0]-last_position[0])  
							+(current_position[1]-last_position[1])*(current_position[1]-last_position[1]) );

	if(change_ratio[0]>1) change_ratio[0] =1;
	if(change_ratio[1]>1) change_ratio[1] =1;
	
	if(_log)console.log(distance[0]+distance[1], change_ratio[0]*change_ratio[1]);
	if(change_ratio[0]*change_ratio[1] < 0.7 &&  distance[0]+distance[1] < 20 )  { countDown();  _log = false; }
	else if(distance[0]+distance[1]==0 && disappear==true && change_ratio[0]*change_ratio[1] <0.96) {countDown(); _log=false;}
  });
	//
  //tracking.track('#myVideo', colors, {camera:true} );
