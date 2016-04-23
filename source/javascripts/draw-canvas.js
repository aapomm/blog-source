$(function(){

  //
  // Setup Canvas
  //
  var $canvas = $('#profile-canvas');
  $canvas[0].style.cursor = 'default';

  var context = $canvas[0].getContext('2d');
  context.strokeStyle = "#000000";
  context.lineJoin = "round";
  context.lineWidth = 5;

  var clickX = [];
  var clickY = [];
  var clickDrag = [];
  var paint = false;



  //
  // Load Image onto Canvas
  //
  var img = new Image();
  img.onload = function(){
    context.drawImage(img, 0, 0);
  };
  img.src = 'images/aaron_manaloto.png';



  //
  // Define functions
  //
  var addClick = function(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  }

  var releaseBrush = function(){
    clickX = [];
    clickY = [];
    paint = false;
  };

  var draw = function(e, dragging){
    var offset = $(this).offset();
    var mouseX = e.pageX - offset.left;
    var mouseY = e.pageY - offset.top;

    addClick(mouseX, mouseY, dragging);
    redraw();
  };

  var redraw = function(){
    for (var i=0; i < clickX.length; i++) {
      context.beginPath();
      if (clickDrag[i] && i > 0) {
        context.moveTo(clickX[i-1], clickY[i-1]);
      }
      else{
        context.moveTo(clickX[i]-1, clickY[i]-1);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.stroke();
    }
  };



  //
  // Set Handlers
  //
  $canvas.mousedown(function(e){
    draw.call(this, e, false);
    paint = true;
  });

  $canvas.mousemove(function(e){
    if (paint) { draw.call(this, e, true); }
  });

  $(document).mouseup(releaseBrush);

});
