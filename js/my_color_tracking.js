  tracking.ColorTracker.registerColor('green', function(r, g, b) {
  if (Math.abs(r-212) < 10 && Math.abs(g-212) < 10 && Math.abs(b-112) < 10) {
    return true;
  }
  return false;
  });

  var colors = new tracking.ColorTracker(['yellow']);
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var inside = false;
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

  colors.on('track', function(event) {


    context.clearRect(0, 0, canvas.width, canvas.height);
    if (event.data.length === 0) {
      if(inside==true) hideAll();
      // No colors were detected in this frame.
    } else {
        if(inside==true) hideAll();

      event.data.forEach(function(rect) {
        //console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        //console.log(rect.height*rect.width);
        context.strokeStyle = rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        
        if(rect.x<window.innerWidth*0.2&&rect.y<window.innerHeight*0.2&&!inside)
          showIcon("#camera");
        else if(rect.x>window.innerWidth*0.8&&rect.y>window.innerHeight*0.8&&!inside)
          showIcon("#phone");
        else if(rect.x<window.innerWidth*0.2&&rect.y>window.innerHeight*0.8&&!inside)
          showIcon("#youtube");          
        else if(rect.x>window.innerWidth*0.8&&rect.y<window.innerHeight*0.2&&!inside)
          showIcon("#home");
        else{
          inside=true;
        }
      });
    }
  });

  tracking.track('#myVideo', colors, {camera:true} );
