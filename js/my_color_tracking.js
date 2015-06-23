  tracking.ColorTracker.registerColor('custom', function(r, g, b) {
        var dx = r - 75;
        var dy = g - 71;
        var dz = b - 125;
        if(Math.abs(dx)<20&&Math.abs(dy)<20&&Math.abs(dz)<30){
          //{
          return true;
        }//}
        else
         return false;
        //dx * dx + dy * dy + dz * dz < 3500;
  });

  var colors = new tracking.ColorTracker(['cyan']);
  colors.setMinDimension(10);
  //colors.setMinGroupSize(30);
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var inside = false;
  var load = false;

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





  var circle = document.createElement("img");
  circle.setAttribute("src","js/tech_rings2.png");
  circle.setAttribute("width","10");
  circle.setAttribute("height","10");
  context.translate(canvas.width, 0);

  context.scale(-1,1);
  console.log("here i scale");
  function showIcon(icon){
    $(icon).fadeIn();
  }
  function hideAll(){
    $("#camera").fadeOut();
    $("#home").fadeOut();
    $("#phone").fadeOut();
    $("#youtube").fadeOut();
    inside=false;
  }
function clearCircle(context,x,y,radius) {
  context.save();
  context.beginPath();
  context.arc(x, y, radius, 0, 2*Math.PI, true);
  context.clip();
  context.clearRect(x-radius,y-radius,radius*2,radius*2);
  context.restore();
}
  colors.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    last_last_area = last_area;
    last_area = current_area ;
    last_last_position = last_position;
    last_position = current_position;



    if (event.data.length === 0) {
      if(inside==true) hideAll();
      // No colors were detected in this frame.
    } else {
      event.data.forEach(function(rect) {
        if(inside==true) hideAll();
        console.log("main");
        //console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        //console.log(rect.height*rect.width);
        context.strokeStyle = rect.color;
        //context.drawImage(circle,rect.x, rect.y);
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        current_area = rect.height*rect.width;
        current_position = [rect.x, rect.y];
        //context.strokeRect(rect.x, rect.y, 30, 30);

        if(rect.x<window.innerWidth*0.2&&window.innerHeight*0.4<rect.y&&rect.y<window.innerHeight*0.6&&!inside&&!load){
          showIcon("#camera");
          load = true;
          setTimeout("selfieMode()",2000);
        }
        else if(rect.x>window.innerWidth*0.8&&rect.y>window.innerHeight*0.8&&!inside&&!load){
          showIcon("#phone");
        }
        else if(rect.x<window.innerWidth*0.2&&rect.y>window.innerHeight*0.8&&!inside&&!load){
          showIcon("#youtube");
          load = true;
          setTimeout("youtubeMode()",2000);
        }          
        else if(rect.x>window.innerWidth*0.8&&window.innerHeight*0.4<rect.y&&rect.y<window.innerHeight*0.6&&!inside&&!load){
          showIcon("#home");
          load = true;
          setTimeout("mainMode()",2000);
        }  
        else{
          inside=true;
        }
        if(youtubePage){
          change_ratio = [ last_area/last_last_area, current_area / last_area] ;
          distance[0] = distance[1];
          distance[1] =Math.sqrt( (current_position[0]-last_position[0])*(current_position[0]-last_position[0])  
                      +(current_position[1]-last_position[1])*(current_position[1]-last_position[1]) );

          if(change_ratio[0]>1) change_ratio[0] =1;
          if(change_ratio[1]>1) change_ratio[1] =1;
          
          if(_log)console.log(distance[0]+distance[1], change_ratio[0]*change_ratio[1]);
          if(change_ratio[0]*change_ratio[1] < 0.8 &&  distance[0]+distance[1] < 20 )  { 
            play_pauseVideo(); context.strokeRect(rect.x, rect.y, 50, 50); _log = false; }
        }
        if(selfiePage){
          change_ratio = [ last_area/last_last_area, current_area / last_area] ;
          //console.log(change_ratio);
          
          //if(change_ratio < 0.5 ) countDown();
          distance[0] = distance[1];
          distance[1] =Math.sqrt( (current_position[0]-last_position[0])*(current_position[0]-last_position[0])  
                      +(current_position[1]-last_position[1])*(current_position[1]-last_position[1]) );

          if(change_ratio[0]>1) change_ratio[0] =1;
          if(change_ratio[1]>1) change_ratio[1] =1;
          
          if(_log)console.log(distance[0]+distance[1], change_ratio[0]*change_ratio[1]);
          if(change_ratio[0]*change_ratio[1] < 0.8 &&  distance[0]+distance[1] < 20 )  { 
            countDown();  _log = true; }
          //else if(distance[0]+distance[1]==0 && disappear==true && change_ratio[0]*change_ratio[1] <0.96) {countDown(); _log=true;}
        }


      });
    }
  });

  tracking.track('#myVideo', colors, {camera:true} );
