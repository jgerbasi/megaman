/*

Mega Man 237

Josh Gerbasi    jgerbasi
Michael Ryan    mer1
Marco Talabacu  mtalabac

*/

var PLATFORM = (function() {
	var exports = {};
  var image = new Image();
      image.src = "sprites/platform.png";
  const frameSize = 20;
  var firstRun = true;
  exports.platformList = [];

  exports.Platform = function(xPos, yPos, width, height) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.getTopY = function() {
      return yPos;
    };
    this.getBottomY = function() {
      return yPos + height;
    };
    this.getLeftX = function() {
      return xPos;
    };
    this.getRightX = function() {
      return xPos + width;
    };
  }

  exports.Flicker= function(xPos, yPos, timer, offset) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 40;
    this.height = 40;
    this.timer = timer - offset;
    this.topTimer = timer;
    this.getTopY = function() {
      return yPos;
    };
    this.getBottomY = function() {
      return yPos + this.height;
    };
    this.getLeftX = function() {
      return xPos;
    };
    this.getRightX = function() {
      return xPos + this.width;
    };

    this.resetFlicker = function(){
      if (!PROJECTILE.collisionToObject(MEGAMAN, this)){
        if (this.timer-- <= -this.topTimer)
          this.timer = this.topTimer;
      }
    }

  }


	function drawPlatform(p) {
    var y = p.getTopY();
    var x = p.getLeftX();

    // Top Row
    ctx.drawImage(image, 0, 0, frameSize, frameSize, x, y, frameSize, frameSize);
    
    for (var i = 20; i <= (p.getRightX() - p.getLeftX() - 40); i += 20){
      ctx.drawImage(image, 20, 0, frameSize, frameSize, x+i, y, frameSize, frameSize);
    }
    ctx.drawImage(image, 40, 0, frameSize, frameSize, x+i, y, frameSize, frameSize);

    // Middle Rows
    for (var j = 20; j <= (p.getBottomY() - p.getTopY() - 40); j += 20){
      ctx.drawImage(image, 0, 20, frameSize, frameSize, x, y+j, frameSize, frameSize);
      for (var i = 20; i <= (p.getRightX() - p.getLeftX() - 40); i += 20){
        ctx.drawImage(image, 20, 20, frameSize, frameSize, x+i, y+j, frameSize, frameSize);
      }
      ctx.drawImage(image, 40, 20, frameSize, frameSize, x+i, y+j, frameSize, frameSize);

    }
    // Bottom Rows
    ctx.drawImage(image, 0, 40, frameSize, frameSize, x, y+j, frameSize, frameSize);
    for (var i = 20; i <= (p.getRightX() - p.getLeftX() - 40); i += 20){
      ctx.drawImage(image, 20, 40, frameSize, frameSize, x+i, y+j, frameSize, frameSize);
    }
    ctx.drawImage(image, 40, 40, frameSize, frameSize, x+i, y+j, frameSize, frameSize);

    if (p.topTimer) {
      p.timer--;
    }

  }

  exports.setPlatformList = function(newList){
    exports.platformList = newList;
  } 

  exports.drawPlatforms = function() {
    for (var i = 0; i < exports.platformList.length; i++) {
      var p = exports.platformList[i];
      //ctx.fillStyle = "grey";
      if (p.timer === undefined || (p.timer >0 ))
        drawPlatform(p);
      else
        p.resetFlicker();
      //ctx.fillRect(p.xPos, p.yPos, p.width, p.height);
    }
  }

	return exports;
}());