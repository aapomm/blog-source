// SEE: http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
$(function(){

  var $canvas = $('#profile-canvas');
  $canvas[0].style.cursor = 'default';

  var context = $canvas[0].getContext('2d');
  var clickX = [];
  var clickY = [];
  var clickDrag = [];
  var paint = false;

  var img = new Image();
  img.onload = function(){
    context.drawImage(img, 0, 0);
  };
  img.src = 'images/aaron_manaloto.jpg';

  var addClick = function(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  }

  var releaseBrush = function(){ paint = false; };

  var draw = function(e, dragging){
    var offset = $(this).offset();
    var mouseX = e.pageX - offset.left;
    var mouseY = e.pageY - offset.top;

    addClick(mouseX, mouseY, dragging);
    redraw();
  };

  var redraw = function(){
    context.strokeStyle = "#000000";
    context.lineJoin = "round";
    context.lineWidth = 5;

    for (var i=0; i < clickX.length; i++) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i-1], clickY[i-1]);
      }
      else{
        context.moveTo(clickX[i]-1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.stroke();
    }
  };

  $canvas.mousedown(function(e){
    draw.call(this, e, false);
    paint = true;
  });

  $canvas.mousemove(function(e){
    if (paint) { draw.call(this, e, true); }
  });

  $canvas.mouseup(releaseBrush);
  $canvas.mouseleave(releaseBrush);

});
