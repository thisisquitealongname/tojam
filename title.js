//Implements the title screen

function TitleText(text, font) {
  var pos = 0;
  var sin = [] //want to design it so that... every 8 chars is one sine wave!
  for(i=0; i<Math.PI*2; i+=Math.PI*2 / 70) {
     sin.push(Math.sin(i))
  }
  var n = text.length;
  
  var T = {};
  T.draw = function() {
      var ctx = Gfx.getCtx();
      ctx.save();
      var dx = 0;
      
      ctx.font = "54px serif";
      var lens = [] //widths of each char, since doing it one by one doesn't account for natural spacing that the internal renderer would do...
      for(i=0; i<n; i++) lens.push(ctx.measureText(text[i]).width) //huh? the *2 seems to center it properly. wtffff measureText
      var total_width = Util.sum(lens)

      var start = Math.floor((Gfx.getCanvas().width - total_width) / 2);
      var midline = Math.floor(Gfx.getCanvas().height / 2);
      for(i=0; i<n; i++) { //draw letters one by one
        ctx.fillStyle = "brown";
        ctx.fillText(text[i], start+dx, midline+sin[(i + pos) % sin.length]*38);
        dx+=lens[i];
      }
      ctx.restore();
  }
  T.update = function() {
    pos+=1 //make the sine wave wave
  }
  
  return T;
}

function WheelchairSpin() {
  var wheelchair = {};
  
    var x = Math.floor(Math.random*6);
    var y = Math.floor(Math.random*5);
  
    var dx = Math.floor(Math.random*6);
    var dy = Math.floor(Math.random*5);
    
  wheelchair.update = function () {
    if (x < 0 || x > Gfx.screenWidth()){
      dx = -dx
    }
      x += dx;
      y += dy;
  }
  
  wheelchair.draw = function () {
    
  var wheelchairtile = Images.getTile(46)

    var ctx = Gfx.getCtx();
    ctx.save();
    ctx.drawImage(wheelchairtile, x, y);
    ctx.restore();
  }
 return wheelchair;  
 }
    
TitleScene = function() { 
  var title_text = TitleText("~~ WORLD _ GAME ~~")
  var starfield = Starfield()  
  var wheelchair_spin = WheelchairSpin()
  //game.soundtrack.src = "title.ogg";

  return {
    update: function() {
      starfield.update()
      title_text.update()
      wheelchair_spin.update()
    },
    click: function(x,y) {
      //should move to the next scene
      game.scene = Planet(Worlds.Earth);
    },
    draw: function() {
      starfield.draw();
      title_text.draw();
      wheelchair_spin.draw();
    }
  }
}
