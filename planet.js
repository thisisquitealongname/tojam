// a Scene that renders the world

Planet = function(world) {
  var playerRow = 0;
  var playerCol = 0;

  var upPressed = false;
  var downPressed = false;
  var leftPressed = false;
  var rightPressed = false;

  var frame = 0; //count frames. XXX this hsould be done elsewhere
  
  function click(x,y) {
    //TODO: translate the click into a click on the world (need to factor in
    //      the viewport)
    // also if a disaster is selected at the time of the click, handle it
  }
  
  function update() {
    frame++;

    updatePlayer();
    updateScroll();
    
    updateCritters();
  }

  function updatePlayer() {
    if(upPressed) {
      playerRow--;
    }
    if(downPressed) {
      playerRow++;
    }
    if(leftPressed) {
      playerCol--;
    }
    if(rightPressed) {
      playerCol++;
    }
  }

  function updateScroll() {
    scrollX = playerCol * Gfx.tileWidth - Gfx.screenWidth()/2;
    scrollY = playerRow * Gfx.tileHeight - Gfx.screenHeight()/2;

    //clamp the edges of the viewport
    if(scrollY < 0)
      scrollY = 0;
    if(scrollY >= world.map.height * Gfx.tileHeight - Gfx.screenHeight()) {
      scrollY = world.map.height * Gfx.tileHeight - Gfx.screenHeight() - 1;
    }
  }

  function updateCritters() {
    if(world.critters) {
      for(i=0; i<world.critters.length; i++) {
        var crt = world.critters[i]
        crt.update()
      }
    }
  }

  //this is the number of tiles available onscreen at any moment
  var viewable_tiles = {
    width: Gfx.screenWidth() / Gfx.tileWidth,
    height: Gfx.screenHeight() / Gfx.tileHeight
  }
  
  function draw() {
    Gfx.clearScreen();
    drawMap();
   
    drawPlayer();
    drawCritters();
    
    //draw structures
    
    //draw disasters?
  }

  function toScreenCoords(mapX, mapY) {
    return {
      x: Util.mod(mapX - scrollX, Gfx.tileWidth*world.map.width),
      y: mapY - scrollY
    } //TODO: this should wrap with the world
  }

  function drawPlayer() {
    var ctx = Gfx.getCtx();
    var coords = toScreenCoords(playerCol * Gfx.tileWidth,
                                playerRow * Gfx.tileHeight);
    ctx.drawImage(Images.player, coords.x, coords.y);
  }

  function drawCritters() {
    for(i = 0; i < world.critters.length; i++) {
      var crt = world.critters[i];
      p = toScreenCoords(crt.x, crt.y);
      var ctx = Gfx.getCtx();
      ctx.fillStyle = 
        ["red", "green", "blue", "purple", "yellow", "grey", "black"][i];
      Gfx.fillCircle(p.x, p.y, 5);
    }
  }

  function drawMap() {
    var startRow = Math.floor(scrollY / Gfx.tileHeight);
    var startCol = Math.floor(scrollX / Gfx.tileWidth);

    screenXInit = -Util.mod(scrollX, Gfx.tileWidth) //screenXInit;

    for(var row = startRow, screenY = -(Util.mod(scrollY, Gfx.tileHeight));
        row <= startRow + viewable_tiles.height;
        row++, screenY += Gfx.tileHeight) {
      for(var col = startCol, screenX = screenXInit;
          col <= startCol + viewable_tiles.width;
          col++, screenX += Gfx.tileWidth) {
        drawTile(world.map.tileAt(row, col), screenX, screenY);
      }
    }
  }

  function drawTile(tileNum, dx, dy) {
    var tileType = Maps.TileTypes[tileNum];
    var ctx = Gfx.getCtx();
    id = tileType.ids[Math.floor(frame / 8) % tileType.ids.length]
    var sx = Gfx.tileWidth * Util.mod(id, Images.tiles.tilesPerRow);
    var sy =
      Gfx.tileHeight * Math.floor(id / Images.tiles.tilesPerRow);

    ctx.drawImage(Images.tiles, sx, sy, Gfx.tileWidth, Gfx.tileHeight,
      dx, dy, Gfx.tileWidth, Gfx.tileHeight);
  }

  function keyDown(evt) {
    if(evt.keyCode == Keys.DOM_VK_UP) {
      upPressed = true;
    }   
    else if(evt.keyCode == Keys.DOM_VK_DOWN) {
      downPressed = true;
    }
    else if(evt.keyCode == Keys.DOM_VK_LEFT) {
      leftPressed = true;
    }
    else if(evt.keyCode == Keys.DOM_VK_RIGHT) {
      rightPressed = true;
    }
  }
  
  function keyUp(evt) {   
    if(evt.keyCode == Keys.DOM_VK_UP) {
      upPressed = false;
    }   
    else if(evt.keyCode == Keys.DOM_VK_DOWN) {
      downPressed = false;
    }
    else if(evt.keyCode == Keys.DOM_VK_LEFT) {
      leftPressed = false;
    }
    else if(evt.keyCode == Keys.DOM_VK_RIGHT) {
      rightPressed = false;
    }
  }
         
  return {
    keyDown: keyDown,  
    keyUp: keyUp,
    draw: draw,
    update: update,
  }
}
