  tracking.ColorTracker.registerColor('green', function(r, g, b) {
  if (Math.abs(r-212) < 10 && Math.abs(g-212) < 10 && Math.abs(b-112) < 10) {
    return true;
  }
  return false;
  });

  var colors = new tracking.ColorTracker(['yellow']);
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  colors.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (event.data.length === 0) {
      // No colors were detected in this frame.
    } else {
      event.data.forEach(function(rect) {
        //console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        //console.log(rect.height*rect.width);
        context.strokeStyle = rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

      });
    }
  });

  tracking.track('#myVideo', colors, {camera:true} );
