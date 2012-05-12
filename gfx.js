Gfx = function() {
  function getCanvas() {
     return document.getElementById('canvas')
  }
  function getCtx() {
     return getCanvas().getContext('2d');
  }

  function fillCircle(x,y,radius) {
    ctx = getCtx()
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2*Math.PI)
    ctx.closePath()
    ctx.fill()
  }


  return {
    getCanvas: getCanvas,
    getCtx: getCtx,
    fillCircle: fillCircle,
    clearScreen: function() {
      var ctx = getCtx();
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, 640, 480);
    },
    tileWidth: 32,
    tileHeight: 32,
    screenWidth: 640,
    screenHeight: 480
  }
}();