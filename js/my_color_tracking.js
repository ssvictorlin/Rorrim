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
  //colors.setMinDimension(20);
  //colors.setMinGroupSize(30);
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var inside = false;
  var load = false;
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
    if (event.data.length === 0) {
      if(inside==true) hideAll();
      // No colors were detected in this frame.
    } else {
      event.data.forEach(function(rect) {
        if(inside==true) hideAll();
        //console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        //console.log(rect.height*rect.width);
        context.strokeStyle = rect.color;
        context.drawImage(circle,rect.x, rect.y);
        //context.strokeRect(rect.x, rect.y, 30, 30);
        //context.font = '11px Helvetica';
        //context.fillStyle = "#fff";
        //context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        //context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
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
      });
    }
  });

  tracking.track('#myVideo', colors, {camera:true} );
